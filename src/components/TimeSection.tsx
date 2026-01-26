import { ReactNode } from "react";
import { Sun, Sunset, Moon } from "lucide-react";

interface TimeSectionProps {
  title: "Morning" | "Afternoon" | "Evening";
  children: ReactNode;
  takenCount: number;
  totalCount: number;
}

const sectionIcons = {
  Morning: Sun,
  Afternoon: Sunset,
  Evening: Moon,
};

const sectionColors = {
  Morning: "text-amber-500",
  Afternoon: "text-orange-500",
  Evening: "text-indigo-500",
};

export const TimeSection = ({ title, children, takenCount, totalCount }: TimeSectionProps) => {
  const Icon = sectionIcons[title];
  const iconColor = sectionColors[title];
  const allTaken = takenCount === totalCount && totalCount > 0;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {takenCount}/{totalCount}
          </span>
          {allTaken && (
            <span className="text-xs font-medium text-success bg-success-light px-2 py-0.5 rounded-full">
              Done!
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
};
