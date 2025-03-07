"use client";

import React, { useState } from "react";
import TextViewer from "./text-viewer";
import AnnotationSidebar from "./annotation-sidebar";
import AnnotationForm from "./annotation-form";
import TextComparison from "./text-comparison";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { BookOpen, BookMarked, ArrowLeftRight } from "lucide-react";

type AnnotationType = "deletion" | "insertion" | "suspect";
type ConfidenceLevel = "high" | "medium" | "review";

interface TextSelection {
  startIndex: number;
  endIndex: number;
  text: string;
}

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
    institution: string;
  };
  justification: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

interface AnnotationInterfaceProps {
  textId: string;
  textTitle: string;
  textAuthor?: string;
  textDate?: string;
  textContent: string;
  initialAnnotations?: Annotation[];
  currentUser: {
    id: string;
    name: string;
    institution: string;
  };
}

export default function AnnotationInterface({
  textId,
  textTitle,
  textAuthor,
  textDate,
  textContent,
  initialAnnotations = [],
  currentUser,
}: AnnotationInterfaceProps) {
  const [annotations, setAnnotations] =
    useState<Annotation[]>(initialAnnotations);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const [selectedText, setSelectedText] = useState<TextSelection | null>(null);
  const [showAnnotationForm, setShowAnnotationForm] = useState(false);
  const [showOriginalText, setShowOriginalText] = useState(true);
  const [activeTab, setActiveTab] = useState("view");

  // Filter states
  const [typeFilter, setTypeFilter] = useState<AnnotationType | null>(null);
  const [confidenceFilter, setConfidenceFilter] =
    useState<ConfidenceLevel | null>(null);
  const [scholarFilter, setScholarFilter] = useState<string | null>(null);

  const handleTextSelect = (selection: TextSelection) => {
    setSelectedText(selection);
    setShowAnnotationForm(true);
    setActiveTab("annotate");
  };

  const handleAnnotationSubmit = (data: {
    type: AnnotationType;
    confidence: ConfidenceLevel;
    justification: string;
  }) => {
    if (!selectedText) return;

    const newAnnotation: Annotation = {
      id: `annotation-${Date.now()}`,
      type: data.type,
      startIndex: selectedText.startIndex,
      endIndex: selectedText.endIndex,
      text: selectedText.text,
      confidence: data.confidence,
      scholar: currentUser,
      justification: data.justification,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
    };

    setAnnotations([...annotations, newAnnotation]);
    setSelectedText(null);
    setShowAnnotationForm(false);
    setActiveTab("view");
  };

  const handleAnnotationCancel = () => {
    setSelectedText(null);
    setShowAnnotationForm(false);
    setActiveTab("view");
  };

  const handleAnnotationSelect = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
  };

  const getFilteredAnnotations = () => {
    return annotations.filter((annotation) => {
      if (typeFilter && annotation.type !== typeFilter) return false;
      if (confidenceFilter && annotation.confidence !== confidenceFilter)
        return false;
      if (scholarFilter && annotation.scholar.id !== scholarFilter)
        return false;
      return true;
    });
  };

  const filteredAnnotations = getFilteredAnnotations();

  // Convert annotations to highlighted ranges for TextViewer
  const highlightedRanges = annotations.map((annotation) => ({
    startIndex: annotation.startIndex,
    endIndex: annotation.endIndex,
    type: annotation.type,
    confidence: annotation.confidence,
  }));

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b bg-white px-4 py-2">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="view" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>View Text</span>
            </TabsTrigger>
            <TabsTrigger value="annotate" className="flex items-center gap-1">
              <BookMarked className="h-4 w-4" />
              <span>Annotate</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="view" className="flex-1 p-4">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full rounded-lg border"
          >
            <ResizablePanel defaultSize={65} minSize={30}>
              <TextComparison
                originalTitle={textTitle}
                originalText={textContent}
                annotations={annotations}
                showOriginal={showOriginalText}
                onToggleView={() => setShowOriginalText(!showOriginalText)}
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={35} minSize={20}>
              <AnnotationSidebar
                annotations={filteredAnnotations}
                selectedAnnotation={selectedAnnotation}
                onSelectAnnotation={handleAnnotationSelect}
                onFilterByType={setTypeFilter}
                onFilterByConfidence={setConfidenceFilter}
                onFilterByScholar={setScholarFilter}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>

        <TabsContent value="annotate" className="flex-1 p-4">
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full rounded-lg border"
          >
            <ResizablePanel defaultSize={65} minSize={30}>
              <TextViewer
                title={textTitle}
                author={textAuthor}
                date={textDate}
                content={textContent}
                onTextSelect={handleTextSelect}
                highlightedRanges={highlightedRanges}
                onHighlightClick={(index) =>
                  setSelectedAnnotation(annotations[index])
                }
              />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={35} minSize={20}>
              {showAnnotationForm && selectedText ? (
                <AnnotationForm
                  selectedText={selectedText.text}
                  onSubmit={handleAnnotationSubmit}
                  onCancel={handleAnnotationCancel}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-6 bg-white border rounded-lg">
                  <div className="text-center">
                    <BookMarked className="h-12 w-12 mx-auto mb-4 text-blue-600 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">
                      Create an Annotation
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Select text in the document to add a scholarly annotation
                      with your analysis.
                    </p>
                    <Button
                      variant="outline"
                      className="border-sky-200 text-blue-700 hover:bg-sky-50"
                      onClick={() => setActiveTab("view")}
                    >
                      View Existing Annotations
                    </Button>
                  </div>
                </div>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
}
