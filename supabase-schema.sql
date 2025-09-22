-- Flynzo Tours Database Schema
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  reviews INTEGER DEFAULT 0,
  starting_price INTEGER NOT NULL,
  tours INTEGER DEFAULT 0,
  highlights TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  capacity VARCHAR(50) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0.0,
  reviews INTEGER DEFAULT 0,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  rating INTEGER DEFAULT 5,
  text TEXT NOT NULL,
  image TEXT NOT NULL,
  tour VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create company_info table
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create story_elements table
CREATE TABLE IF NOT EXISTS story_elements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  full_story TEXT NOT NULL,
  image TEXT NOT NULL,
  overlay_image TEXT NOT NULL,
  color VARCHAR(100) NOT NULL,
  position JSONB NOT NULL,
  scale DECIMAL(3,1) DEFAULT 1.0,
  rotation INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default Indian destinations
INSERT INTO destinations (name, region, image, rating, reviews, starting_price, tours, highlights, description) VALUES
('Kashmir, India', 'North India', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center', 4.9, 245, 15999, 8, ARRAY['Dal Lake', 'Gulmarg', 'Pahalgam', 'Srinagar'], 'Experience the paradise on earth with stunning landscapes, houseboats, and snow-capped mountains.'),
('Goa, India', 'West India', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop&crop=center', 4.8, 189, 8999, 12, ARRAY['Beaches', 'Portuguese Architecture', 'Nightlife', 'Spice Plantations'], 'Discover the perfect blend of beaches, culture, and vibrant nightlife in India''s party capital.'),
('Kerala, India', 'South India', 'https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=800&h=600&fit=crop&crop=center', 4.7, 167, 12999, 15, ARRAY['Backwaters', 'Tea Plantations', 'Ayurveda', 'Wildlife Sanctuaries'], 'Relax in God''s Own Country with pristine backwaters, lush landscapes, and rich cultural heritage.'),
('Rajasthan, India', 'North India', 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&crop=center', 4.9, 234, 11999, 6, ARRAY['Palaces', 'Desert Safari', 'Forts', 'Cultural Heritage'], 'Marvel at royal palaces, majestic forts, and vibrant culture in the land of kings.'),
('Himachal Pradesh, India', 'North India', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center', 4.6, 312, 10999, 20, ARRAY['Shimla', 'Manali', 'Dharamshala', 'Adventure Sports'], 'Experience the beauty of mountains, adventure sports, and peaceful hill stations.'),
('Tamil Nadu, India', 'South India', 'https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=800&h=600&fit=crop&crop=center', 4.8, 198, 9999, 10, ARRAY['Temples', 'Hill Stations', 'Beaches', 'Cultural Heritage'], 'Explore ancient temples, beautiful hill stations, and rich cultural traditions of South India.');

-- Insert default tours
INSERT INTO tours (title, destination, price, duration, capacity, rating, reviews, image, description, highlights) VALUES
('Kashmir Paradise Package', 'Kashmir, India', '₹25,999', '7 days', '2-8 people', 4.9, 156, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center', 'Experience the paradise on earth with houseboats and snow-capped mountains.', ARRAY['Dal Lake Shikara', 'Gulmarg Gondola', 'Pahalgam Trek', 'Houseboat Stay']),
('Goa Beach Adventure', 'Goa, India', '₹18,999', '6 days', '4-12 people', 4.8, 203, 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop&crop=center', 'Discover the perfect blend of beaches, culture, and Portuguese heritage.', ARRAY['Beach Hopping', 'Portuguese Heritage', 'Water Sports', 'Nightlife']),
('Kerala Backwater Escape', 'Kerala, India', '₹22,999', '8 days', '2-10 people', 4.9, 142, 'https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=800&h=600&fit=crop&crop=center', 'Relax in God''s Own Country with backwaters and Ayurvedic treatments.', ARRAY['Backwater Cruise', 'Tea Plantations', 'Ayurvedic Spa', 'Kathakali Show']);

-- Insert default testimonials
INSERT INTO testimonials (name, location, rating, text, image, tour) VALUES
('Priya Sharma', 'Mumbai, India', 5, 'Flynzo made our Kashmir honeymoon absolutely magical. Every detail was perfectly planned, and our guide was incredibly knowledgeable. The houseboat stay on Dal Lake was unforgettable!', 'https://images.unsplash.com/photo-1494790108755-2616b612b293?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 'Kashmir Paradise Package'),
('Rajesh Kumar', 'Delhi, India', 5, 'The Goa Beach Adventure exceeded all expectations. From the Portuguese heritage sites to the pristine beaches, every moment was carefully curated. The cultural experiences were authentic and enriching.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 'Goa Beach Adventure'),
('Anita Patel', 'Ahmedabad, India', 5, 'Kerala was a dream come true! The backwaters were pristine, the temples were awe-inspiring, and the Ayurvedic treatments were heavenly. Flynzo took care of everything seamlessly.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', 'Kerala Backwater Escape');

-- Insert company information
INSERT INTO company_info (name, email, phone, address, contact_person) VALUES
('Flynzo Innovation Private Limited', 'Info.flynzo@gmail.com', '+91 9773713859, +91 9724287467', 'Shop No.28, Alif Plaza, Shop B/143/28, 1st Floor, Kanodar, Banaskantha, Palanpur, Gujarat, India, 385520', 'Nashra, Nitin Mongroda');

-- Insert default admin user (password: admin123 - CHANGE THIS!)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('Info.flynzo@gmail.com', '$2b$12$ssVXjLdwNmMbnwhgJ7T6/OR/qHxeivht/5oSvorNoWBsvKVu.0k5m', 'Flynzo Admin', 'admin');

-- Insert story elements
INSERT INTO story_elements (title, subtitle, description, full_story, image, overlay_image, color, position, scale, rotation) VALUES
('Kashmir', 'Paradise on Earth', 'Where snow-capped mountains meet pristine lakes', 'Step into a world where every view takes your breath away, where Dal Lake reflects the beauty of heaven, and where your journey becomes part of Kashmir''s eternal magic.', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop&crop=center', 'from-blue-400 via-cyan-500 to-indigo-600', '{"x": 20, "y": 15}', 1.2, -5),
('Goa', 'Beach Paradise & Cultural Heritage', 'Where Portuguese charm meets golden beaches', 'Journey through a coastal paradise where every sunset paints a new masterpiece, where ancient churches stand beside modern beaches, and where every moment celebrates life''s simple pleasures.', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop&crop=center', 'from-orange-400 via-yellow-500 to-red-500', '{"x": 70, "y": 25}', 1.1, 3),
('Kerala', 'God''s Own Country', 'Tropical paradise where backwaters meet culture', 'Discover a land where every backwater tells a story, where tea plantations stretch to infinity, and where every breath is filled with the essence of nature''s purest beauty.', 'https://images.unsplash.com/photo-1583417319078-4a69db38a482?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop&crop=center', 'from-green-400 via-emerald-500 to-teal-600', '{"x": 40, "y": 60}', 1.3, -2);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_destinations_updated_at BEFORE UPDATE ON destinations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON tours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_info_updated_at BEFORE UPDATE ON company_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_story_elements_updated_at BEFORE UPDATE ON story_elements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tours FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON company_info FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON story_elements FOR SELECT USING (true);

-- Create policies for admin access (you'll need to implement authentication)
CREATE POLICY "Allow admin full access" ON destinations FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON tours FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON testimonials FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON company_info FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON story_elements FOR ALL USING (true);
CREATE POLICY "Allow admin full access" ON admin_users FOR ALL USING (true);
