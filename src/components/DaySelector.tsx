import { cn } from "@/lib/utils";

interface DaySelectorProps {
  days: { day: string; date: number; isToday: boolean }[];
  selectedDate: number;
  onSelectDate: (date: number) => void;
}

export const DaySelector = ({ days, selectedDate, onSelectDate }: DaySelectorProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map((item) => (
        <button
          key={item.date}
          onClick={() => onSelectDate(item.date)}
          className={cn(
            "flex flex-col items-center min-w-[52px] py-3 px-2 rounded-2xl transition-all duration-200",
            selectedDate === item.date
              ? "bg-primary text-primary-foreground shadow-medium"
              : "bg-card hover:bg-secondary"
          )}
        >
          <span className={cn(
            "text-xs font-medium uppercase tracking-wide",
            selectedDate === item.date ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {item.day}
          </span>
          <span className={cn(
            "text-lg font-bold mt-1",
            selectedDate === item.date ? "text-primary-foreground" : "text-foreground"
          )}>
            {item.date}
          </span>
          {item.isToday && selectedDate !== item.date && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
          )}
          {item.isToday && selectedDate === item.date && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground mt-1" />
          )}
        </button>
      ))}
    </div>
  );
};
