import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  BookOpen,
  Search,
  MessageSquare,
  ScrollText,
  Bookmark,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import the DevPhotoUpload component to ensure it's only loaded in development
const DevPhotoUpload =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("@/components/dev-photo-upload"), { ssr: false })
    : null;

// Use dynamic imports for components to improve initial load time
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-sky-100 to-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1603826773128-fefac9c74bab?w=1200&q=80')] bg-cover bg-center opacity-5"></div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight md:leading-snug tracking-wide text-gray-900 text-center max-w-4xl mx-auto">
            <div className="whitespace-nowrap">Roman Legal Texts Research</div>
            <span className="text-blue-600 block">Platform</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            An interactive academic platform for scholars to search, analyze,
            and annotate ancient Roman legal texts with a focus on identifying
            interpolations with varying confidence levels.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center sm:space-x-4 gap-4 sm:gap-0">
            <Link
              href={user ? "/dashboard" : "/sign-in"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center transition-all transform hover:scale-105"
            >
              {user ? "Go to Dashboard" : "Sign In as Scholar"}
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides powerful tools for Roman legal text research
              and scholarly collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-6 h-6" />,
                title: "Advanced Search",
                description:
                  "Keyword and semantic similarity matching with relevance scores",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Interactive Annotation",
                description:
                  "Mark passages as interpolations with different annotation types",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Scholarly Collaboration",
                description:
                  "Community selections with confidence indicators and attribution",
              },
              {
                icon: <ScrollText className="w-6 h-6" />,
                title: "Text Analysis",
                description:
                  "Side-by-side text comparison with visual confidence indicators",
              },
              {
                icon: <Bookmark className="w-6 h-6" />,
                title: "Save & Export",
                description:
                  "Save your annotations and export them for academic publications",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Academic Profiles",
                description:
                  "Scholar profiles with academic credentials and contribution history",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the process of identifying and annotating
              interpolations in Roman legal texts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Select</h3>
              <p className="text-gray-600">
                Find relevant texts using our advanced search functionality
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Annotate</h3>
              <p className="text-gray-600">
                Mark passages as interpolations with confidence levels
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-700">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
              <p className="text-gray-600">
                Share your findings with the scholarly community
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the team behind the Roman Legal Texts Research Platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {process.env.NODE_ENV === "development" && DevPhotoUpload ? (
                  <DevPhotoUpload id="jk" initials="JK" />
                ) : (
                  <span className="text-2xl font-bold text-blue-700">JK</span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">
                Joanna Kulawiak-Cyrankowska
              </h3>
              <p className="text-blue-600 mb-3">Director and Founder</p>
              <p className="text-gray-600 text-sm">
                Leading the vision and academic direction of our platform.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {process.env.NODE_ENV === "development" && DevPhotoUpload ? (
                  <DevPhotoUpload id="sa" initials="SA" />
                ) : (
                  <span className="text-2xl font-bold text-blue-700">SA</span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">Sari Albaaja</h3>
              <p className="text-blue-600 mb-3">Backend, Sec-Ops</p>
              <p className="text-gray-600 text-sm">
                Ensuring the security and performance of our platform
                infrastructure.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {process.env.NODE_ENV === "development" && DevPhotoUpload ? (
                  <DevPhotoUpload id="m" initials="M" />
                ) : (
                  <span className="text-2xl font-bold text-blue-700">M</span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-1">Marten</h3>
              <p className="text-blue-600 mb-3">
                Data Analyst and Data Verification
              </p>
              <p className="text-gray-600 text-sm">
                Ensuring accuracy and reliability of our textual database.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-sky-100">Legal Texts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sky-100">Academic Scholars</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-sky-100">Annotations</div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join the Scholarly Community
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contribute to the advancement of Roman legal text research and
            collaborate with scholars worldwide.
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-up"}
            className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            {user ? "Go to Dashboard" : "Register as a Scholar"}
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
