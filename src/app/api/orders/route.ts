import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

// Business hours: Mon-Fri (0=Sun, 1=Mon, ..., 5=Fri, 6=Sat)
function isBusinessHours(date: Date): boolean {
  const day = date.getDay();
  if (day === 0 || day === 6) return false; // Closed weekends

  const hours = date.getHours();
  const closeHour = day === 3 ? 16 : 15; // Wed closes at 4 PM, others at 3 PM
  return hours >= 8 && hours < closeHour;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many orders. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { customerName, pickupTime, items } = body;

    // Validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length === 0) {
      return NextResponse.json(
        { error: "Customer name is required." },
        { status: 400 }
      );
    }

    if (customerName.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or less." },
        { status: 400 }
      );
    }

    if (!pickupTime) {
      return NextResponse.json(
        { error: "Pickup time is required." },
        { status: 400 }
      );
    }

    const pickupDate = new Date(pickupTime);
    if (isNaN(pickupDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid pickup time." },
        { status: 400 }
      );
    }

    if (pickupDate.getTime() < Date.now()) {
      return NextResponse.json(
        { error: "Pickup time must be in the future." },
        { status: 400 }
      );
    }

    if (!isBusinessHours(pickupDate)) {
      return NextResponse.json(
        { error: "Pickup time must be during business hours (Mon-Fri, 8 AM - 3 PM, Wed until 4 PM)." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "At least one item is required." },
        { status: 400 }
      );
    }

    // Calculate total
    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Try Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-supabase")) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Insert order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: customerName.trim(),
          pickup_time: pickupDate.toISOString(),
          total,
          status: "pending",
        })
        .select("id")
        .single();

      if (orderError) {
        return NextResponse.json(
          { error: "Failed to create order." },
          { status: 500 }
        );
      }

      // Insert order items
      const orderItems = items.map(
        (item: { menuItemId: string; quantity: number; price: number }) => ({
          order_id: order.id,
          menu_item_id: item.menuItemId,
          quantity: item.quantity,
          price: item.price,
        })
      );

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        return NextResponse.json(
          { error: "Failed to create order items." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        orderId: order.id.slice(0, 8).toUpperCase(),
        pickupTime: pickupDate.toISOString(),
        total,
      });
    }

    // Fallback: no Supabase — just return a mock order
    const mockId = Math.random().toString(36).substring(2, 10).toUpperCase();
    return NextResponse.json({
      orderId: mockId,
      pickupTime: pickupDate.toISOString(),
      total,
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
