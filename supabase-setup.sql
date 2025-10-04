-- Create posts table in Supabase
CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'active',
  user_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create images bucket for file storage
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read all posts
CREATE POLICY "Allow read access for all users" ON posts
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert their own posts
CREATE POLICY "Allow insert for authenticated users" ON posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create policy to allow users to update their own posts
CREATE POLICY "Allow update for own posts" ON posts
  FOR UPDATE USING (auth.uid()::text = user_id);

-- Create policy to allow users to delete their own posts
CREATE POLICY "Allow delete for own posts" ON posts
  FOR DELETE USING (auth.uid()::text = user_id);

