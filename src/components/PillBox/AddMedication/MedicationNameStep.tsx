import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MedicationNameStepProps {
  name: string;
  onChange: (name: string) => void;
}

export const MedicationNameStep = ({ name, onChange }: MedicationNameStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          What's the medication name?
        </h2>
        <p className="text-muted-foreground mt-2">
          Enter the name as shown on the packaging
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="medication-name" className="text-base font-medium">
          Medication Name
        </Label>
        <Input
          id="medication-name"
          type="text"
          placeholder="e.g., Ibuprofen, Vitamin D"
          value={name}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 text-lg rounded-xl"
          autoFocus
        />
      </div>
    </div>
  );
};
