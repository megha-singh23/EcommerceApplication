INSERT INTO categories (id, description, name) VALUES
(1, 'Everyday gadgets and accessories.', 'Electronics'),
(2, 'Tools and essentials for the kitchen and home.', 'Home & Kitchen'),
(3, 'Clothing and everyday wear.', 'Apparel'),
(4, 'Paperbacks, guides, and journals.', 'Books'),
(5, 'Gear for getting outside and staying active.', 'Sports & Outdoors');

INSERT INTO products
(id, created_at, description, image_url, name, price, stock_quantity, updated_at, category_id)
VALUES
(
1,
CURRENT_TIMESTAMP,
'Over-ear headphones with active noise cancellation and a 30-hour battery life.',
'https://images.unsplash.com/photo-1567928513899-997d98489fbd?w=600&h=600&fit=crop&q=80&auto=format',
'Wireless Noise-Cancelling Headphones',
129.99,
40,
CURRENT_TIMESTAMP,
1
),

(
2,
CURRENT_TIMESTAMP,
'Compact, splash-resistant speaker with 12 hours of playback.',
'https://images.unsplash.com/photo-1542483381-41a479b1fb88?w=600&h=600&fit=crop&q=80&auto=format',
'Portable Bluetooth Speaker',
59.99,
60,
CURRENT_TIMESTAMP,
1
),

(
3,
CURRENT_TIMESTAMP,
'Waterproof action camera with image stabilization and a mounting kit.',
'https://images.unsplash.com/photo-1571190144364-1da84d9ca448?w=600&h=600&fit=crop&q=80&auto=format',
'4K Action Camera',
89.50,
25,
CURRENT_TIMESTAMP,
1
),

(
4,
CURRENT_TIMESTAMP,
'Compact GaN charger with two ports for laptops and phones.',
'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop&q=80&auto=format',
'USB-C Fast Charger (65W)',
24.99,
100,
CURRENT_TIMESTAMP,
1
),

(
5,
CURRENT_TIMESTAMP,
'34oz French press for a full-bodied morning brew.',
'https://images.unsplash.com/photo-1708127368781-cd5f069a90a5?w=600&h=600&fit=crop&q=80&auto=format',
'Stainless Steel French Press',
34.99,
50,
CURRENT_TIMESTAMP,
2
);