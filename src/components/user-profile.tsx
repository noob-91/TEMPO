"use client";

import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "../../supabase/client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserProfile() {
  const supabase = createClient();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function getUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // Add a timestamp to the URL to prevent caching
        const url = user.user_metadata?.avatar_url || null;
        setAvatarUrl(url ? `${url.split("?")[0]}?t=${Date.now()}` : null);
        setUserName(
          user.user_metadata?.full_name || user.email?.split("@")[0] || "",
        );
      }
    }
    getUserProfile();

    // Set up auth state change listener to update avatar when profile changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "USER_UPDATED" && session?.user) {
        // Add a timestamp to the URL to prevent caching
        const url = session.user.user_metadata?.avatar_url || null;
        setAvatarUrl(url ? `${url.split("?")[0]}?t=${Date.now()}` : null);
        setUserName(
          session.user.user_metadata?.full_name ||
            session.user.email?.split("@")[0] ||
            "",
        );
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Return null to remove the profile button
  return null;
}
