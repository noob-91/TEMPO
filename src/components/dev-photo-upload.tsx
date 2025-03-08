"use client";

import { useEffect, useState } from "react";

export default function DevPhotoUpload({
  id,
  initials,
}: {
  id: string;
  initials: string;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // This component will only be rendered in development mode
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        // Store in localStorage for persistence during development
        localStorage.setItem(`dev-photo-${id}`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem(`dev-photo-${id}`);
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, [id]);

  return (
    <div className="w-full h-full">
      {imagePreview ? (
        <div className="relative w-full h-full">
          <img
            src={imagePreview}
            alt={`${initials} preview`}
            className="w-full h-full object-cover rounded-full"
          />
          <button
            onClick={() => {
              setImagePreview(null);
              localStorage.removeItem(`dev-photo-${id}`);
            }}
            className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            title="Remove image"
          >
            ×
          </button>
        </div>
      ) : (
        <label
          htmlFor={`photo-upload-${id}`}
          className="cursor-pointer w-full h-full flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-blue-700">{initials}</span>
          <input
            id={`photo-upload-${id}`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
