import { IItems } from "@/components/select/interfaces";

export enum InsightTopic {
  CREATOR_ECONOMY = "Creator economy",
  MONETIZATION = "Monetização",
  ALGORITHM = "Algoritimo",
  IA = "IA",
  PSYCHOLOGY = "Psicologia",
  TREND = "Tendências",
}

export enum InsightTerritory {
  FASHION = "Moda",
  EDUCATION = "Educação",
  FINANCE = "Finanças",
  HUMOR = "Humor",
}

export enum InsightFrequency {
  DAILY = "Diariamente",
  TWO_DAY_PER_WEEK = "Duas vezes por semana",
  ONLY_SUNDAY = "Apenas aos domingo",
}

export enum InsightHour {
  MORNING = "Manhã (9h)",
  AFTERNOON = "Tarde (16h)",
  NIGHT = "Noite (21h)",
}

export const insightTopic: IItems<InsightTopic>[] = [
  { label: "Creator Economy", value: InsightTopic.CREATOR_ECONOMY },
  { label: "Monetização", value: InsightTopic.MONETIZATION },
  { label: "Algoritimo", value: InsightTopic.ALGORITHM },
  { label: "IA", value: InsightTopic.IA },
  { label: "Psicologia", value: InsightTopic.PSYCHOLOGY },
  { label: "Tendências", value: InsightTopic.TREND },
];

export const insightHour: IItems<InsightHour>[] = [
  { label: "Manhã (9h)", value: InsightHour.MORNING },
  { label: "Tarde (16h)", value: InsightHour.AFTERNOON },
  { label: "Noite (21h)", value: InsightHour.NIGHT },
];

export const insightTerritory: IItems<InsightTerritory>[] = [
  { label: "Moda", value: InsightTerritory.FASHION },
  { label: "Educação", value: InsightTerritory.EDUCATION },
  { label: "Finanças", value: InsightTerritory.FINANCE },
  { label: "Humor", value: InsightTerritory.HUMOR },
];

export const insightFrequencyItems: IItems<InsightFrequency>[] = [
  { label: "Diariamente", value: InsightFrequency.DAILY },
  { label: "Duas vezes por semana", value: InsightFrequency.TWO_DAY_PER_WEEK },
  { label: "Apenas aos domingo", value: InsightFrequency.ONLY_SUNDAY },
];
