import { ReactNode } from "react";

interface TimeSectionProps {
  title: "Morning" | "Afternoon" | "Evening";
  children: ReactNode;
  takenCount: number;
  totalCount: number;
}

export const TimeSection = ({ title, children, takenCount, totalCount }: TimeSectionProps) => {
  const allTaken = takenCount === totalCount && totalCount > 0;

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
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
