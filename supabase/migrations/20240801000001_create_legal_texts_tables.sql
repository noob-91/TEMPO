-- Create the legal_texts table for storing Roman legal text data
CREATE TABLE IF NOT EXISTS legal_texts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_id VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  date VARCHAR(100),
  category VARCHAR(100),
  content TEXT NOT NULL,
  source VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for text search
CREATE INDEX IF NOT EXISTS legal_texts_title_idx ON legal_texts USING GIN (to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS legal_texts_content_idx ON legal_texts USING GIN (to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS legal_texts_category_idx ON legal_texts (category);

-- Create annotations table to store user annotations
CREATE TABLE IF NOT EXISTS annotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text_id UUID NOT NULL REFERENCES legal_texts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('deletion', 'insertion', 'suspect')),
  start_index INTEGER NOT NULL,
  end_index INTEGER NOT NULL,
  selected_text TEXT NOT NULL,
  confidence VARCHAR(50) NOT NULL CHECK (confidence IN ('high', 'medium', 'review')),
  justification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster annotation retrieval
CREATE INDEX IF NOT EXISTS annotations_text_id_idx ON annotations(text_id);
CREATE INDEX IF NOT EXISTS annotations_user_id_idx ON annotations(user_id);

-- Create votes table for annotation voting
CREATE TABLE IF NOT EXISTS annotation_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  annotation_id UUID NOT NULL REFERENCES annotations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(annotation_id, user_id)
);

-- Enable row-level security
ALTER TABLE legal_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotations ENABLE ROW LEVEL SECURITY;
ALTER TABLE annotation_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for legal_texts
DROP POLICY IF EXISTS "Legal texts are viewable by everyone" ON legal_texts;
CREATE POLICY "Legal texts are viewable by everyone" 
  ON legal_texts FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Legal texts are insertable by authenticated users" ON legal_texts;
CREATE POLICY "Legal texts are insertable by authenticated users" 
  ON legal_texts FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Create policies for annotations
DROP POLICY IF EXISTS "Annotations are viewable by everyone" ON annotations;
CREATE POLICY "Annotations are viewable by everyone" 
  ON annotations FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can create their own annotations" ON annotations;
CREATE POLICY "Users can create their own annotations" 
  ON annotations FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own annotations" ON annotations;
CREATE POLICY "Users can update their own annotations" 
  ON annotations FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own annotations" ON annotations;
CREATE POLICY "Users can delete their own annotations" 
  ON annotations FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Create policies for annotation votes
DROP POLICY IF EXISTS "Votes are viewable by everyone" ON annotation_votes;
CREATE POLICY "Votes are viewable by everyone" 
  ON annotation_votes FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Users can create their own votes" ON annotation_votes;
CREATE POLICY "Users can create their own votes" 
  ON annotation_votes FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own votes" ON annotation_votes;
CREATE POLICY "Users can update their own votes" 
  ON annotation_votes FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own votes" ON annotation_votes;
CREATE POLICY "Users can delete their own votes" 
  ON annotation_votes FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Enable realtime for all tables
alter publication supabase_realtime add table legal_texts;
alter publication supabase_realtime add table annotations;
alter publication supabase_realtime add table annotation_votes;
