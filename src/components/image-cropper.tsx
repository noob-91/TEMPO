"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RotateCw, ZoomIn, Check, X } from "lucide-react";

interface ImageCropperProps {
  imageFile: File | null;
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
  open: boolean;
}

export default function ImageCropper({
  imageFile,
  onCrop,
  onCancel,
  open,
}: ImageCropperProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Create image URL when file changes
  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);

      // Load the image
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;

        // Reset position, zoom and rotation when a new image is loaded
        setPosition({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);

        // Calculate initial zoom to fit the image within the canvas
        const canvas = canvasRef.current;
        if (canvas) {
          const canvasSize = Math.min(canvas.width, canvas.height);
          const imgSize = Math.max(img.width, img.height);
          const initialZoom = (canvasSize / imgSize) * 0.8; // 80% of the canvas size
          setZoom(initialZoom);
        }

        drawImage();
      };
      img.src = url;

      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  // Redraw when zoom, rotation or position changes
  useEffect(() => {
    drawImage();
  }, [zoom, rotation, position]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imageRef.current;

    if (!canvas || !ctx || !img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate
    ctx.rotate((rotation * Math.PI) / 180);

    // Apply zoom
    ctx.scale(zoom, zoom);

    // Apply position offset
    ctx.translate(position.x / zoom, position.y / zoom);

    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

    // Restore context state
    ctx.restore();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCrop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create a circular crop
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create a temporary canvas for the circular crop
    const tempCanvas = document.createElement("canvas");
    const cropSize = 300; // Fixed size for the final cropped image
    tempCanvas.width = cropSize;
    tempCanvas.height = cropSize;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw a circular clipping path
    tempCtx.beginPath();
    tempCtx.arc(cropSize / 2, cropSize / 2, cropSize / 2, 0, Math.PI * 2);
    tempCtx.closePath();
    tempCtx.clip();

    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Calculate the size of the circle in the original canvas
    const circleSize = Math.min(canvas.width, canvas.height) * 0.8;

    // Draw the original canvas content centered in the circle
    tempCtx.drawImage(
      canvas,
      centerX - circleSize / 2, // Start X in the source canvas
      centerY - circleSize / 2, // Start Y in the source canvas
      circleSize, // Width in the source canvas
      circleSize, // Height in the source canvas
      0, // Destination X
      0, // Destination Y
      cropSize, // Destination width
      cropSize, // Destination height
    );

    // Convert to blob and call the onCrop callback
    tempCanvas.toBlob(
      (blob) => {
        if (blob) {
          onCrop(blob);
        }
      },
      "image/jpeg",
      0.95,
    );
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crop Profile Photo</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 pointer-events-none z-10"></div>
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  handleMouseDown({
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                  } as any);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  handleMouseMove({
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                  } as any);
                }}
                onTouchEnd={() => handleMouseUp()}
              />
            </div>
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Zoom</Label>
                <ZoomIn className="h-4 w-4" />
              </div>
              <Slider
                value={[zoom]}
                min={0.1}
                max={5}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>

            <Button variant="outline" className="w-full" onClick={handleRotate}>
              <RotateCw className="h-4 w-4 mr-2" /> Rotate
            </Button>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleCrop}>
            <Check className="h-4 w-4 mr-2" /> Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
