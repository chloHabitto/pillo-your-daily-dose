import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MedicationFormData, StrengthEntry } from "./types";
import { MedicationNameStep } from "./MedicationNameStep";
import { MedicationFormStep } from "./MedicationFormStep";
import { MedicationStrengthStep } from "./MedicationStrengthStep";
import { MedicationColorStep } from "./MedicationColorStep";
import { MedicationReviewStep } from "./MedicationReviewStep";
import { MedicationGroup } from "../MedicationGroupCard";

interface AddMedicationFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (medication: Omit<MedicationGroup, "id">) => void;
}

const STEPS = ["Name", "Form", "Strength", "Color", "Review"];

const initialStrength: StrengthEntry = {
  id: crypto.randomUUID(),
  value: "",
  unit: "mg",
};

const initialFormData: MedicationFormData = {
  name: "",
  form: "",
  customForm: "",
  strengths: [initialStrength],
  color: "blue",
};

export const AddMedicationFlow = ({
  open,
  onOpenChange,
  onSave,
}: AddMedicationFlowProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<MedicationFormData>(initialFormData);

  const isFirstStep = step === 0;
  const isLastStep = step === STEPS.length - 1;

  const canProceed = (): boolean => {
    switch (step) {
      case 0: // Name
        return formData.name.trim().length > 0;
      case 1: // Form
        if (formData.form === "Other") {
          return formData.customForm?.trim().length > 0;
        }
        return formData.form.length > 0;
      case 2: // Strength
        return formData.strengths.some((s) => s.value.trim().length > 0);
      case 3: // Color
        return formData.color.length > 0;
      case 4: // Review
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSave();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    setStep(0);
    setFormData(initialFormData);
    onOpenChange(false);
  };

  const handleSave = () => {
    const validStrengths = formData.strengths
      .filter((s) => s.value.trim())
      .map((s) => `${s.value}${s.unit}`);

    const displayForm = formData.form === "Other" && formData.customForm
      ? formData.customForm
      : formData.form;

    const medication: Omit<MedicationGroup, "id"> = {
      name: formData.name.trim(),
      strengths: validStrengths,
      form: displayForm,
      totalStock: 0,
      hasLowStock: false,
      color: formData.color,
    };

    onSave(medication);
    handleClose();
  };

  const updateFormData = <K extends keyof MedicationFormData>(
    key: K,
    value: MedicationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md h-[90vh] max-h-[700px] p-0 gap-0 flex flex-col rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <span className="text-sm font-medium text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>
          
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-4">
          <div className="flex gap-1.5">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  index <= step ? "bg-primary" : "bg-secondary"
                )}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 0 && (
            <MedicationNameStep
              name={formData.name}
              onChange={(name) => updateFormData("name", name)}
            />
          )}
          {step === 1 && (
            <MedicationFormStep
              form={formData.form}
              customForm={formData.customForm || ""}
              onChange={(form) => updateFormData("form", form)}
              onCustomFormChange={(customForm) => updateFormData("customForm", customForm)}
            />
          )}
          {step === 2 && (
            <MedicationStrengthStep
              strengths={formData.strengths}
              onChange={(strengths) => updateFormData("strengths", strengths)}
            />
          )}
          {step === 3 && (
            <MedicationColorStep
              color={formData.color}
              onChange={(color) => updateFormData("color", color)}
            />
          )}
          {step === 4 && (
            <MedicationReviewStep data={formData} />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 h-12 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "h-12 rounded-xl",
              isFirstStep ? "w-full" : "flex-1"
            )}
          >
            {isLastStep ? "Save Medication" : "Next"}
            {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
