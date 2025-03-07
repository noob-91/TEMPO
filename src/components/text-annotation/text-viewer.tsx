import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, ChevronLeft, ChevronRight } from "lucide-react";

type AnnotationType = "deletion" | "insertion" | "suspect";

interface TextSelection {
  startIndex: number;
  endIndex: number;
  text: string;
}

interface TextViewerProps {
  title: string;
  author?: string;
  date?: string;
  content: string;
  onTextSelect: (selection: TextSelection) => void;
  highlightedRanges?: Array<{
    startIndex: number;
    endIndex: number;
    type: AnnotationType;
    confidence: "high" | "medium" | "review";
  }>;
  onHighlightClick?: (index: number) => void;
}

export default function TextViewer({
  title,
  author,
  date,
  content,
  onTextSelect,
  highlightedRanges = [],
  onHighlightClick,
}: TextViewerProps) {
  const textRef = React.useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = React.useState(-1);

  // Handle text selection
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !textRef.current) return;

    const range = selection.getRangeAt(0);
    const textContent = textRef.current.textContent || "";

    // Calculate the start and end indices
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(textRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const startIndex = preSelectionRange.toString().length;

    const selectedText = selection.toString();
    const endIndex = startIndex + selectedText.length;

    if (selectedText.trim().length > 0) {
      onTextSelect({
        startIndex,
        endIndex,
        text: selectedText,
      });
    }
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim() || !textRef.current) return;

    const textContent = textRef.current.textContent || "";
    const results: number[] = [];
    let index = textContent.indexOf(searchQuery);

    while (index !== -1) {
      results.push(index);
      index = textContent.indexOf(searchQuery, index + 1);
    }

    setSearchResults(results);
    if (results.length > 0) {
      setCurrentSearchIndex(0);
      scrollToIndex(results[0]);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!textRef.current) return;

    // Create a temporary range to find the position
    const tempRange = document.createRange();
    const textNode = textRef.current.firstChild;

    if (textNode) {
      tempRange.setStart(textNode, index);
      tempRange.setEnd(textNode, index + searchQuery.length);

      const rect = tempRange.getBoundingClientRect();
      textRef.current.scrollTop =
        rect.top - textRef.current.getBoundingClientRect().top - 100;

      // Highlight the text
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(tempRange);
      }
    }
  };

  const navigateSearch = (direction: "next" | "prev") => {
    if (searchResults.length === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentSearchIndex + 1) % searchResults.length;
    } else {
      newIndex =
        (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    }

    setCurrentSearchIndex(newIndex);
    scrollToIndex(searchResults[newIndex]);
  };

  // Render text with highlighted annotations
  const renderTextWithHighlights = () => {
    if (!content || highlightedRanges.length === 0) {
      return <p>{content}</p>;
    }

    // Sort ranges by start index
    const sortedRanges = [...highlightedRanges].sort(
      (a, b) => a.startIndex - b.startIndex,
    );

    // Check for overlapping ranges and adjust if needed
    for (let i = 1; i < sortedRanges.length; i++) {
      if (sortedRanges[i].startIndex < sortedRanges[i - 1].endIndex) {
        sortedRanges[i].startIndex = sortedRanges[i - 1].endIndex;
      }
    }

    const result: JSX.Element[] = [];
    let lastIndex = 0;

    sortedRanges.forEach((range, index) => {
      // Add text before the highlight
      if (range.startIndex > lastIndex) {
        result.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, range.startIndex)}
          </span>,
        );
      }

      // Add the highlighted text
      const highlightClass = getHighlightClass(range.type, range.confidence);
      result.push(
        <span
          key={`highlight-${index}`}
          className={`cursor-pointer ${highlightClass}`}
          onClick={() => onHighlightClick && onHighlightClick(index)}
        >
          {content.substring(range.startIndex, range.endIndex)}
        </span>,
      );

      lastIndex = range.endIndex;
    });

    // Add any remaining text
    if (lastIndex < content.length) {
      result.push(<span key={`text-end`}>{content.substring(lastIndex)}</span>);
    }

    return <>{result}</>;
  };

  const getHighlightClass = (
    type: AnnotationType,
    confidence: "high" | "medium" | "review",
  ) => {
    const baseClass = "px-0.5 rounded ";

    if (type === "deletion") {
      return (
        baseClass +
        {
          high: "bg-red-200 line-through",
          medium: "bg-red-100 line-through",
          review: "bg-red-50 border-b border-dashed border-red-400",
        }[confidence]
      );
    } else if (type === "insertion") {
      return (
        baseClass +
        {
          high: "bg-green-200",
          medium: "bg-green-100",
          review: "bg-green-50 border-b border-dashed border-green-400",
        }[confidence]
      );
    } else {
      // suspect
      return (
        baseClass +
        {
          high: "bg-sky-200",
          medium: "bg-sky-100",
          review: "bg-sky-50 border-b border-dashed border-blue-400",
        }[confidence]
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search in text..."
                className="pl-8 pr-20 py-1 text-sm border rounded-md w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {searchResults.length > 0 && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500">
                  <span>
                    {currentSearchIndex + 1}/{searchResults.length}
                  </span>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0"
                      onClick={() => navigateSearch("prev")}
                    >
                      <ChevronLeft className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0"
                      onClick={() => navigateSearch("next")}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
        {(author || date) && (
          <div className="mt-1 text-sm text-gray-500">
            {author && <span>{author}</span>}
            {author && date && <span className="mx-1">•</span>}
            {date && <span>{date}</span>}
          </div>
        )}
      </div>

      {/* Text Content */}
      <div
        ref={textRef}
        className="flex-1 p-6 overflow-auto text-gray-800 leading-relaxed text-lg font-serif"
        onMouseUp={handleMouseUp}
      >
        {renderTextWithHighlights()}
      </div>

      {/* Footer */}
      <div className="p-3 border-t flex items-center justify-between text-sm text-gray-500">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage >= totalPages}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
