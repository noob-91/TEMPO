"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createClient } from "../../../../supabase/client";
import { Upload, AlertCircle, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);

  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      previewCsv(selectedFile);
    }
  };

  const previewCsv = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsvPreview(rows.slice(0, 5)); // Preview first 5 rows
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error("You must be logged in to upload files");
      }

      const response = await fetch(
        "https://supabase-functions-import-csv.elegant-curie9-vd67w.dev-2.tempolabs.ai",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to upload CSV");
      }

      setUploadStatus({
        type: "success",
        message: result.message || "CSV imported successfully",
      });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to upload CSV",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Import Text Data
            </h1>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 border shadow-sm mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Upload CSV File</h2>
              <p className="text-gray-600 mb-4">
                Upload a CSV file containing Roman legal texts. The file should
                have the following columns: text_id, title, author, date,
                category, content, and source.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csv-file">Select CSV File</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleUpload}
                      disabled={!file || isUploading}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center gap-2"
                    >
                      {isUploading ? (
                        "Uploading..."
                      ) : (
                        <>
                          <Upload className="h-4 w-4" /> Upload
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {file && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </span>
                  </div>
                )}

                {uploadStatus.type && (
                  <Alert
                    variant={
                      uploadStatus.type === "error" ? "destructive" : "default"
                    }
                    className={
                      uploadStatus.type === "success"
                        ? "bg-green-50 border-green-200 text-green-800"
                        : ""
                    }
                  >
                    {uploadStatus.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                    <AlertTitle>
                      {uploadStatus.type === "error" ? "Error" : "Success"}
                    </AlertTitle>
                    <AlertDescription>{uploadStatus.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {csvPreview.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">CSV Preview</h3>
                <div className="overflow-x-auto border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {csvPreview[0].map((header, index) => (
                          <th
                            key={index}
                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {csvPreview.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-3 py-2 text-xs text-gray-500 truncate max-w-xs"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Showing first {csvPreview.length - 1} rows of data
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              CSV Format Guidelines
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Required Columns:</h3>
                <ul className="list-disc pl-5 mt-1 text-gray-600 text-sm">
                  <li>
                    <strong>text_id</strong>: A unique identifier for the text
                    (or will be auto-generated)
                  </li>
                  <li>
                    <strong>title</strong> or <strong>header</strong>: The title
                    of the legal text
                  </li>
                  <li>
                    <strong>content</strong> or <strong>text</strong>: The full
                    text content
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Optional Columns:</h3>
                <ul className="list-disc pl-5 mt-1 text-gray-600 text-sm">
                  <li>
                    <strong>author</strong>: The author of the text
                  </li>
                  <li>
                    <strong>date</strong>: The date or time period of the text
                  </li>
                  <li>
                    <strong>category</strong>: The category or type of legal
                    text
                  </li>
                  <li>
                    <strong>source</strong>: The source or reference information
                  </li>
                  <li>
                    <strong>book_no</strong>: Book number reference
                  </li>
                  <li>
                    <strong>section_no</strong>: Section number reference
                  </li>
                  <li>
                    <strong>passage_no</strong>: Passage number reference
                  </li>
                  <li>
                    <strong>textunit_no</strong>: Text unit number reference
                  </li>
                  <li>
                    <strong>header</strong>: Header or title of the text
                  </li>
                  <li>
                    <strong>text</strong>: The text content
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Example Format:</h3>
                <pre className="bg-gray-50 p-3 rounded-md text-xs overflow-x-auto">
                  text_id,book_no,section_no,passage_no,textunit_no,header,text,author,date,category
                  <br />
                  digest-41-3-4,41,3,4,1,"On Usucaption and Long
                  Possession","Usucapio est adiectio dominii...",Justinian,"533
                  CE",Digest
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
