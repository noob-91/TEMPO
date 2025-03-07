import React from "react";
import { Button } from "@/components/ui/button";
import {
  BookMarked,
  Info,
  MessageSquare,
  User,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type AnnotationType = "deletion" | "insertion" | "suspect";
type ConfidenceLevel = "high" | "medium" | "review";

interface Annotation {
  id: string;
  type: AnnotationType;
  text: string;
  confidence: ConfidenceLevel;
  scholar: {
    id: string;
    name: string;
    institution: string;
  };
  justification: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

interface AnnotationSidebarProps {
  annotations: Annotation[];
  selectedAnnotation: Annotation | null;
  onSelectAnnotation: (annotation: Annotation) => void;
  onFilterByType: (type: AnnotationType | null) => void;
  onFilterByConfidence: (confidence: ConfidenceLevel | null) => void;
  onFilterByScholar: (scholarId: string | null) => void;
}

export default function AnnotationSidebar({
  annotations,
  selectedAnnotation,
  onSelectAnnotation,
  onFilterByType,
  onFilterByConfidence,
  onFilterByScholar,
}: AnnotationSidebarProps) {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);

  const getConfidenceColor = (confidence: ConfidenceLevel) => {
    switch (confidence) {
      case "high":
        return "bg-green-100 text-green-800 border-green-300";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "review":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getTypeIcon = (type: AnnotationType) => {
    switch (type) {
      case "deletion":
        return <X className="h-4 w-4 text-red-600" />;
      case "insertion":
        return <Check className="h-4 w-4 text-green-600" />;
      case "suspect":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white border-l border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BookMarked className="h-5 w-5 text-blue-600" />
          <span>Annotations</span>
          <Badge variant="outline" className="ml-2">
            {annotations.length}
          </Badge>
        </h2>

        {/* Filter Controls */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={activeFilter === "deletion" ? "default" : "outline"}
            size="sm"
            className={
              activeFilter === "deletion"
                ? "bg-gradient-to-r from-blue-600 to-blue-700"
                : ""
            }
            onClick={() => {
              if (activeFilter === "deletion") {
                setActiveFilter(null);
                onFilterByType(null);
              } else {
                setActiveFilter("deletion");
                onFilterByType("deletion");
              }
            }}
          >
            Deletions
          </Button>
          <Button
            variant={activeFilter === "insertion" ? "default" : "outline"}
            size="sm"
            className={
              activeFilter === "insertion"
                ? "bg-gradient-to-r from-blue-600 to-blue-700"
                : ""
            }
            onClick={() => {
              if (activeFilter === "insertion") {
                setActiveFilter(null);
                onFilterByType(null);
              } else {
                setActiveFilter("insertion");
                onFilterByType("insertion");
              }
            }}
          >
            Insertions
          </Button>
          <Button
            variant={activeFilter === "suspect" ? "default" : "outline"}
            size="sm"
            className={
              activeFilter === "suspect"
                ? "bg-gradient-to-r from-blue-600 to-blue-700"
                : ""
            }
            onClick={() => {
              if (activeFilter === "suspect") {
                setActiveFilter(null);
                onFilterByType(null);
              } else {
                setActiveFilter("suspect");
                onFilterByType("suspect");
              }
            }}
          >
            Suspect
          </Button>
          <Button
            variant={activeFilter === "high" ? "default" : "outline"}
            size="sm"
            className={
              activeFilter === "high"
                ? "bg-gradient-to-r from-blue-600 to-blue-700"
                : ""
            }
            onClick={() => {
              if (activeFilter === "high") {
                setActiveFilter(null);
                onFilterByConfidence(null);
              } else {
                setActiveFilter("high");
                onFilterByConfidence("high");
              }
            }}
          >
            High Confidence
          </Button>
        </div>
      </div>

      {/* Annotations List */}
      <div className="flex-1 overflow-auto">
        {annotations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Info className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>No annotations found</p>
            <p className="text-sm mt-1">Select text to add an annotation</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedAnnotation?.id === annotation.id ? "bg-amber-50" : ""}`}
                onClick={() => onSelectAnnotation(annotation)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {getTypeIcon(annotation.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {annotation.text.length > 50
                          ? `${annotation.text.substring(0, 50)}...`
                          : annotation.text}
                      </div>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${getConfidenceColor(annotation.confidence)}`}
                      >
                        {annotation.confidence}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <User className="h-3 w-3 mr-1" />
                      <span>{annotation.scholar.name}</span>
                      <span className="mx-1">•</span>
                      <span>
                        {new Date(annotation.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Annotation Details */}
      {selectedAnnotation && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Annotation Details</h3>
            <Badge
              variant="outline"
              className={getConfidenceColor(selectedAnnotation.confidence)}
            >
              {selectedAnnotation.confidence}
            </Badge>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            "{selectedAnnotation.text}"
          </p>
          <div className="text-xs text-gray-500 mb-2 flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{selectedAnnotation.scholar.name}</span>
            <span className="mx-1">•</span>
            <span>{selectedAnnotation.scholar.institution}</span>
          </div>
          <div className="bg-white p-2 rounded border border-gray-200 text-sm mb-2">
            <p className="font-medium text-xs text-gray-500 mb-1">
              Justification:
            </p>
            <p className="text-gray-700">{selectedAnnotation.justification}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-blue-600"
              >
                <MessageSquare className="h-4 w-4 mr-1" /> Comment
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                </Button>
                <span className="text-xs">{selectedAnnotation.upvotes}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Button>
                <span className="text-xs">{selectedAnnotation.downvotes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
