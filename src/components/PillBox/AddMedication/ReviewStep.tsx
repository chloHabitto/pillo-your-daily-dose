import { cn } from "@/lib/utils";
import { MedicationFormData, PILL_SHAPES, BACKGROUND_COLORS, TIME_FRAMES } from "./types";
import { PillShapeIcon } from "./components/PillShapeIcon";
import { Check, Calendar, Clock, Repeat } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ReviewStepProps {
  data: MedicationFormData;
}

export const ReviewStep = ({ data }: ReviewStepProps) => {
  const shapeConfig = PILL_SHAPES.find((s) => s.name === data.shape);
  const isTwoTone = shapeConfig?.twoTone || false;
  const bgColor = BACKGROUND_COLORS.find((c) => c.name === data.colorBackground);

  const displayForm = data.form === "Other" && data.customForm 
    ? data.customForm 
    : data.form;

  const validStrengths = data.strengths.filter((s) => s.value.trim());

  const getScheduleDescription = () => {
    switch (data.schedule.type) {
      case "everyday":
        return "Every day";
      case "specific_days":
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return data.schedule.specificDays?.map((d) => days[d]).join(", ") || "No days selected";
      case "cyclical":
        return `${data.schedule.cycleOnDays} days on, ${data.schedule.cycleOffDays} days off`;
      case "as_needed":
        return "As needed";
      default:
        return "Not set";
    }
  };

  const getTimeDescription = () => {
    if (data.schedule.type === "as_needed") return "When needed";
    
    if (data.schedule.timeMode === "specific") {
      return data.schedule.specificTimes
        .map((t) => {
          const [hours, minutes] = t.split(":");
          const h = parseInt(hours);
          const ampm = h >= 12 ? "PM" : "AM";
          const h12 = h % 12 || 12;
          return `${h12}:${minutes} ${ampm}`;
        })
        .join(", ");
    } else {
      return data.schedule.timeFrames
        .map((tf) => {
          const frame = TIME_FRAMES.find((f) => f.type === tf.type);
          return frame?.label || tf.type;
        })
        .join(", ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Review & Save
        </h2>
        <p className="text-muted-foreground mt-2">
          Make sure everything looks correct
        </p>
      </div>

      {/* Preview Card */}
      <div className="p-6 rounded-2xl bg-card border-2 border-border shadow-soft">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="p-4 rounded-xl flex-shrink-0"
            style={{ backgroundColor: bgColor?.hex || "#FFFFFF" }}
          >
            <PillShapeIcon
              shape={data.shape}
              colorLeft={data.colorLeft}
              colorRight={isTwoTone ? data.colorRight : null}
              showLine={data.showLine}
              size="md"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground truncate">
              {data.name || "Medication Name"}
            </h3>
            
            {/* Strengths */}
            <div className="flex flex-wrap gap-2 mt-3">
              {validStrengths.map((strength) => (
                <span
                  key={strength.id}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                >
                  {strength.value}{strength.unit}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground mt-3">
              {displayForm}
            </p>
          </div>
        </div>
      </div>

      {/* Summary List */}
      <div className="space-y-3">
        <SummaryItem 
          icon={<Check className="w-4 h-4" />}
          label="Name" 
          value={data.name} 
          isComplete={!!data.name} 
        />
        <SummaryItem 
          icon={<Check className="w-4 h-4" />}
          label="Form" 
          value={displayForm} 
          isComplete={!!data.form} 
        />
        <SummaryItem 
          icon={<Check className="w-4 h-4" />}
          label="Strengths" 
          value={validStrengths.map((s) => `${s.value}${s.unit}`).join(", ")} 
          isComplete={validStrengths.length > 0} 
        />
        <SummaryItem 
          icon={<Check className="w-4 h-4" />}
          label="Dosing" 
          value={data.dosingType === "fixed" ? "Fixed dose" : "Flexible dose"} 
          isComplete={true} 
        />
        <SummaryItem 
          icon={<Repeat className="w-4 h-4" />}
          label="Schedule" 
          value={getScheduleDescription()} 
          isComplete={true} 
        />
        <SummaryItem 
          icon={<Clock className="w-4 h-4" />}
          label="Times" 
          value={getTimeDescription()} 
          isComplete={
            data.schedule.type === "as_needed" ||
            data.schedule.specificTimes.length > 0 ||
            data.schedule.timeFrames.length > 0
          } 
        />
        <SummaryItem 
          icon={<Calendar className="w-4 h-4" />}
          label="Start date" 
          value={data.schedule.startDate ? format(parseISO(data.schedule.startDate), "PPP") : "Not set"} 
          isComplete={!!data.schedule.startDate} 
        />
        {data.schedule.endDate && (
          <SummaryItem 
            icon={<Calendar className="w-4 h-4" />}
            label="End date" 
            value={format(parseISO(data.schedule.endDate), "PPP")} 
            isComplete={true} 
          />
        )}
      </div>
    </div>
  );
};

interface SummaryItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isComplete: boolean;
}

const SummaryItem = ({ icon, label, value, isComplete }: SummaryItemProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
    <div className="flex items-center gap-2">
      <span className={cn(
        "p-1 rounded-full",
        isComplete ? "text-success" : "text-muted-foreground"
      )}>
        {icon}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </div>
    <span className="font-medium text-foreground text-right max-w-[60%] truncate">
      {value || "—"}
    </span>
  </div>
);
