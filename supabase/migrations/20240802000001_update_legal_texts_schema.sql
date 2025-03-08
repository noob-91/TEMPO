-- Add new columns to legal_texts table to match CSV format
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS book_no VARCHAR(50);
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS section_no VARCHAR(50);
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS passage_no VARCHAR(50);
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS textunit_no VARCHAR(50);
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS header TEXT;
ALTER TABLE legal_texts ADD COLUMN IF NOT EXISTS text TEXT;

-- Create index on new columns for better search performance
CREATE INDEX IF NOT EXISTS legal_texts_book_no_idx ON legal_texts(book_no);
CREATE INDEX IF NOT EXISTS legal_texts_section_no_idx ON legal_texts(section_no);
CREATE INDEX IF NOT EXISTS legal_texts_passage_no_idx ON legal_texts(passage_no);

-- Update the text search index to include the new text column
CREATE INDEX IF NOT EXISTS legal_texts_text_idx ON legal_texts USING GIN (to_tsvector('english', text));
CREATE INDEX IF NOT EXISTS legal_texts_header_idx ON legal_texts USING GIN (to_tsvector('english', header));
