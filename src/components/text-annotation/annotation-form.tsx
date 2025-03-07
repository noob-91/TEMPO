import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Check, X } from "lucide-react";

type AnnotationType = "deletion" | "insertion" | "suspect";
type ConfidenceLevel = "high" | "medium" | "review";

interface AnnotationFormProps {
  selectedText: string;
  onSubmit: (data: {
    type: AnnotationType;
    confidence: ConfidenceLevel;
    justification: string;
  }) => void;
  onCancel: () => void;
}

export default function AnnotationForm({
  selectedText,
  onSubmit,
  onCancel,
}: AnnotationFormProps) {
  const [type, setType] = React.useState<AnnotationType>("suspect");
  const [confidence, setConfidence] = React.useState<ConfidenceLevel>("medium");
  const [justification, setJustification] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type,
      confidence,
      justification,
    });
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-4">Add Annotation</h3>

      <div className="mb-4">
        <div className="text-sm font-medium mb-1">Selected Text:</div>
        <div className="p-3 bg-gray-50 border rounded-md text-gray-700 text-sm">
          "{selectedText}"
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Annotation Type */}
          <div>
            <div className="text-sm font-medium mb-2">Annotation Type:</div>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as AnnotationType)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deletion" id="deletion" />
                <Label
                  htmlFor="deletion"
                  className="flex items-center cursor-pointer"
                >
                  <X className="h-4 w-4 text-red-600 mr-1" />
                  <span>Deletion (text was added later)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="insertion" id="insertion" />
                <Label
                  htmlFor="insertion"
                  className="flex items-center cursor-pointer"
                >
                  <Check className="h-4 w-4 text-green-600 mr-1" />
                  <span>Insertion (text was removed later)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suspect" id="suspect" />
                <Label
                  htmlFor="suspect"
                  className="flex items-center cursor-pointer"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                  <span>Suspect (questionable authenticity)</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Confidence Level */}
          <div>
            <div className="text-sm font-medium mb-2">Confidence Level:</div>
            <RadioGroup
              value={confidence}
              onValueChange={(value) => setConfidence(value as ConfidenceLevel)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer">
                  High (strong evidence)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">
                  Medium (reasonable evidence)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="review" id="review" />
                <Label htmlFor="review" className="cursor-pointer">
                  Needs Review (tentative suggestion)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Justification */}
          <div>
            <div className="text-sm font-medium mb-2">
              Scholarly Justification:
            </div>
            <Textarea
              placeholder="Provide your academic reasoning for this annotation..."
              className="min-h-[100px]"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              Submit Annotation
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
