import { IItems } from "@/components/select/interfaces";

export enum InsightTopics {
  CREATOR_ECONOMY = "Creator economy",
  MONETIZATION = "Monetização",
  ALGORITHM = "Algoritimo",
  IA = "IA",
  PSYCHOLOGY = "Psicologia",
  TREND = "Tendências",
}

export enum InsightTerritory {
  GENERAL = "Geral",
  FINANCE = "Finanças",
  MARKETING = "Marketing",
  TECNOLOGY = "Tecnologia",
  HEALTH = "Saude",
  EDUCATION = "Educação",
}

export enum InsightFrequency {
  DAILY = "Diariamente",
  THREE_DAY_PER_WEEK = "3x por semana",
  WEEKLY = "Semanalmente",
  QUARTERLY = "Quinzenalmente",
}

export enum InsightHour {
  SIX_AM = "6h",
  SEVEN_AM = "7h",
  EIGTH_AM = "8h",
  NINE_AM = "9h",
  TEN_AM = "10h",
  ELEVEN_AM = "11h",
  TWELVE_AM = "12h",
  ONE_PM = "13h",
  TWO_PM = "14h",
  THREE_PM = "15h",
  FOUR_PM = "16h",
  FIVE_PM = "17h",
  SIX_PM = "18h",
  SEVEN_PM = "19h",
  EIGHT_PM = "20h",
  NINE_PM = "21h",
  TEN_PM = "22h",
}

export const insightTopicsItems: IItems<InsightTopics>[] = [
  { label: "Creator Economy", value: InsightTopics.CREATOR_ECONOMY },
  { label: "Monetização", value: InsightTopics.MONETIZATION },
  { label: "Algoritimo", value: InsightTopics.ALGORITHM },
  { label: "IA", value: InsightTopics.IA },
  { label: "Psicologia", value: InsightTopics.PSYCHOLOGY },
  { label: "Tendências", value: InsightTopics.TREND },
];

export const insightTerritoryItems: IItems<InsightTerritory>[] = [
  { label: "Geral", value: InsightTerritory.GENERAL },
  { label: "Finanças", value: InsightTerritory.FINANCE },
  { label: "Marketing", value: InsightTerritory.MARKETING },
  { label: "Tecnologia", value: InsightTerritory.TECNOLOGY },
  { label: "Saude", value: InsightTerritory.HEALTH },
  { label: "Educação", value: InsightTerritory.EDUCATION },
];

export const insightFrequencyItems: IItems<InsightFrequency>[] = [
  { label: "Diariamente", value: InsightFrequency.DAILY },
  { label: "3x por semana", value: InsightFrequency.THREE_DAY_PER_WEEK },
  { label: "Semanalmente", value: InsightFrequency.WEEKLY },
  { label: "Quinzenalmente", value: InsightFrequency.QUARTERLY },
];

export const insightHourItems: IItems<InsightHour>[] = [
  { label: "6h", value: InsightHour.SIX_AM },
  { label: "7h", value: InsightHour.SEVEN_AM },
  { label: "8h", value: InsightHour.EIGTH_AM },
  { label: "9h", value: InsightHour.NINE_AM },
  { label: "10h", value: InsightHour.TEN_AM },
  { label: "11h", value: InsightHour.ELEVEN_AM },
  { label: "12h", value: InsightHour.TWELVE_AM },
  { label: "13h", value: InsightHour.ONE_PM },
  { label: "14h", value: InsightHour.TWO_PM },
  { label: "15h", value: InsightHour.THREE_PM },
  { label: "16h", value: InsightHour.FOUR_PM },
  { label: "17h", value: InsightHour.FIVE_PM },
  { label: "18h", value: InsightHour.SIX_PM },
  { label: "19h", value: InsightHour.SEVEN_PM },
  { label: "20h", value: InsightHour.EIGHT_PM },
  { label: "21h", value: InsightHour.NINE_PM },
  { label: "22h", value: InsightHour.TEN_PM },
];
