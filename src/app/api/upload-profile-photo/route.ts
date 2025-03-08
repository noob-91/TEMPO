import { createClient } from "../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("profile-photo") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get the file as a buffer
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    // Get the current user
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete previous profile photos for this user to save storage space
    try {
      const { data: existingFiles } = await supabase.storage
        .from("profile-photos")
        .list(undefined, {
          search: user.id,
        });

      if (existingFiles && existingFiles.length > 0) {
        const filesToRemove = existingFiles.map((f) => f.name);
        await supabase.storage.from("profile-photos").remove(filesToRemove);
      }
    } catch (err) {
      console.log("Error cleaning up old profile photos:", err);
      // Continue with upload even if cleanup fails
    }

    // Upload the file to Supabase Storage
    const fileName = `${user.id}-${Date.now()}.jpg`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(fileName, fileData, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 },
      );
    }

    // Get the public URL for the uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from("profile-photos").getPublicUrl(fileName);

    // Add cache-busting parameter to prevent browser caching
    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`;

    // Update the user's metadata with the new avatar URL
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: cacheBustedUrl },
    });

    if (updateError) {
      console.error("Update user error:", updateError);
      return NextResponse.json(
        { error: "Failed to update user profile" },
        { status: 500 },
      );
    }

    // Wait a moment to ensure the auth update completes
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Also update the public.users table
    const { error: dbUpdateError } = await supabase
      .from("users")
      .update({ avatar_url: cacheBustedUrl })
      .eq("id", user.id);

    if (dbUpdateError) {
      console.error("Database update error:", dbUpdateError);
    }

    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
