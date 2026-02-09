import { BottomNav } from "@/components/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MoreVertical, Plus, Calendar, Clock, Pill, Package, TrendingUp } from "lucide-react";
import { PillShapeIcon } from "@/components/PillBox/AddMedication/components/PillShapeIcon";
import { BACKGROUND_COLORS } from "@/components/PillBox/AddMedication/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - will be replaced with actual data fetching
const sampleMedication = {
  id: "1",
  name: "Concerta",
  form: "Extended-Release Tablet",
  strength: "18mg",
  strengthUnit: "mg",
  shape: "oblong",
  colorLeft: "white",
  colorRight: null,
  colorBackground: "light-blue",
  showLine: true,
  stock: {
    total: 45,
    sources: [
      { id: "s1", quantity: 30, expiryDate: "2025-06-15", addedAt: "2025-01-10" },
      { id: "s2", quantity: 15, expiryDate: "2025-08-20", addedAt: "2025-01-25" },
    ],
  },
  schedule: {
    type: "everyday" as const,
    timeFrames: ["morning"],
    dosingType: "fixed" as const,
    quantity: 1,
    startDate: "2024-12-01",
    endDate: null,
  },
  intakeLogs: [
    { id: "l1", date: "2025-02-09", time: "08:30", status: "taken" as const },
    { id: "l2", date: "2025-02-08", time: "08:45", status: "taken" as const },
    { id: "l3", date: "2025-02-07", time: "09:00", status: "skipped" as const },
    { id: "l4", date: "2025-02-06", time: "08:15", status: "taken" as const },
    { id: "l5", date: "2025-02-05", time: "08:30", status: "taken" as const },
  ],
};

const getBackgroundHex = (colorName: string): string => {
  const color = BACKGROUND_COLORS.find((c) => c.name === colorName);
  return color?.hex || "#FFFFFF";
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

const MedicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // TODO: Fetch actual medication data based on id
  const medication = sampleMedication;
  
  const adherenceRate = Math.round(
    (medication.intakeLogs.filter((l) => l.status === "taken").length / medication.intakeLogs.length) * 100
  );

  const handleBack = () => {
    navigate("/pillbox");
  };

  const handleEdit = () => {
    // TODO: Navigate to edit flow
    console.log("Edit medication:", id);
  };

  const handleDelete = () => {
    // TODO: Show delete confirmation
    console.log("Delete medication:", id);
  };

  const handleAddStock = () => {
    // TODO: Open add stock sheet
    console.log("Add stock for:", id);
  };

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 -mr-2 rounded-xl hover:bg-muted/50 transition-colors">
                <MoreVertical className="w-6 h-6 text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                Edit Medication
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                Delete Medication
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Medication Header */}
        <div className="flex items-center gap-4">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: getBackgroundHex(medication.colorBackground) }}
          >
            <PillShapeIcon
              shape={medication.shape}
              colorLeft={medication.colorLeft}
              colorRight={medication.colorRight}
              showLine={medication.showLine}
              size="lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-foreground truncate">
              {medication.name}
            </h1>
            <p className="text-lg font-semibold text-primary">
              {medication.strength}
            </p>
            <p className="text-sm text-muted-foreground">
              {medication.form}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-5 space-y-4">
        {/* Stock Card */}
        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Stock</h2>
            </div>
            <button
              onClick={handleAddStock}
              className="flex items-center gap-1 h-8 px-3 rounded-full border-2 border-primary text-primary text-xs font-semibold hover:bg-primary/5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Stock
            </button>
          </div>
          
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-extrabold text-foreground">
              {medication.stock.total}
            </span>
            <span className="text-muted-foreground font-medium">
              {medication.form.toLowerCase().includes("tablet") ? "tablets" : "units"} remaining
            </span>
          </div>

          {medication.stock.sources.length > 0 && (
            <div className="space-y-2">
              {medication.stock.sources.map((source) => (
                <div 
                  key={source.id}
                  className="flex items-center justify-between py-2 px-3 rounded-xl bg-muted/30"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {source.quantity} units
                    </span>
                    <span className="text-xs text-muted-foreground">
                      added {formatDate(source.addedAt)}
                    </span>
                  </div>
                  {source.expiryDate && (
                    <span className="text-xs text-muted-foreground">
                      Exp: {formatDate(source.expiryDate)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Schedule Card */}
        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Schedule</h2>
          </div>

          <div className="space-y-3">
            {/* Dosing Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {medication.schedule.quantity} {medication.form.toLowerCase().includes("tablet") ? "tablet" : "dose"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {medication.schedule.dosingType === "fixed" ? "Fixed dose" : "Flexible dosing"}
                </p>
              </div>
            </div>

            {/* Frequency */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground capitalize">
                  {medication.schedule.type.replace("_", " ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Since {formatDate(medication.schedule.startDate)}
                </p>
              </div>
            </div>

            {/* Time Frames */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground capitalize">
                  {medication.schedule.timeFrames.join(", ")}
                </p>
                <p className="text-sm text-muted-foreground">
                  Time of day
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adherence Stats */}
        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-soft">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-foreground">Adherence</h2>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl",
                adherenceRate >= 80 ? "bg-accent/20 text-accent-foreground" :
                adherenceRate >= 50 ? "bg-warning/20 text-warning" :
                "bg-destructive/20 text-destructive"
              )}
            >
              {adherenceRate}%
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {medication.intakeLogs.filter((l) => l.status === "taken").length} of {medication.intakeLogs.length} doses taken
              </p>
              <p className="text-sm text-muted-foreground">
                Last 7 days
              </p>
            </div>
          </div>
        </div>

        {/* Recent History */}
        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-foreground">Recent History</h2>
            <button 
              onClick={() => navigate("/history")}
              className="text-sm text-primary font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-2">
            {medication.intakeLogs.slice(0, 5).map((log) => (
              <div 
                key={log.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      log.status === "taken" ? "bg-accent" : "bg-muted-foreground"
                    )}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {formatDate(log.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formatTime(log.time)}
                  </span>
                  <span 
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      log.status === "taken" 
                        ? "bg-accent/20 text-accent-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {log.status === "taken" ? "Taken" : "Skipped"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default MedicationDetail;
