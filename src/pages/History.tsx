import { BottomNav } from "@/components/BottomNav";
import { Calendar } from "lucide-react";

const History = () => {
  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-5 pt-14 pb-6">
        <h1 className="text-3xl font-extrabold text-foreground">History</h1>
        <p className="text-muted-foreground font-medium mt-1">
          View your medication history
        </p>
      </header>

      {/* Empty State */}
      <main className="px-5">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-2xl bg-primary-light mb-4">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No history yet
          </h3>
          <p className="text-muted-foreground max-w-xs">
            Your medication intake history will appear here
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default History;
