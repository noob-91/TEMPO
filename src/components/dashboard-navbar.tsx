"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import { Button } from "./ui/button";
import { Home, BookOpen, Search, BookMarked } from "lucide-react";
import { useRouter } from "next/navigation";
import UserProfile from "./user-profile";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" prefetch className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Roman Texts</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/search"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>Search Texts</span>
          </Link>
          <Link
            href="/dashboard/texts"
            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all"
          >
            <BookMarked className="h-4 w-4" />
            <span>Browse Texts</span>
          </Link>
        </div>

        {/* Profile button removed */}
      </div>
    </nav>
  );
}
