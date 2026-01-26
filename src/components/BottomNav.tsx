import { cn } from "@/lib/utils";
import { CalendarDays, Pill, Clock, User } from "lucide-react";

type TabId = "today" | "pillbox" | "history" | "account";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "today" as TabId, label: "Today", icon: CalendarDays },
  { id: "pillbox" as TabId, label: "Pill Box", icon: Pill },
  { id: "history" as TabId, label: "History", icon: Clock },
  { id: "account" as TabId, label: "Account", icon: User },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-nav-background border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center py-3 px-4 min-w-[72px] transition-all duration-200",
                isActive && "relative"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive ? "bg-primary-light" : "bg-transparent"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "text-nav-inactive"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium mt-1 transition-colors",
                isActive ? "text-primary" : "text-nav-inactive"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
