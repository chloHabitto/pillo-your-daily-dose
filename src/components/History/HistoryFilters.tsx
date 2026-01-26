import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HistoryFiltersProps {
  medications: string[];
  selectedMedications: string[];
  selectedTimeOfDay: string[];
  onMedicationChange: (medications: string[]) => void;
  onTimeOfDayChange: (times: string[]) => void;
  onClearFilters: () => void;
}

const timeOfDayOptions = ["Morning", "Afternoon", "Evening", "Night"];

export const HistoryFilters = ({
  medications,
  selectedMedications,
  selectedTimeOfDay,
  onMedicationChange,
  onTimeOfDayChange,
  onClearFilters,
}: HistoryFiltersProps) => {
  const [medicationOpen, setMedicationOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const hasActiveFilters = selectedMedications.length > 0 || selectedTimeOfDay.length > 0;

  const toggleMedication = (med: string) => {
    if (selectedMedications.includes(med)) {
      onMedicationChange(selectedMedications.filter(m => m !== med));
    } else {
      onMedicationChange([...selectedMedications, med]);
    }
  };

  const toggleTimeOfDay = (time: string) => {
    if (selectedTimeOfDay.includes(time)) {
      onTimeOfDayChange(selectedTimeOfDay.filter(t => t !== time));
    } else {
      onTimeOfDayChange([...selectedTimeOfDay, time]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {/* Medication Filter */}
        <Popover open={medicationOpen} onOpenChange={setMedicationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full gap-1.5 shrink-0",
                selectedMedications.length > 0 && "bg-primary/10 border-primary text-primary"
              )}
            >
              <Filter className="w-3.5 h-3.5" />
              Medication
              {selectedMedications.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 rounded-full">
                  {selectedMedications.length}
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="start">
            <div className="space-y-1">
              {medications.map((med) => (
                <button
                  key={med}
                  onClick={() => toggleMedication(med)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedMedications.includes(med)
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {med}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Time of Day Filter */}
        <Popover open={timeOpen} onOpenChange={setTimeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "rounded-full gap-1.5 shrink-0",
                selectedTimeOfDay.length > 0 && "bg-primary/10 border-primary text-primary"
              )}
            >
              Time of Day
              {selectedTimeOfDay.length > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-1.5 rounded-full">
                  {selectedTimeOfDay.length}
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="start">
            <div className="space-y-1">
              {timeOfDayOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTimeOfDay(time)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedTimeOfDay.includes(time)
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="rounded-full gap-1 shrink-0 text-muted-foreground"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};
