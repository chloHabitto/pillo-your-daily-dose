import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface DosePickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicineName: string;
  dosages: string[];
  onSelectDosage: (dosage: string) => void;
}

export const DosePickerSheet = ({
  open,
  onOpenChange,
  medicineName,
  dosages,
  onSelectDosage,
}: DosePickerSheetProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Log {medicineName}</DrawerTitle>
          <p className="text-sm text-muted-foreground">Select the dosage you took</p>
        </DrawerHeader>
        <div className="px-4 pb-6 space-y-2">
          {dosages.map((dosage) => (
            <Button
              key={dosage}
              variant="outline"
              className="w-full justify-between h-14 text-base font-medium"
              onClick={() => {
                onSelectDosage(dosage);
                onOpenChange(false);
              }}
            >
              {dosage}
              <Check className="w-5 h-5 text-muted-foreground" />
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
