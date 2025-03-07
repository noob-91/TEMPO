import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, BookOpen } from "lucide-react";

type AnnotationType = "deletion" | "insertion" | "suspect";
type ConfidenceLevel = "high" | "medium" | "review";

interface Annotation {
  id: string;
  type: AnnotationType;
  startIndex: number;
  endIndex: number;
  text: string;
  confidence: ConfidenceLevel;
  scholar: {
    id: string;
    name: string;
  };
}

interface TextComparisonProps {
  originalTitle: string;
  originalText: string;
  annotations: Annotation[];
  showOriginal: boolean;
  onToggleView: () => void;
}

export default function TextComparison({
  originalTitle,
  originalText,
  annotations,
  showOriginal,
  onToggleView,
}: TextComparisonProps) {
  // Generate annotated text by applying all annotations
  const generateAnnotatedText = () => {
    // Sort annotations by start index
    const sortedAnnotations = [...annotations].sort(
      (a, b) => a.startIndex - b.startIndex,
    );

    let result = originalText;
    let offset = 0;

    sortedAnnotations.forEach((annotation) => {
      const startIndex = annotation.startIndex + offset;
      const endIndex = annotation.endIndex + offset;

      let replacement = "";

      if (annotation.type === "deletion") {
        // For deletions, we strike through or remove the text
        if (annotation.confidence === "high") {
          // High confidence deletions are removed completely
          replacement = "";
        } else {
          // Medium/review confidence deletions are struck through
          replacement = `<span class="line-through ${getConfidenceClass(annotation.confidence)}">${result.substring(startIndex, endIndex)}</span>`;
        }
      } else if (annotation.type === "insertion") {
        // For insertions, we highlight the text
        replacement = `<span class="${getConfidenceClass(annotation.confidence)}">${result.substring(startIndex, endIndex)}</span>`;
      } else {
        // suspect
        // For suspect text, we add a special marker
        replacement = `<span class="${getConfidenceClass(annotation.confidence)}">${result.substring(startIndex, endIndex)}</span>`;
      }

      result =
        result.substring(0, startIndex) +
        replacement +
        result.substring(endIndex);
      offset += replacement.length - (endIndex - startIndex);
    });

    return result;
  };

  const getConfidenceClass = (confidence: ConfidenceLevel) => {
    switch (confidence) {
      case "high":
        return "bg-sky-200 px-0.5 rounded";
      case "medium":
        return "bg-sky-100 px-0.5 rounded";
      case "review":
        return "bg-sky-50 border-b border-dashed border-blue-400 px-0.5 rounded";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">
            {showOriginal ? originalTitle : `${originalTitle} (Annotated)`}
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleView}
          className="flex items-center gap-1"
        >
          <ArrowLeftRight className="h-4 w-4" />
          <span>Switch to {showOriginal ? "Annotated" : "Original"} View</span>
        </Button>
      </div>

      {/* Text Content */}
      <div className="flex-1 p-6 overflow-auto text-gray-800 leading-relaxed text-lg font-serif">
        {showOriginal ? (
          <p>{originalText}</p>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: generateAnnotatedText() }} />
        )}
      </div>

      {/* Legend */}
      {!showOriginal && (
        <div className="p-3 border-t">
          <div className="text-sm font-medium mb-2">Annotation Legend:</div>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-sky-200 rounded"></span>
              <span>High Confidence</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-sky-100 rounded"></span>
              <span>Medium Confidence</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-sky-50 border-b border-dashed border-blue-400 rounded"></span>
              <span>Needs Review</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block line-through">Text</span>
              <span>Deletion</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
