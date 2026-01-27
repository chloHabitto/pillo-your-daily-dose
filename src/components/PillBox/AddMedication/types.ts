export interface MedicationFormData {
  name: string;
  strengths: StrengthEntry[];
  dosingType: "fixed" | "flexible";
  selectedStrengths: string[]; // IDs of selected strengths for dosing
  fixedQuantity: number;
  schedule: ScheduleData;
  form: string;
  customForm: string;
  shape: string;
  showLine: boolean;
  colorLeft: string;
  colorRight: string | null;
  colorBackground: string;
}

export interface StrengthEntry {
  id: string;
  value: string;
  unit: string;
}

export interface ScheduleData {
  type: "everyday" | "specific_days" | "cyclical" | "as_needed";
  specificDays?: number[]; // 0-6 for Sunday-Saturday
  cycleOnDays?: number;
  cycleOffDays?: number;
  timeMode: "specific" | "timeframe";
  specificTimes: string[]; // HH:mm format
  timeFrames: TimeFrameEntry[];
  startDate: string; // ISO date
  endDate: string | null; // ISO date or null for no end
}

export interface TimeFrameEntry {
  id: string;
  type: "morning" | "afternoon" | "evening" | "night" | "custom";
  startTime?: string; // HH:mm for custom
  endTime?: string; // HH:mm for custom
}

export const MEDICATION_FORMS = [
  // Common forms first
  "Tablet",
  "Capsule",
  "Extended-Release Tablet",
  "Liquid",
  "Cream",
  "Drops",
  // More forms
  "Gel",
  "Ointment",
  "Patch",
  "Injection",
  "Inhaler",
  "Spray",
  "Powder",
  "Suppository",
  "Lozenge",
  "Foam",
  "Topical",
  "Other",
] as const;

export const COMMON_FORMS = ["Tablet", "Capsule", "Extended-Release Tablet", "Liquid", "Cream", "Drops"];

export const STRENGTH_UNITS = [
  "mg",
  "g",
  "mcg",
  "mL",
  "IU",
  "%",
] as const;

export const EXTENDED_UNITS = [
  "mg",
  "g",
  "mcg",
  "μg",
  "mL",
  "L",
  "IU",
  "units",
  "%",
  "mg/mL",
  "mcg/mL",
] as const;

export const PILL_SHAPES = [
  // Common shapes
  { name: "capsule", label: "Capsule", twoTone: true },
  { name: "round", label: "Round", twoTone: false, hasLine: true },
  { name: "oval", label: "Oval", twoTone: false, hasLine: true },
  { name: "oblong", label: "Oblong", twoTone: false, hasLine: true },
  // More shapes
  { name: "triangle", label: "Triangle", twoTone: false },
  { name: "square", label: "Square", twoTone: false },
  { name: "diamond", label: "Diamond", twoTone: false },
  { name: "pentagon", label: "Pentagon", twoTone: false },
  { name: "hexagon", label: "Hexagon", twoTone: false },
  { name: "bottle", label: "Bottle", twoTone: true },
  { name: "cream-tube", label: "Cream Tube", twoTone: true },
  { name: "dropper", label: "Dropper", twoTone: false },
  { name: "inhaler", label: "Inhaler", twoTone: false },
  { name: "syringe", label: "Syringe", twoTone: false },
  { name: "patch", label: "Patch", twoTone: false },
] as const;

export const COMMON_SHAPES = ["capsule", "round", "oval", "oblong"];

export const PILL_COLORS = [
  { name: "white", label: "White", hex: "#FFFFFF" },
  { name: "blue", label: "Blue", hex: "#3B82F6" },
  { name: "pink", label: "Pink", hex: "#EC4899" },
  { name: "yellow", label: "Yellow", hex: "#F59E0B" },
  { name: "green", label: "Green", hex: "#10B981" },
  { name: "purple", label: "Purple", hex: "#8B5CF6" },
  { name: "red", label: "Red", hex: "#EF4444" },
  { name: "orange", label: "Orange", hex: "#F97316" },
  { name: "teal", label: "Teal", hex: "#14B8A6" },
  { name: "gray", label: "Gray", hex: "#6B7280" },
  { name: "brown", label: "Brown", hex: "#92400E" },
  { name: "beige", label: "Beige", hex: "#D4C5A9" },
] as const;

export const BACKGROUND_COLORS = [
  { name: "white", label: "White", hex: "#FFFFFF" },
  { name: "light-blue", label: "Light Blue", hex: "#DBEAFE" },
  { name: "light-pink", label: "Light Pink", hex: "#FCE7F3" },
  { name: "light-yellow", label: "Light Yellow", hex: "#FEF3C7" },
  { name: "light-green", label: "Light Green", hex: "#D1FAE5" },
  { name: "light-purple", label: "Light Purple", hex: "#EDE9FE" },
] as const;

export const TIME_FRAMES = [
  { type: "morning" as const, label: "Morning", range: "5 AM - 12 PM" },
  { type: "afternoon" as const, label: "Afternoon", range: "12 PM - 5 PM" },
  { type: "evening" as const, label: "Evening", range: "5 PM - 9 PM" },
  { type: "night" as const, label: "Night", range: "9 PM - 5 AM" },
] as const;

export type MedicationForm = typeof MEDICATION_FORMS[number];
export type StrengthUnit = typeof STRENGTH_UNITS[number];
export type PillShape = typeof PILL_SHAPES[number]["name"];
export type PillColor = typeof PILL_COLORS[number]["name"];

export const getInitialFormData = (): MedicationFormData => ({
  name: "",
  strengths: [{ id: crypto.randomUUID(), value: "", unit: "mg" }],
  dosingType: "fixed",
  selectedStrengths: [],
  fixedQuantity: 1,
  schedule: {
    type: "everyday",
    timeMode: "specific",
    specificTimes: ["09:00"],
    timeFrames: [],
    startDate: new Date().toISOString().split("T")[0],
    endDate: null,
  },
  form: "",
  customForm: "",
  shape: "capsule",
  showLine: false,
  colorLeft: "blue",
  colorRight: null,
  colorBackground: "white",
});
