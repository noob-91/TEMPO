"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import ImageCropper from "./image-cropper";

export default function ProfilePhotoUpload() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const formRef = useState<HTMLFormElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setShowCropper(true);
      formRef[1](e.target.form);
    }
  };

  const handleCrop = async (croppedBlob: Blob) => {
    // Convert blob to file
    const croppedFile = new File(
      [croppedBlob],
      selectedFile?.name || "profile.jpg",
      { type: "image/jpeg" },
    );

    // Create a new FormData and append the cropped file
    const formData = new FormData();
    formData.append("profile-photo", croppedFile);

    // Submit the form with the cropped image
    setIsSubmitting(true);
    setShowCropper(false);

    try {
      const response = await fetch("/api/upload-profile-photo", {
        method: "POST",
        body: formData,
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else if (!response.ok) {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setSelectedFile(null);
  };

  const handleButtonClick = () => {
    document.getElementById("profile-photo")?.click();
  };

  return (
    <>
      <form
        action="/api/upload-profile-photo"
        method="post"
        encType="multipart/form-data"
      >
        <input
          type="file"
          id="profile-photo"
          name="profile-photo"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="profile-photo">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-full w-8 h-8 p-0 cursor-pointer"
            onClick={handleButtonClick}
            disabled={isSubmitting}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </label>
      </form>

      <ImageCropper
        imageFile={selectedFile}
        onCrop={handleCrop}
        onCancel={handleCancelCrop}
        open={showCropper}
      />
    </>
  );
}
