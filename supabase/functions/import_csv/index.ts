import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get the session of the user who called the function
    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession();

    if (sessionError) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Read the file content
    const fileContent = await file.text();
    const rows = fileContent.split("\n");

    // Parse CSV header
    const headers = rows[0].split(",").map((header) => header.trim());

    // Process each row
    const records = [];
    for (let i = 1; i < rows.length; i++) {
      if (!rows[i].trim()) continue; // Skip empty rows

      const values = rows[i].split(",");
      const record: Record<string, string> = {};

      headers.forEach((header, index) => {
        record[header] = values[index] ? values[index].trim() : "";
      });

      // Map CSV fields to database fields - ensure all values are strings or null
      const dbRecord = {
        text_id: record.text_id || `text-${i}`,
        title: record.title || record.header || "",
        author: record.author || "",
        date: record.date || "",
        category: record.category || "",
        content: record.content || record.text || "",
        source: record.source || "",
        // Add new fields from CSV - ensure they're strings or null
        book_no: record.book_no ? String(record.book_no) : null,
        section_no: record.section_no ? String(record.section_no) : null,
        passage_no: record.passage_no ? String(record.passage_no) : null,
        textunit_no: record.textunit_no ? String(record.textunit_no) : null,
        header: record.header || "",
        text: record.text || "",
      };

      // Handle "0" values by converting them to null
      if (dbRecord.book_no === "0") dbRecord.book_no = null;
      if (dbRecord.section_no === "0") dbRecord.section_no = null;
      if (dbRecord.passage_no === "0") dbRecord.passage_no = null;
      if (dbRecord.textunit_no === "0") dbRecord.textunit_no = null;

      records.push(dbRecord);
    }

    // Insert records into the database
    const { data, error } = await supabaseClient
      .from("legal_texts")
      .upsert(records, { onConflict: "text_id" });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Imported ${records.length} records successfully`,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
