import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X, Clock, Calendar, Sun, Sunset, Moon, CloudSun } from "lucide-react";
import { ScheduleData, TimeFrameEntry, TIME_FRAMES } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";

interface ScheduleStepProps {
  schedule: ScheduleData;
  onChange: (schedule: ScheduleData) => void;
}

const DAYS_OF_WEEK = [
  { value: 0, label: "S", fullLabel: "Sunday" },
  { value: 1, label: "M", fullLabel: "Monday" },
  { value: 2, label: "T", fullLabel: "Tuesday" },
  { value: 3, label: "W", fullLabel: "Wednesday" },
  { value: 4, label: "T", fullLabel: "Thursday" },
  { value: 5, label: "F", fullLabel: "Friday" },
  { value: 6, label: "S", fullLabel: "Saturday" },
];

const TimeFrameIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "morning":
      return <Sun className="w-5 h-5" />;
    case "afternoon":
      return <CloudSun className="w-5 h-5" />;
    case "evening":
      return <Sunset className="w-5 h-5" />;
    case "night":
      return <Moon className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export const ScheduleStep = ({
  schedule,
  onChange,
}: ScheduleStepProps) => {
  const [showEndDate, setShowEndDate] = useState(schedule.endDate !== null);

  const updateSchedule = <K extends keyof ScheduleData>(key: K, value: ScheduleData[K]) => {
    onChange({ ...schedule, [key]: value });
  };

  const addSpecificTime = () => {
    updateSchedule("specificTimes", [...schedule.specificTimes, "12:00"]);
  };

  const removeSpecificTime = (index: number) => {
    if (schedule.specificTimes.length > 1) {
      updateSchedule(
        "specificTimes",
        schedule.specificTimes.filter((_, i) => i !== index)
      );
    }
  };

  const updateSpecificTime = (index: number, time: string) => {
    const newTimes = [...schedule.specificTimes];
    newTimes[index] = time;
    updateSchedule("specificTimes", newTimes);
  };

  const toggleTimeFrame = (type: TimeFrameEntry["type"]) => {
    const existing = schedule.timeFrames.find((tf) => tf.type === type);
    if (existing) {
      updateSchedule(
        "timeFrames",
        schedule.timeFrames.filter((tf) => tf.type !== type)
      );
    } else {
      updateSchedule("timeFrames", [
        ...schedule.timeFrames,
        { id: crypto.randomUUID(), type },
      ]);
    }
  };

  const toggleDay = (day: number) => {
    const currentDays = schedule.specificDays || [];
    if (currentDays.includes(day)) {
      updateSchedule(
        "specificDays",
        currentDays.filter((d) => d !== day)
      );
    } else {
      updateSchedule("specificDays", [...currentDays, day].sort());
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          When do you take it?
        </h2>
        <p className="text-muted-foreground mt-2">
          Set your schedule and times
        </p>
      </div>

      {/* Schedule Type */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">Frequency</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "everyday", label: "Every day" },
            { value: "specific_days", label: "Specific days" },
            { value: "cyclical", label: "Cyclical" },
            { value: "as_needed", label: "As needed" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => updateSchedule("type", option.value as ScheduleData["type"])}
              className={cn(
                "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                schedule.type === option.value
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Specific Days Selection */}
      {schedule.type === "specific_days" && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Select days</Label>
          <div className="flex justify-between gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day.value}
                type="button"
                onClick={() => toggleDay(day.value)}
                className={cn(
                  "w-10 h-10 rounded-full text-sm font-medium transition-all",
                  schedule.specificDays?.includes(day.value)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cyclical Schedule */}
      {schedule.type === "cyclical" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Days on</Label>
            <Input
              type="number"
              min="1"
              value={schedule.cycleOnDays || 1}
              onChange={(e) => updateSchedule("cycleOnDays", parseInt(e.target.value) || 1)}
              className="h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Days off</Label>
            <Input
              type="number"
              min="1"
              value={schedule.cycleOffDays || 1}
              onChange={(e) => updateSchedule("cycleOffDays", parseInt(e.target.value) || 1)}
              className="h-12 rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Time Mode Toggle */}
      {schedule.type !== "as_needed" && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">Set times by</Label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => updateSchedule("timeMode", "specific")}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2",
                  schedule.timeMode === "specific"
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                )}
              >
                <Clock className="w-4 h-4" />
                Specific times
              </button>
              <button
                type="button"
                onClick={() => updateSchedule("timeMode", "timeframe")}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center justify-center gap-2",
                  schedule.timeMode === "timeframe"
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                )}
              >
                <Sun className="w-4 h-4" />
                Time frames
              </button>
            </div>
          </div>

          {/* Specific Times */}
          {schedule.timeMode === "specific" && (
            <div className="space-y-3">
              {schedule.specificTimes.map((time, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 p-3 rounded-xl bg-secondary/50">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => updateSpecificTime(index, e.target.value)}
                      className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                    />
                    <span className="text-sm text-muted-foreground">1 dose</span>
                  </div>
                  {schedule.specificTimes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecificTime(index)}
                      className="p-2 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSpecificTime}
                className="w-full h-10 rounded-xl border-dashed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add time
              </Button>
            </div>
          )}

          {/* Time Frames */}
          {schedule.timeMode === "timeframe" && (
            <div className="grid grid-cols-2 gap-3">
              {TIME_FRAMES.map((frame) => {
                const isSelected = schedule.timeFrames.some((tf) => tf.type === frame.type);
                return (
                  <button
                    key={frame.type}
                    type="button"
                    onClick={() => toggleTimeFrame(frame.type)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <TimeFrameIcon type={frame.type} />
                      <span className="font-medium text-foreground">{frame.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{frame.range}</p>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Start & End Dates */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-muted-foreground">Start date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl justify-start font-normal"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {schedule.startDate
                  ? format(parseISO(schedule.startDate), "PPP")
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={schedule.startDate ? parseISO(schedule.startDate) : undefined}
                onSelect={(date) =>
                  updateSchedule("startDate", date ? format(date, "yyyy-MM-dd") : "")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">End date</Label>
            <button
              type="button"
              onClick={() => {
                setShowEndDate(!showEndDate);
                if (showEndDate) {
                  updateSchedule("endDate", null);
                }
              }}
              className="text-sm text-primary font-medium"
            >
              {showEndDate ? "No end date" : "Set end date"}
            </button>
          </div>
          {showEndDate && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl justify-start font-normal"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {schedule.endDate
                    ? format(parseISO(schedule.endDate), "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={schedule.endDate ? parseISO(schedule.endDate) : undefined}
                  onSelect={(date) =>
                    updateSchedule("endDate", date ? format(date, "yyyy-MM-dd") : null)
                  }
                  disabled={(date) =>
                    schedule.startDate ? date < parseISO(schedule.startDate) : false
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
