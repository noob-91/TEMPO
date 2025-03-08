"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Search,
  Filter,
  SortAsc,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";

interface Text {
  id: string;
  text_id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [texts, setTexts] = useState<Text[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTexts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("query", searchQuery);
      if (selectedCategory !== "All")
        params.append("category", selectedCategory);
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      const response = await fetch(`/api/search?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch texts");
      }

      setTexts(data.texts || []);
      setCategories(data.categories || ["All"]);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Search error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to search texts",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, [pagination.page, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 }); // Reset to first page
    fetchTexts();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPagination({ ...pagination, page: 1 }); // Reset to first page
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Text Collection
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Browse our collection of Roman legal texts. Select a text to view,
              analyze, and annotate potential interpolations.
            </p>
          </header>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
            <form
              onSubmit={handleSearch}
              className="relative w-full md:w-96 flex gap-2"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search texts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <SortAsc className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className={
                  category === selectedCategory
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : ""
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
              {error}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && texts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No texts found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {searchQuery || selectedCategory !== "All"
                  ? "Try adjusting your search or filters"
                  : "No texts are currently available in the database"}
              </p>
              <div className="mt-6">
                <Link href="/dashboard/texts">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Browse Texts
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Text Collection Grid */}
          {!isLoading && !error && texts.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {texts.map((text) => (
                  <Link href={`/dashboard/texts/${text.text_id}`} key={text.id}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-gray-200 hover:border-sky-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {text.title ||
                                text.header ||
                                `Text ${text.text_id}`}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {text.author ? `${text.author}, ` : ""}
                              {text.date || ""}
                              {text.book_no && text.section_no
                                ? ` (${text.book_no}.${text.section_no}${text.passage_no ? `.${text.passage_no}` : ""})`
                                : ""}
                            </CardDescription>
                          </div>
                          <div className="bg-sky-100 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                            {text.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {/* This would be the annotation count in a real app */}
                            {Math.floor(Math.random() * 30)} annotations
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-gray-500 pt-0 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Last updated recently</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          page: Math.max(1, pagination.page - 1),
                        })
                      }
                      disabled={pagination.page === 1 || isLoading}
                    >
                      Previous
                    </Button>
                    {Array.from(
                      { length: pagination.totalPages },
                      (_, i) => i + 1,
                    ).map((page) => (
                      <Button
                        key={page}
                        variant={
                          page === pagination.page ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setPagination({ ...pagination, page })}
                        disabled={isLoading}
                        className={
                          page === pagination.page ? "bg-blue-600" : ""
                        }
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          page: Math.min(
                            pagination.totalPages,
                            pagination.page + 1,
                          ),
                        })
                      }
                      disabled={
                        pagination.page === pagination.totalPages || isLoading
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
