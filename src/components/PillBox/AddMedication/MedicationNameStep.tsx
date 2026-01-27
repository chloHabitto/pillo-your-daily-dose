import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill } from "lucide-react";

interface MedicationNameStepProps {
  name: string;
  onChange: (name: string) => void;
}

export const MedicationNameStep = ({
  name,
  onChange,
}: MedicationNameStepProps) => {
  return (
    <div className="space-y-6">
      {/* Illustration */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Pill className="w-10 h-10 text-primary" />
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          What's the medication name?
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter the name as shown on the packaging
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medication-name" className="text-sm font-medium text-muted-foreground">
          Medication Name
        </Label>
        <Input
          id="medication-name"
          type="text"
          placeholder="e.g., Ibuprofen, Vitamin D"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 rounded-xl text-lg"
          autoFocus
        />
      </div>
    </div>
  );
};
