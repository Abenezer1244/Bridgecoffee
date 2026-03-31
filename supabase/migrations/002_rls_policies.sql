-- Enable Row Level Security on all tables
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Menu items: public read, authenticated admin write
CREATE POLICY "Anyone can view menu items"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert menu items"
  ON menu_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items"
  ON menu_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete menu items"
  ON menu_items FOR DELETE
  TO authenticated
  USING (true);

-- Orders: public insert, authenticated read/update
CREATE POLICY "Anyone can place an order"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true);

-- Order items: public insert (with valid order), authenticated read
CREATE POLICY "Anyone can add order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);
