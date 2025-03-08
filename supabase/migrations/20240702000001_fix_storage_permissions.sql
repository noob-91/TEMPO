-- Create a storage bucket for profile photos if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to upload their own photos
DROP POLICY IF EXISTS "Allow authenticated users to upload profile photos" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload profile photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-photos');

-- Allow users to update their own photos
DROP POLICY IF EXISTS "Allow users to update profile photos" ON storage.objects;
CREATE POLICY "Allow users to update profile photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-photos');

-- Allow public access to profile photos
DROP POLICY IF EXISTS "Allow public access to profile photos" ON storage.objects;
CREATE POLICY "Allow public access to profile photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');

-- Allow users to delete their own photos
DROP POLICY IF EXISTS "Allow users to delete profile photos" ON storage.objects;
CREATE POLICY "Allow users to delete profile photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-photos');
