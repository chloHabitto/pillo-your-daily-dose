import { useState } from "react";
import { WeekCalendar } from "@/components/WeekCalendar";
import { TodayButton } from "@/components/TodayButton";
import { MedicineCard } from "@/components/MedicineCard";
import { TimeSection } from "@/components/TimeSection";
import { BottomNav } from "@/components/BottomNav";
import { ProgressRing } from "@/components/ProgressRing";
import { LogButton } from "@/components/LogButton";
import { Sparkles } from "lucide-react";
import { isSameDay } from "date-fns";

interface Medicine {
  id: string;
  name: string;
  dosages: string[];
  selectedDosage?: string;
  isTaken: boolean;
  color?: string;
  timeOfDay: "Morning" | "Afternoon" | "Evening";
}

const initialMedicines: Medicine[] = [
  { id: "1", name: "Concerta", dosages: ["18mg", "32mg"], isTaken: false, color: "blue", timeOfDay: "Morning" },
  { id: "2", name: "Bufrion", dosages: ["100mg"], isTaken: false, color: "pink", timeOfDay: "Morning" },
  { id: "3", name: "Folic Acid", dosages: ["18mg"], isTaken: false, color: "yellow", timeOfDay: "Morning" },
  { id: "4", name: "Vitamin D", dosages: ["1000IU"], isTaken: false, color: "green", timeOfDay: "Afternoon" },
  { id: "5", name: "Melatonin", dosages: ["3mg", "5mg"], isTaken: false, color: "purple", timeOfDay: "Evening" },
];

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines);
  const [activeTab, setActiveTab] = useState<"today" | "pillbox" | "history" | "account">("today");
  const [showTodayButton, setShowTodayButton] = useState(false);

  const handleSelectDosage = (medicineId: string, dosage: string) => {
    setMedicines(prev =>
      prev.map(med => {
        if (med.id === medicineId) {
          // If same dosage clicked, deselect it
          if (med.selectedDosage === dosage) {
            return { ...med, selectedDosage: undefined };
          }
          return { ...med, selectedDosage: dosage };
        }
        return med;
      })
    );
  };

  const handleLogTaken = () => {
    setMedicines(prev =>
      prev.map(med => {
        if (med.selectedDosage && !med.isTaken) {
          return { ...med, isTaken: true };
        }
        return med;
      })
    );
  };

  const handleJumpToToday = () => {
    setSelectedDate(new Date());
    setShowTodayButton(false);
  };

  const selectedMedicines = medicines.filter(m => m.selectedDosage && !m.isTaken);
  const takenCount = medicines.filter(m => m.isTaken).length;
  const totalMedicines = medicines.length;
  const progressPercentage = (takenCount / totalMedicines) * 100;

  const getMedicinesByTime = (time: "Morning" | "Afternoon" | "Evening") => {
    return medicines.filter(m => m.timeOfDay === time);
  };

  const getTakenCountByTime = (time: "Morning" | "Afternoon" | "Evening") => {
    return medicines.filter(m => m.timeOfDay === time && m.isTaken).length;
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Check if viewing today
  const isViewingToday = isSameDay(selectedDate, new Date());

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-4 pt-12 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{getGreeting()}</p>
            <h1 className="text-2xl font-extrabold text-foreground mt-0.5">
              {isViewingToday ? "Today" : selectedDate.toLocaleDateString("en-US", { weekday: "long" })}
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <ProgressRing progress={progressPercentage} />
            <span className="text-xs text-muted-foreground mt-1">
              {takenCount}/{totalMedicines}
            </span>
          </div>
        </div>

        {/* Week Calendar with Today Button */}
        <div className="space-y-2">
          <WeekCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onShowTodayButton={setShowTodayButton}
          />
          {/* Today Button - positioned below calendar */}
          {showTodayButton && (
            <div className="flex justify-center pt-1">
              <TodayButton isVisible={showTodayButton} onClick={handleJumpToToday} />
            </div>
          )}
        </div>
      </header>

      {/* Motivation Banner - shows when all done */}
      {takenCount === totalMedicines && (
        <div className="mx-5 mb-4 p-4 rounded-2xl bg-gradient-to-r from-success/10 to-primary-light border border-success/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-success" />
            <div>
              <p className="font-bold text-success">Amazing job!</p>
              <p className="text-sm text-muted-foreground">You've taken all your medicines today</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="px-5">
        {/* Morning Section */}
        {getMedicinesByTime("Morning").length > 0 && (
          <TimeSection
            title="Morning"
            takenCount={getTakenCountByTime("Morning")}
            totalCount={getMedicinesByTime("Morning").length}
          >
            {getMedicinesByTime("Morning").map(medicine => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelectDosage={handleSelectDosage}
              />
            ))}
          </TimeSection>
        )}

        {/* Afternoon Section */}
        {getMedicinesByTime("Afternoon").length > 0 && (
          <TimeSection
            title="Afternoon"
            takenCount={getTakenCountByTime("Afternoon")}
            totalCount={getMedicinesByTime("Afternoon").length}
          >
            {getMedicinesByTime("Afternoon").map(medicine => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelectDosage={handleSelectDosage}
              />
            ))}
          </TimeSection>
        )}

        {/* Evening Section */}
        {getMedicinesByTime("Evening").length > 0 && (
          <TimeSection
            title="Evening"
            takenCount={getTakenCountByTime("Evening")}
            totalCount={getMedicinesByTime("Evening").length}
          >
            {getMedicinesByTime("Evening").map(medicine => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelectDosage={handleSelectDosage}
              />
            ))}
          </TimeSection>
        )}
      </main>

      {/* Log Button */}
      <LogButton
        isVisible={selectedMedicines.length > 0}
        selectedCount={selectedMedicines.length}
        onClick={handleLogTaken}
      />

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
