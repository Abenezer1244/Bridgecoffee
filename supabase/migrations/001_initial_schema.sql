-- Menu items
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal NOT NULL,
  category text NOT NULL CHECK (category IN ('espresso', 'drip', 'cold_brew', 'tea', 'pastry', 'seasonal')),
  image_url text,
  dietary_tags text[] DEFAULT '{}',
  available boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Orders (pickup, no payment)
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  pickup_time timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed')),
  total decimal NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Order line items
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid NOT NULL REFERENCES menu_items(id),
  quantity int NOT NULL DEFAULT 1,
  price decimal NOT NULL
);

-- Indexes
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(available);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
