INSERT INTO categories (id, description, name) VALUES
(1, 'Everyday gadgets and accessories.', 'Electronics'),
(2, 'Tools and essentials for the kitchen and home.', 'Home & Kitchen'),
(3, 'Clothing and everyday wear.', 'Apparel'),
(4, 'Paperbacks, guides, and journals.', 'Books'),
(5, 'Gear for getting outside and staying active.', 'Sports & Outdoors');

INSERT INTO products (created_at, description, image_url, name, price, stock_quantity, updated_at, category_id)
VALUES
(CURRENT_TIMESTAMP, 'Over-ear headphones with active noise cancellation and a 30-hour battery life.', 'https://images.unsplash.com/photo-1567928513899-997d98489fbd?w=600&h=600&fit=crop&q=80&auto=format', 'Wireless Noise-Cancelling Headphones', 129.99, 40, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Compact, splash-resistant speaker with 12 hours of playback.', 'https://images.unsplash.com/photo-1542483381-41a479b1fb88?w=600&h=600&fit=crop&q=80&auto=format', 'Portable Bluetooth Speaker', 59.99, 60, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Waterproof action camera with image stabilization and a mounting kit.', 'https://images.unsplash.com/photo-1571190144364-1da84d9ca448?w=600&h=600&fit=crop&q=80&auto=format', '4K Action Camera', 89.50, 25, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Compact GaN charger with two ports for laptops and phones.', 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop&q=80&auto=format', 'USB-C Fast Charger (65W)', 24.99, 100, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, '34oz French press for a full-bodied morning brew.', 'https://images.unsplash.com/photo-1708127368781-cd5f069a90a5?w=600&h=600&fit=crop&q=80&auto=format', 'Stainless Steel French Press', 34.99, 50, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'PFOA-free ceramic coating, oven safe up to 450°F.', 'https://images.unsplash.com/photo-1604762432718-b0cd3db01b18?w=600&h=600&fit=crop&q=80&auto=format', 'Ceramic Non-Stick Frying Pan 12"', 42.00, 35, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Rapid-boil kettle with auto shut-off and boil-dry protection.', 'https://images.unsplash.com/photo-1738520420652-0c47cea3922b?q=80&w=871&auto=format&fit=crop', 'Electric Kettle 1.7L', 29.99, 45, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Set of 3 boards in graduated sizes, sourced from sustainable bamboo.', 'https://plus.unsplash.com/premium_photo-1714638224435-f225b9e9e2fa?q=80&w=869&auto=format&fit=crop', 'Bamboo Cutting Board Set', 19.99, 70, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Soft, breathable tee made from 100% organic cotton.', 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=872&auto=format&fit=crop', 'Organic Cotton T-Shirt', 18.00, 148, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Mid-weight denim jacket with a relaxed fit.', 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=369&auto=format&fit=crop', 'Classic Denim Jacket', 64.99, 30, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Lightweight, itch-free beanie for cold-weather days.', 'https://plus.unsplash.com/premium_photo-1758742058529-6fb2fda160cf?q=80&w=871&auto=format&fit=crop', 'Merino Wool Beanie', 22.50, 80, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Low-top canvas sneakers with a cushioned insole.', 'https://images.unsplash.com/photo-1633781960658-549f4596baaa?q=80&w=870&auto=format&fit=crop', 'Everyday Canvas Sneakers', 49.99, 54, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'A practical guide to writing maintainable software.', 'https://pipegalera.com/mostly_books/book-clean-code/images/cover.jpeg', 'The Art of Clean Code', 27.99, 40, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Recipes and techniques from kitchens around the world.', 'https://images.unsplash.com/photo-1627907228175-2bf846a303b4?q=80&w=774&auto=format&fit=crop', 'Atlas of Modern Cooking', 35.00, 18, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'A guided journal for a calmer start to the day.', 'https://images.squarespace-cdn.com/content/v1/60ff2e3a59e9d9453011c8f0/3b10b5e7-4643-4f97-9e15-f02e0e3ab1a1/Copy+of+healthcare+workers+meditation+.png?format=1000w', 'Mindful Mornings: A Journal', 14.99, 89, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'An illustrated guide to spotting and identifying birds.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbD-s2C0dMFlm7_uvaDT8QVS5lczDm5aScziBqcCZx1w&s=10', 'Field Guide to Birdwatching', 21.50, 23, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Keeps drinks cold for 24 hours or hot for 12.', 'https://images.unsplash.com/photo-1544003484-3cd181d17917?q=80&w=464&auto=format&fit=crop', 'Insulated Steel Water Bottle 32oz', 26.00, 64, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Non-slip, 6mm-thick mat with a carrying strap.', 'https://plus.unsplash.com/premium_photo-1675155952889-abb299df1fe7?q=80&w=1029&auto=format&fit=crop', 'Adjustable Yoga Mat', 31.99, 40, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Lightweight pack with a hydration sleeve and trekking-pole loops.', 'https://images.unsplash.com/photo-1760594387039-8db5aa19c06a?q=80&w=387&auto=format&fit=crop', 'Trail Running Backpack 20L', 74.99, 17, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Compact, packable chair rated for up to 300 lbs.', 'https://images.unsplash.com/photo-1557102298-24bcd766efc6?q=80&w=387&auto=format&fit=crop', 'Folding Camping Chair', 39.95, 28, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Tactile mechanical switches with per-key RGB lighting, anti-ghosting and aluminium frame.', 'https://media.istockphoto.com/id/1336345692/photo/mechanical-gaming-keyboard-with-backlight-top-view-gaming-keyboard-with-rgb-backlight-rgb-led.webp?a=1&b=1&s=612x612&w=0&k=20&c=UvqjfINwHG_xab6AzEzvDVV7rpHNgS0QjDSZmAimwHw=', 'Mechanical RGB Gaming Keyboard', 3999.00, 40, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Ergonomic gaming mouse with 25K DPI sensor, 70hr battery and programmable buttons.', 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80', 'Wireless Gaming Mouse', 2799.00, 55, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, '10.1-inch FHD display tablet with Octa-core processor, 4GB RAM, 64GB storage and dual camera.', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80', '10 inch Android Tablet', 18999.00, 25, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Ultra compact 65W USB-C fast charger compatible with laptops, phones and tablets.', 'https://plus.unsplash.com/premium_photo-1759806457419-c5dfa3968eba?w=500&auto=format&fit=crop&q=60', '65W GaN Fast Charger', 1499.00, 90, CURRENT_TIMESTAMP, 1),

(CURRENT_TIMESTAMP, 'Oil-free cooking with 8 preset modes, digital touch panel and 360-degree hot air circulation.', 'https://media.istockphoto.com/id/1372704547/photo/air-fryer.webp?a=1&b=1&s=612x612&w=0&k=20&c=8ya__tMxvfCCp4EfbpUxDltRyFOfnGF2AYffFQJkxKc=', 'Digital Air Fryer 5.5L', 5499.00, 35, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'One-touch rice cooker with keep-warm function, non-stick inner pot and steam vent.', 'https://media.istockphoto.com/id/474462134/photo/rice-cooker.jpg?s=612x612&w=0&k=20&c=DSbOEF7vhywdv-SN9tfWEKTsjqob05SwiVuhplRJewo=', 'Electric Rice Cooker 1.8L', 1799.00, 60, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Lightweight 22000Pa suction cordless vacuum with HEPA filter, 45 min runtime.', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80', 'Cordless Stick Vacuum Cleaner', 8999.00, 20, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Set of 4 soy wax candles in lavender, vanilla, sandalwood and rose scents. 40hr burn time each.', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=500&q=80', 'Luxury Scented Candle Set', 1299.00, 80, CURRENT_TIMESTAMP, 2),

(CURRENT_TIMESTAMP, 'Spacious genuine leather tote bag with magnetic closure, inner pockets and adjustable strap.', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80', 'Women Leather Handbag', 3499.00, 45, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Genuine leather Oxford shoes with cushioned insole and rubber outsole. Office-ready style.', 'https://images.unsplash.com/photo-1616696038562-574c18066055?q=80&w=640&auto=format&fit=crop', 'Men Formal Oxford Shoes', 2999.00, 50, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Quick-dry lightweight shorts with elastic waist and side pockets. Ideal for gym and running.', 'https://plus.unsplash.com/premium_photo-1661773093245-1bc8125967e8?q=80&w=387&auto=format&fit=crop', 'Men Dry-Fit Sports Shorts', 799.00, 120, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Soft stretchable wool-blend beanie in 6 colors. Keeps you warm in winter.', 'https://plus.unsplash.com/premium_photo-1758742058529-6fb2fda160cf?q=80&w=871&auto=format&fit=crop', 'Unisex Knit Beanie Hat', 399.00, 150, CURRENT_TIMESTAMP, 3),

(CURRENT_TIMESTAMP, 'Robert Kiyosaki shares financial lessons about money, investing and building wealth.', 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTeVjsyK-jc9Mf8KTcqlW5gktn-fXBX0pMvmRIGVnD9YilZkwmIbyN3sFj-Pq6czfmQITAkCuNww3r89fO4bh9vPhAuRhFGoSM6YLm_P1MW_lp02TGKci3K-uMdZe2bFwneAfutJA&usqp=CAc', 'Rich Dad Poor Dad', 349.00, 180, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Morgan Housel explains how people think about money and make financial decisions.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKH5ezgw3u_9DjiJo8E8i1vDrvNj6KBNPOtPp0N4k3Kg&s=10', 'The Psychology of Money', 449.00, 160, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Rules for focused success in a distracted world. Essential for every professional.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzUkmmE1R95g2wQ3jbqI4jG-sqrof_T2zW09bwhOaSZA&s=10', 'Deep Work by Cal Newport', 549.00, 130, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Napoleon Hills timeless classic on the 13 principles of achieving success and wealth.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4znfIPog05ihDVLxdobRNOcPz2cwYYvklWKZaqGzsQg&s=10', 'Think and Grow Rich', 299.00, 200, CURRENT_TIMESTAMP, 4),

(CURRENT_TIMESTAMP, 'Lightweight aerodynamic bike helmet with 18 vents, adjustable dial fit and visor.', 'https://images.unsplash.com/photo-1601971360277-7b4c8aa60894?q=80&w=1374&auto=format&fit=crop', 'Cycling Safety Helmet', 2499.00, 40, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Adjustable steel cable jump rope with ball bearings for smooth spin. Ideal for cardio.', 'https://plus.unsplash.com/premium_photo-1664529498751-9bcd541edb9f?q=80&w=387&auto=format&fit=crop', 'Speed Jump Rope', 699.00, 110, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Set of 5 latex resistance bands with different tension levels. Great for home workouts.', 'https://media.istockphoto.com/id/2214213356/photo/multi-color-elastic-bands-for-fitness-isolated-on-white-background-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=cqKsm-fOs3VMq4hTtpQuKhob9xZLABO56nlUJhlalC0=', 'Resistance Bands Set of 5', 999.00, 95, CURRENT_TIMESTAMP, 5),

(CURRENT_TIMESTAMP, 'Double-wall vacuum insulated stainless steel bottle. Keeps cold 24hr and hot 12hr.', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80', 'Insulated Water Bottle 1L', 1199.00, 100, CURRENT_TIMESTAMP, 5);