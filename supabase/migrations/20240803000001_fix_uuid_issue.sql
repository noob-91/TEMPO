-- Fix the UUID issue by changing column types
ALTER TABLE legal_texts ALTER COLUMN book_no TYPE VARCHAR(50);
ALTER TABLE legal_texts ALTER COLUMN section_no TYPE VARCHAR(50);
ALTER TABLE legal_texts ALTER COLUMN passage_no TYPE VARCHAR(50);
ALTER TABLE legal_texts ALTER COLUMN textunit_no TYPE VARCHAR(50);

-- Make sure all columns accept NULL values
ALTER TABLE legal_texts ALTER COLUMN book_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN section_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN passage_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN textunit_no DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN header DROP NOT NULL;
ALTER TABLE legal_texts ALTER COLUMN text DROP NOT NULL;
