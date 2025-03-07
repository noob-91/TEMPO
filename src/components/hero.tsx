import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, MessageSquare } from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Hero() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603826773128-fefac9c74bab?w=1200&q=80')] bg-cover bg-center opacity-5" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Roman Legal Texts{" "}
              <span className="text-amber-700">Research Platform</span>
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              An interactive academic platform for scholars to search, analyze,
              and annotate ancient Roman legal texts with a focus on identifying
              interpolations with varying confidence levels.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={user ? "/dashboard" : "/sign-in"}
                className="inline-flex items-center px-8 py-4 text-white bg-amber-800 rounded-lg hover:bg-amber-900 transition-colors text-lg font-medium"
              >
                {user ? "Go to Dashboard" : "Sign In as Scholar"}
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-700" />
                <span>Advanced Search</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>Interactive Annotation</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-700" />
                <span>Scholarly Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
