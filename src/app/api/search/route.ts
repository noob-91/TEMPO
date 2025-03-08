import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const offset = (page - 1) * limit;

  if (!query && !category) {
    return NextResponse.json(
      { error: "Query or category parameter is required" },
      { status: 400 },
    );
  }

  try {
    const supabase = await createClient();

    let textQuery = supabase
      .from("legal_texts")
      .select(
        "id, text_id, title, author, date, category, content, book_no, section_no, passage_no, header, text",
        {
          count: "exact",
        },
      );

    // Apply filters
    if (query) {
      // Use full-text search for query
      textQuery = textQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,author.ilike.%${query}%,header.ilike.%${query}%,text.ilike.%${query}%`,
      );
    }

    if (category && category !== "All") {
      textQuery = textQuery.eq("category", category);
    }

    // Apply pagination
    const {
      data: texts,
      count,
      error,
    } = await textQuery.order("title").range(offset, offset + limit - 1);

    if (error) {
      console.error("Search error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get categories for filter dropdown
    const { data: categories } = await supabase
      .from("legal_texts")
      .select("category")
      .not("category", "is", null)
      .order("category");

    const uniqueCategories = [
      "All",
      ...new Set(categories?.map((item) => item.category).filter(Boolean)),
    ];

    return NextResponse.json({
      texts,
      categories: uniqueCategories,
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to search texts" },
      { status: 500 },
    );
  }
}
