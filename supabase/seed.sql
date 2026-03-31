-- Seed data for Bridge Coffee menu
-- Prices based on real Bridge Coffee offerings ($1-$10 range)

INSERT INTO menu_items (name, description, price, category, dietary_tags, sort_order) VALUES
-- Espresso
('Espresso', 'Rich, bold single or double shot pulled to perfection.', 3.00, 'espresso', '{"vegan"}', 1),
('Americano', 'Espresso with hot water — clean and smooth.', 3.50, 'espresso', '{"vegan"}', 2),
('Latte', 'Silky steamed milk with espresso. Our most popular drink.', 5.00, 'espresso', '{}', 3),
('Caramel Latte', 'House-made caramel with espresso and steamed milk.', 5.50, 'espresso', '{}', 4),
('Cappuccino', 'Equal parts espresso, steamed milk, and velvety foam.', 4.50, 'espresso', '{}', 5),
('Mocha', 'Espresso meets rich chocolate and steamed milk.', 5.50, 'espresso', '{}', 6),
('Vanilla Latte', 'Real vanilla bean syrup with espresso and milk.', 5.50, 'espresso', '{}', 7),

-- Drip
('House Drip', 'Freshly brewed single-origin, rotated weekly.', 2.50, 'drip', '{"vegan"}', 1),
('French Press', 'Full-bodied immersion brew. Serves one or two.', 4.00, 'drip', '{"vegan"}', 2),
('Pour Over', 'Hand-poured, made to order. Clean and bright.', 4.50, 'drip', '{"vegan"}', 3),

-- Cold Brew
('Cold Brew', 'Slow-steeped overnight. Smooth and naturally sweet.', 4.50, 'cold_brew', '{"vegan"}', 1),
('Iced Latte', 'Espresso over ice with cold milk.', 5.00, 'cold_brew', '{}', 2),
('Iced Mocha', 'Chilled espresso, chocolate, and milk over ice.', 5.50, 'cold_brew', '{}', 3),

-- Tea
('Hot Tea', 'Selection of premium loose-leaf teas.', 3.00, 'tea', '{"vegan", "gluten_free"}', 1),
('Chai Latte', 'Spiced chai concentrate with steamed milk.', 5.00, 'tea', '{}', 2),
('Matcha Latte', 'Ceremonial grade matcha whisked with steamed milk.', 5.50, 'tea', '{}', 3),

-- Pastries
('Orange Hazelnut Bun', 'Fresh-baked with orange zest and toasted hazelnuts.', 4.00, 'pastry', '{}', 1),
('Croissant', 'Buttery, flaky, baked fresh daily.', 3.50, 'pastry', '{}', 2),
('Blueberry Muffin', 'Bursting with real blueberries.', 3.50, 'pastry', '{}', 3),
('Banana Bread', 'Moist, homestyle, with a hint of cinnamon.', 3.50, 'pastry', '{}', 4),

-- Seasonal
('Pumpkin Spice Latte', 'Seasonal favorite with real pumpkin and warm spices.', 6.00, 'seasonal', '{}', 1),
('Maple Oat Latte', 'Vermont maple syrup with oat milk and espresso.', 6.00, 'seasonal', '{"vegan"}', 2);
