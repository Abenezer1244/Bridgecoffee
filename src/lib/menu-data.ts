import { MenuItem } from "@/types";

// Static fallback menu data — used when Supabase is not configured
export const fallbackMenuItems: MenuItem[] = [
  // Espresso
  { id: "1", name: "Espresso", description: "Rich, bold single or double shot pulled to perfection.", price: 3.00, category: "espresso", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 1 },
  { id: "2", name: "Americano", description: "Espresso with hot water — clean and smooth.", price: 3.50, category: "espresso", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 2 },
  { id: "3", name: "Latte", description: "Silky steamed milk with espresso. Our most popular drink.", price: 5.00, category: "espresso", image_url: null, dietary_tags: [], available: true, sort_order: 3 },
  { id: "4", name: "Caramel Latte", description: "House-made caramel with espresso and steamed milk.", price: 5.50, category: "espresso", image_url: null, dietary_tags: [], available: true, sort_order: 4 },
  { id: "5", name: "Cappuccino", description: "Equal parts espresso, steamed milk, and velvety foam.", price: 4.50, category: "espresso", image_url: null, dietary_tags: [], available: true, sort_order: 5 },
  { id: "6", name: "Mocha", description: "Espresso meets rich chocolate and steamed milk.", price: 5.50, category: "espresso", image_url: null, dietary_tags: [], available: true, sort_order: 6 },
  { id: "7", name: "Vanilla Latte", description: "Real vanilla bean syrup with espresso and milk.", price: 5.50, category: "espresso", image_url: null, dietary_tags: [], available: true, sort_order: 7 },

  // Drip
  { id: "8", name: "House Drip", description: "Freshly brewed single-origin, rotated weekly.", price: 2.50, category: "drip", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 1 },
  { id: "9", name: "French Press", description: "Full-bodied immersion brew. Serves one or two.", price: 4.00, category: "drip", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 2 },
  { id: "10", name: "Pour Over", description: "Hand-poured, made to order. Clean and bright.", price: 4.50, category: "drip", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 3 },

  // Cold Brew
  { id: "11", name: "Cold Brew", description: "Slow-steeped overnight. Smooth and naturally sweet.", price: 4.50, category: "cold_brew", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 1 },
  { id: "12", name: "Iced Latte", description: "Espresso over ice with cold milk.", price: 5.00, category: "cold_brew", image_url: null, dietary_tags: [], available: true, sort_order: 2 },
  { id: "13", name: "Iced Mocha", description: "Chilled espresso, chocolate, and milk over ice.", price: 5.50, category: "cold_brew", image_url: null, dietary_tags: [], available: true, sort_order: 3 },

  // Tea
  { id: "14", name: "Hot Tea", description: "Selection of premium loose-leaf teas.", price: 3.00, category: "tea", image_url: null, dietary_tags: ["vegan", "gluten_free"], available: true, sort_order: 1 },
  { id: "15", name: "Chai Latte", description: "Spiced chai concentrate with steamed milk.", price: 5.00, category: "tea", image_url: null, dietary_tags: [], available: true, sort_order: 2 },
  { id: "16", name: "Matcha Latte", description: "Ceremonial grade matcha whisked with steamed milk.", price: 5.50, category: "tea", image_url: null, dietary_tags: [], available: true, sort_order: 3 },

  // Pastries
  { id: "17", name: "Orange Hazelnut Bun", description: "Fresh-baked with orange zest and toasted hazelnuts.", price: 4.00, category: "pastry", image_url: null, dietary_tags: [], available: true, sort_order: 1 },
  { id: "18", name: "Croissant", description: "Buttery, flaky, baked fresh daily.", price: 3.50, category: "pastry", image_url: null, dietary_tags: [], available: true, sort_order: 2 },
  { id: "19", name: "Blueberry Muffin", description: "Bursting with real blueberries.", price: 3.50, category: "pastry", image_url: null, dietary_tags: [], available: true, sort_order: 3 },
  { id: "20", name: "Banana Bread", description: "Moist, homestyle, with a hint of cinnamon.", price: 3.50, category: "pastry", image_url: null, dietary_tags: [], available: true, sort_order: 4 },

  // Seasonal
  { id: "21", name: "Pumpkin Spice Latte", description: "Seasonal favorite with real pumpkin and warm spices.", price: 6.00, category: "seasonal", image_url: null, dietary_tags: [], available: true, sort_order: 1 },
  { id: "22", name: "Maple Oat Latte", description: "Vermont maple syrup with oat milk and espresso.", price: 6.00, category: "seasonal", image_url: null, dietary_tags: ["vegan"], available: true, sort_order: 2 },
];
