-- Ensure the users table has RLS disabled (default for this app)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Make sure the avatar_url column exists
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add a trigger to update the users table when auth.users changes
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.users
  SET 
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    full_name = NEW.raw_user_meta_data->>'full_name',
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_update();
