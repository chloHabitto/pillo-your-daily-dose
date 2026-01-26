import { useState, useMemo } from "react";
import { BottomNav } from "@/components/BottomNav";
import { AdherenceStats } from "@/components/History/AdherenceStats";
import { AdherenceCalendar } from "@/components/History/AdherenceCalendar";
import { IntakeLogCard } from "@/components/History/IntakeLogCard";
import { HistoryFilters } from "@/components/History/HistoryFilters";
import { format, isSameDay, subDays, startOfDay } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, List } from "lucide-react";

// Sample data - would come from backend in real app
const generateSampleLogs = () => {
  const logs = [];
  const medications = [
    { name: "Concerta", dosages: ["18mg", "32mg"], color: "blue" },
    { name: "Bufrion", dosages: ["100mg"], color: "pink" },
    { name: "Folic Acid", dosages: ["18mg"], color: "yellow" },
    { name: "Vitamin D", dosages: ["1000IU"], color: "green" },
    { name: "Melatonin", dosages: ["3mg", "5mg"], color: "purple" },
  ];
  const timesOfDay = ["Morning", "Afternoon", "Evening", "Night"] as const;

  for (let i = 0; i < 30; i++) {
    const date = subDays(new Date(), i);
    const numLogs = Math.floor(Math.random() * 4) + 2;
    
    for (let j = 0; j < numLogs; j++) {
      const med = medications[Math.floor(Math.random() * medications.length)];
      const time = timesOfDay[Math.floor(Math.random() * timesOfDay.length)];
      const hour = time === "Morning" ? 8 : time === "Afternoon" ? 13 : time === "Evening" ? 18 : 22;
      
      logs.push({
        id: `${i}-${j}`,
        medicationName: med.name,
        dosage: med.dosages[Math.floor(Math.random() * med.dosages.length)],
        color: med.color,
        timeOfDay: time,
        takenAt: new Date(date.setHours(hour, Math.floor(Math.random() * 60))),
        stockDeducted: Math.random() > 0.5 ? 1 : undefined,
        notes: Math.random() > 0.8 ? "Taken with food" : undefined,
      });
    }
  }
  
  return logs.sort((a, b) => b.takenAt.getTime() - a.takenAt.getTime());
};

const generateAdherenceData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    const date = subDays(new Date(), i);
    const random = Math.random();
    data.push({
      date,
      status: random > 0.7 ? "complete" : random > 0.4 ? "partial" : random > 0.2 ? "missed" : "none" as const,
      percentage: Math.floor(random * 100),
    });
  }
  return data;
};

const History = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("timeline");

  const intakeLogs = useMemo(() => generateSampleLogs(), []);
  const adherenceData = useMemo(() => generateAdherenceData(), []);
  
  const medications = [...new Set(intakeLogs.map(log => log.medicationName))];

  // Filter logs
  const filteredLogs = useMemo(() => {
    return intakeLogs.filter(log => {
      if (selectedDate && !isSameDay(log.takenAt, selectedDate)) return false;
      if (selectedMedications.length > 0 && !selectedMedications.includes(log.medicationName)) return false;
      if (selectedTimeOfDay.length > 0 && !selectedTimeOfDay.includes(log.timeOfDay)) return false;
      return true;
    });
  }, [intakeLogs, selectedDate, selectedMedications, selectedTimeOfDay]);

  // Group logs by date
  const groupedLogs = useMemo(() => {
    const groups: { [key: string]: typeof filteredLogs } = {};
    filteredLogs.forEach(log => {
      const dateKey = format(startOfDay(log.takenAt), "yyyy-MM-dd");
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(log);
    });
    return groups;
  }, [filteredLogs]);

  const clearFilters = () => {
    setSelectedDate(null);
    setSelectedMedications([]);
    setSelectedTimeOfDay([]);
  };

  // Calculate stats
  const weeklyAdherence = 85;
  const currentStreak = 7;
  const totalLogged = intakeLogs.length;

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <header className="px-5 pt-14 pb-4">
        <h1 className="text-3xl font-extrabold text-foreground">History</h1>
        <p className="text-muted-foreground font-medium mt-1">
          Track your medication journey
        </p>
      </header>

      <main className="px-5 space-y-5">
        {/* Stats Dashboard */}
        <AdherenceStats
          weeklyAdherence={weeklyAdherence}
          currentStreak={currentStreak}
          totalLogged={totalLogged}
        />

        {/* View Toggle */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 h-12 rounded-2xl bg-secondary p-1">
            <TabsTrigger 
              value="timeline" 
              className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-soft font-semibold flex items-center gap-2"
            >
              <List className="w-4 h-4" />
              Timeline
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-soft font-semibold flex items-center gap-2"
            >
              <CalendarDays className="w-4 h-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="mt-4">
            <AdherenceCalendar
              adherenceData={adherenceData}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </TabsContent>

          <TabsContent value="timeline" className="mt-4 space-y-4">
            {/* Filters */}
            <HistoryFilters
              medications={medications}
              selectedMedications={selectedMedications}
              selectedTimeOfDay={selectedTimeOfDay}
              onMedicationChange={setSelectedMedications}
              onTimeOfDayChange={setSelectedTimeOfDay}
              onClearFilters={clearFilters}
            />

            {/* Timeline Feed */}
            {Object.entries(groupedLogs).length > 0 ? (
              Object.entries(groupedLogs).map(([dateKey, logs]) => (
                <div key={dateKey}>
                  <h3 className="text-sm font-bold text-muted-foreground mb-3 sticky top-0 bg-background py-2">
                    {format(new Date(dateKey), "EEEE, MMMM d")}
                  </h3>
                  <div className="space-y-3">
                    {logs.map(log => (
                      <IntakeLogCard key={log.id} log={log} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-2xl bg-secondary mb-4">
                  <List className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  No logs found
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {selectedDate || selectedMedications.length > 0 || selectedTimeOfDay.length > 0
                    ? "Try adjusting your filters"
                    : "Your medication logs will appear here"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default History;
