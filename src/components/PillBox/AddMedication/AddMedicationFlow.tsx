import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MedicationFormData, getInitialFormData, PILL_SHAPES } from "./types";
import { MedicationNameStep } from "./MedicationNameStep";
import { MedicationStrengthStep } from "./MedicationStrengthStep";
import { DosingTypeStep } from "./DosingTypeStep";
import { ScheduleStep } from "./ScheduleStep";
import { MedicationFormStep } from "./MedicationFormStep";
import { ShapeSelectionStep } from "./ShapeSelectionStep";
import { ColorSelectionStep } from "./ColorSelectionStep";
import { ReviewStep } from "./ReviewStep";
import { MedicationGroup } from "../MedicationGroupCard";

interface AddMedicationFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (medication: Omit<MedicationGroup, "id">) => void;
}

const STEPS = ["Name", "Strength", "Dosing", "Schedule", "Form", "Shape", "Color", "Review"];

export const AddMedicationFlow = ({
  open,
  onOpenChange,
  onSave,
}: AddMedicationFlowProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<MedicationFormData>(getInitialFormData());

  const isFirstStep = step === 0;
  const isLastStep = step === STEPS.length - 1;

  const canProceed = (): boolean => {
    switch (step) {
      case 0: // Name
        return formData.name.trim().length > 0;
      case 1: // Strength
        return true; // Can be skipped
      case 2: // Dosing Type
        if (formData.dosingType === "fixed") {
          return formData.selectedStrengths.length > 0 || formData.strengths.every(s => !s.value.trim());
        }
        return formData.selectedStrengths.length > 0 || formData.strengths.every(s => !s.value.trim());
      case 3: // Schedule
        if (formData.schedule.type === "as_needed") return true;
        if (formData.schedule.timeMode === "specific") {
          return formData.schedule.specificTimes.length > 0;
        }
        return formData.schedule.timeFrames.length > 0;
      case 4: // Form
        if (formData.form === "Other") {
          return formData.customForm.trim().length > 0;
        }
        return formData.form.length > 0;
      case 5: // Shape
        return true; // Can be skipped
      case 6: // Color
        return true; // Can be skipped
      case 7: // Review
        return true;
      default:
        return false;
    }
  };

  const canSkip = (): boolean => {
    return [1, 2, 3, 5, 6].includes(step);
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSave();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    if (!isLastStep) {
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
    setFormData(getInitialFormData());
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
      color: formData.colorLeft,
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

  // Handle shape change - update two-tone default
  const handleShapeChange = (shapeName: string) => {
    updateFormData("shape", shapeName);
    const shapeConfig = PILL_SHAPES.find((s) => s.name === shapeName);
    if (shapeConfig?.twoTone && !formData.colorRight) {
      updateFormData("colorRight", "white");
    } else if (!shapeConfig?.twoTone) {
      updateFormData("colorRight", null);
    }
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
          
          <span className="text-sm font-medium text-foreground">
            {formData.name || "Add Medication"}
          </span>
          
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-4">
          <div className="flex gap-1">
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
          <p className="text-xs text-muted-foreground text-center mt-2">
            Step {step + 1} of {STEPS.length}
          </p>
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
            <MedicationStrengthStep
              strengths={formData.strengths}
              medicationName={formData.name}
              onChange={(strengths) => updateFormData("strengths", strengths)}
            />
          )}
          {step === 2 && (
            <DosingTypeStep
              dosingType={formData.dosingType}
              strengths={formData.strengths}
              selectedStrengths={formData.selectedStrengths}
              fixedQuantity={formData.fixedQuantity}
              onDosingTypeChange={(type) => updateFormData("dosingType", type)}
              onSelectedStrengthsChange={(ids) => updateFormData("selectedStrengths", ids)}
              onFixedQuantityChange={(qty) => updateFormData("fixedQuantity", qty)}
            />
          )}
          {step === 3 && (
            <ScheduleStep
              schedule={formData.schedule}
              onChange={(schedule) => updateFormData("schedule", schedule)}
            />
          )}
          {step === 4 && (
            <MedicationFormStep
              form={formData.form}
              customForm={formData.customForm}
              onChange={(form) => updateFormData("form", form)}
              onCustomFormChange={(customForm) => updateFormData("customForm", customForm)}
            />
          )}
          {step === 5 && (
            <ShapeSelectionStep
              shape={formData.shape}
              showLine={formData.showLine}
              colorLeft={formData.colorLeft}
              colorRight={formData.colorRight}
              onShapeChange={handleShapeChange}
              onShowLineChange={(showLine) => updateFormData("showLine", showLine)}
            />
          )}
          {step === 6 && (
            <ColorSelectionStep
              shape={formData.shape}
              colorLeft={formData.colorLeft}
              colorRight={formData.colorRight}
              colorBackground={formData.colorBackground}
              onColorLeftChange={(color) => updateFormData("colorLeft", color)}
              onColorRightChange={(color) => updateFormData("colorRight", color)}
              onColorBackgroundChange={(color) => updateFormData("colorBackground", color)}
            />
          )}
          {step === 7 && (
            <ReviewStep data={formData} />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex gap-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="h-12 rounded-xl px-4"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
          {canSkip() && !canProceed() && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="h-12 rounded-xl flex-1"
            >
              Skip
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed() && !canSkip()}
            className={cn(
              "h-12 rounded-xl",
              isFirstStep || !canSkip() ? "flex-1" : "flex-1"
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
