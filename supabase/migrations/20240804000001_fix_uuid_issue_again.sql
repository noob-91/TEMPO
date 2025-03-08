-- Ensure all columns are properly defined as VARCHAR and accept NULL values
ALTER TABLE legal_texts ALTER COLUMN book_no TYPE VARCHAR(50) USING book_no::VARCHAR;
ALTER TABLE legal_texts ALTER COLUMN section_no TYPE VARCHAR(50) USING section_no::VARCHAR;
ALTER TABLE legal_texts ALTER COLUMN passage_no TYPE VARCHAR(50) USING passage_no::VARCHAR;
ALTER TABLE legal_texts ALTER COLUMN textunit_no TYPE VARCHAR(50) USING textunit_no::VARCHAR;

-- Make sure all columns accept NULL values
ALTER TABLE legal_texts ALTER COLUMN book_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN section_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN passage_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN textunit_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN header DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN text DROP NOT NULL;

-- Ensure text_id is not a UUID but a VARCHAR
ALTER TABLE legal_texts ALTER COLUMN text_id TYPE VARCHAR(255);
