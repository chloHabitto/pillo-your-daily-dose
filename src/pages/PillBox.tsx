import { BottomNav } from "@/components/BottomNav";
import { Plus, Pill } from "lucide-react";
import { MedicationGroupCard, MedicationGroup } from "@/components/PillBox/MedicationGroupCard";
import { LowStockWarning } from "@/components/PillBox/LowStockWarning";
import { SwipeableCard } from "@/components/PillBox/SwipeableCard";
import { AddMedicationFlow } from "@/components/PillBox/AddMedication";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Sample data - will be replaced with actual data management
const initialMedications: MedicationGroup[] = [
  {
    id: "1",
    name: "Concerta",
    strengths: ["18mg", "32mg"],
    form: "Extended-Release Tablet",
    totalStock: 45,
    hasLowStock: false,
    color: "blue",
  },
  {
    id: "2",
    name: "Bufrion",
    strengths: ["100mg"],
    form: "Tablet",
    totalStock: 8,
    hasLowStock: true,
    color: "pink",
  },
  {
    id: "3",
    name: "Folic Acid",
    strengths: ["400mcg"],
    form: "Tablet",
    totalStock: 60,
    hasLowStock: false,
    color: "yellow",
  },
  {
    id: "4",
    name: "Vitamin D",
    strengths: ["1000IU", "2000IU"],
    form: "Softgel",
    totalStock: 5,
    hasLowStock: true,
    color: "green",
  },
  {
    id: "5",
    name: "Melatonin",
    strengths: ["3mg", "5mg"],
    form: "Tablet",
    totalStock: 30,
    hasLowStock: false,
    color: "purple",
  },
];

const PillBox = () => {
  const [medications, setMedications] = useState<MedicationGroup[]>(initialMedications);
  const [isAddFlowOpen, setIsAddFlowOpen] = useState(false);

  const lowStockMeds = medications
    .filter((m) => m.hasLowStock)
    .map((m) => m.name);

  const handleDelete = (id: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  const handleMedicationClick = (id: string) => {
    // TODO: Navigate to medication detail view
    console.log("Navigate to medication:", id);
  };

  const handleAddMedication = () => {
    setIsAddFlowOpen(true);
  };

  const handleSaveMedication = (medication: Omit<MedicationGroup, "id">) => {
    const newMedication: MedicationGroup = {
      ...medication,
      id: crypto.randomUUID(),
    };
    setMedications((prev) => [...prev, newMedication]);
  };

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-5 pt-14 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">Pill Box</h1>
            <p className="text-muted-foreground font-medium mt-1">
              {medications.length} medication{medications.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleAddMedication}
            className={cn(
              "p-3 rounded-xl transition-all duration-200",
              "bg-primary text-primary-foreground",
              "shadow-soft hover:shadow-medium active:scale-95"
            )}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-5">
        {/* Low Stock Warning */}
        <LowStockWarning medicationNames={lowStockMeds} />

        {/* Medication List */}
        {medications.length > 0 ? (
          <div className="space-y-3">
            {medications.map((medication) => (
              <SwipeableCard
                key={medication.id}
                onDelete={() => handleDelete(medication.id)}
              >
                <MedicationGroupCard
                  medication={medication}
                  onClick={() => handleMedicationClick(medication.id)}
                />
              </SwipeableCard>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-2xl bg-primary-light mb-4">
              <Pill className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No medications yet
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Tap the + button to add your first medication and start tracking
            </p>
          </div>
        )}
      </main>

      <AddMedicationFlow
        open={isAddFlowOpen}
        onOpenChange={setIsAddFlowOpen}
        onSave={handleSaveMedication}
      />

      <BottomNav />
    </div>
  );
};

export default PillBox;