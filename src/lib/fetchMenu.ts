import { MenuItem } from "@/types";
import { fallbackMenuItems } from "./menu-data";

export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-supabase")) {
      const { supabase } = await import("@/lib/supabase");
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("sort_order");

      if (!error && data && data.length > 0) {
        return data as MenuItem[];
      }
    }
  } catch {
    // Fall through to fallback
  }

  return fallbackMenuItems;
}
