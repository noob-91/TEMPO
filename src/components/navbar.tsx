import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { BookOpen, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="flex items-center gap-2 transition-all"
        >
          <BookOpen className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold">Roman Texts</span>
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            Text Collection
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            Research
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            About
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {!user && (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
