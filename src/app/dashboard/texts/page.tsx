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
import { BookOpen, Search, Filter, SortAsc, Clock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

// Mock data for text collection
const textCollection = [
  {
    id: "digest-41-3-4",
    title: "Digest 41.3.4: On Usucaption and Long Possession",
    author: "Justinian",
    date: "533 CE",
    category: "Digest",
    annotations: 24,
    lastUpdated: "2023-12-15T14:30:00Z",
  },
  {
    id: "institutes-2-6",
    title: "Institutes 2.6: On Usucaption and Long Possession",
    author: "Justinian",
    date: "533 CE",
    category: "Institutes",
    annotations: 18,
    lastUpdated: "2023-11-20T09:15:00Z",
  },
  {
    id: "codex-7-33",
    title: "Codex 7.33: On Prescriptions",
    author: "Justinian",
    date: "534 CE",
    category: "Codex",
    annotations: 12,
    lastUpdated: "2023-10-05T16:45:00Z",
  },
  {
    id: "gaius-institutes-2-42",
    title: "Gaius Institutes 2.42-44: On Usucaption",
    author: "Gaius",
    date: "161 CE",
    category: "Pre-Justinian",
    annotations: 31,
    lastUpdated: "2023-12-10T11:20:00Z",
  },
  {
    id: "pauli-sententiae-5-2",
    title: "Pauli Sententiae 5.2: On Usucaption",
    author: "Julius Paulus",
    date: "3rd century CE",
    category: "Pre-Justinian",
    annotations: 15,
    lastUpdated: "2023-11-28T13:40:00Z",
  },
  {
    id: "ulpian-ad-edictum-16",
    title: "Ulpian, Ad Edictum 16: On Possession",
    author: "Ulpian",
    date: "211-222 CE",
    category: "Pre-Justinian",
    annotations: 22,
    lastUpdated: "2023-12-01T10:15:00Z",
  },
];

// Categories for filtering
const categories = ["All", "Digest", "Institutes", "Codex", "Pre-Justinian"];

export default async function TextsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

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
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search texts..." className="pl-10" />
            </div>
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
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={
                  category === "All"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Text Collection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textCollection.map((text) => (
              <Link href={`/dashboard/texts/${text.id}`} key={text.id}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-gray-200 hover:border-sky-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{text.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {text.author}, {text.date}
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
                        <BookOpen className="h-3 w-3" /> {text.annotations}{" "}
                        annotations
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-gray-500 pt-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      Last updated{" "}
                      {new Date(text.lastUpdated).toLocaleDateString()}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
