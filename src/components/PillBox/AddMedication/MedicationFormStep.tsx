import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { MEDICATION_FORMS, COMMON_FORMS } from "./types";
import { Search, Check, ChevronDown, ChevronUp } from "lucide-react";

interface MedicationFormStepProps {
  form: string;
  customForm: string;
  onChange: (form: string) => void;
  onCustomFormChange: (customForm: string) => void;
}

export const MedicationFormStep = ({
  form,
  customForm,
  onChange,
  onCustomFormChange,
}: MedicationFormStepProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMore, setShowMore] = useState(false);

  const filteredForms = searchQuery
    ? MEDICATION_FORMS.filter((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : showMore
    ? MEDICATION_FORMS
    : COMMON_FORMS;

  const noResults = searchQuery && filteredForms.length === 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          What's the form?
        </h2>
        <p className="text-muted-foreground mt-2">
          Select how this medication comes
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search forms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 rounded-xl pl-11"
        />
      </div>

      {/* Form Options */}
      <div className="space-y-2">
        {filteredForms.map((formOption) => {
          const isSelected = form === formOption;
          return (
            <button
              key={formOption}
              type="button"
              onClick={() => {
                onChange(formOption);
                if (formOption !== "Other") {
                  onCustomFormChange("");
                }
              }}
              className={cn(
                "w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <span className="font-medium text-foreground">{formOption}</span>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}

        {/* Show more / less button */}
        {!searchQuery && (
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="w-full p-3 rounded-xl text-sm font-medium text-primary flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
          >
            {showMore ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show more forms
              </>
            )}
          </button>
        )}

        {/* Add custom form when no results */}
        {noResults && (
          <button
            type="button"
            onClick={() => {
              onChange("Other");
              onCustomFormChange(searchQuery);
            }}
            className={cn(
              "w-full p-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all",
              "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10"
            )}
          >
            Add "{searchQuery}" as custom form
          </button>
        )}
      </div>

      {/* Custom form input when Other is selected */}
      {form === "Other" && (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter custom form name"
            value={customForm}
            onChange={(e) => onCustomFormChange(e.target.value)}
            className="h-12 rounded-xl"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
