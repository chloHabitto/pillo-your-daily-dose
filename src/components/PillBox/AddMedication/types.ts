export interface MedicationFormData {
  name: string;
  form: string;
  customForm?: string;
  strengths: StrengthEntry[];
  color: string;
}

export interface StrengthEntry {
  id: string;
  value: string;
  unit: string;
}

export const MEDICATION_FORMS = [
  "Tablet",
  "Capsule",
  "Extended-Release Tablet",
  "Liquid",
  "Drops",
  "Cream",
  "Gel",
  "Ointment",
  "Patch",
  "Injection",
  "Inhaler",
  "Spray",
  "Powder",
  "Suppository",
  "Lozenge",
  "Other",
] as const;

export const STRENGTH_UNITS = [
  "mg",
  "g",
  "mcg",
  "mL",
  "IU",
  "%",
] as const;

export const PILL_COLORS = [
  { name: "blue", label: "Blue" },
  { name: "pink", label: "Pink" },
  { name: "yellow", label: "Yellow" },
  { name: "green", label: "Green" },
  { name: "purple", label: "Purple" },
  { name: "red", label: "Red" },
  { name: "orange", label: "Orange" },
  { name: "teal", label: "Teal" },
] as const;

export type MedicationForm = typeof MEDICATION_FORMS[number];
export type StrengthUnit = typeof STRENGTH_UNITS[number];
