import { Flame, TrendingUp, Calendar } from "lucide-react";

interface AdherenceStatsProps {
  weeklyAdherence: number;
  currentStreak: number;
  totalLogged: number;
}

export const AdherenceStats = ({ weeklyAdherence, currentStreak, totalLogged }: AdherenceStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Weekly Adherence */}
      <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
        <div className="flex justify-center mb-2">
          <div className="p-2 rounded-xl bg-success/10">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{weeklyAdherence}%</p>
        <p className="text-xs text-muted-foreground font-medium">This Week</p>
      </div>

      {/* Current Streak */}
      <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
        <div className="flex justify-center mb-2">
          <div className="p-2 rounded-xl bg-accent/20">
            <Flame className="w-5 h-5 text-accent" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
        <p className="text-xs text-muted-foreground font-medium">Day Streak</p>
      </div>

      {/* Total Logged */}
      <div className="bg-card rounded-2xl p-4 text-center shadow-soft">
        <div className="flex justify-center mb-2">
          <div className="p-2 rounded-xl bg-primary/10">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{totalLogged}</p>
        <p className="text-xs text-muted-foreground font-medium">Total Logs</p>
      </div>
    </div>
  );
};
