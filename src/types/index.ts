export interface ImageFrame {
  src: string;
  alt: string;
  startProgress: number;
  endProgress: number;
}

export interface StoryBeat {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  alignment: "left" | "center" | "right";
  progressStart: number;
  progressEnd: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: "espresso" | "drip" | "cold_brew" | "tea" | "pastry" | "seasonal";
  image_url: string | null;
  dietary_tags: string[];
  available: boolean;
  sort_order: number;
}

export interface Order {
  id: string;
  customer_name: string;
  pickup_time: string;
  status: "pending" | "preparing" | "ready" | "completed";
  total: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
