import { IItems } from "@/components/select/interfaces";

export enum InsightTopics {
  ALGORITHM = "Algoritmo",
  CREATOR_ECONOMY = "Creator economy",
  IA = "IA",
  MONETIZATION = "Monetização",
  PSYCHOLOGY = "Psicologia",
  TREND = "Tendências",
}

export enum InsightTerritory {
  GENERAL = "Geral",
  BEAUTY_SKINCARE = "Beleza e skincare",
  COOKING_GASTRONOMY = "Culinária e gastronomia",
  EDUCATION = "Educação",
  ENTERTAINMENT = "Entretenimento",
  FINANCE = "Finanças",
  GAMES_ESPORTS = "Games e e-sports",
  HUMOR_MEMES = "Humor e memes",
  MARKETING = "Marketing",
  FASHION_STYLE = "Moda e estilo",
  TECNOLOGY = "Tecnologia",
  HEALTH = "Saúde",
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
  { label: InsightTopics.ALGORITHM, value: InsightTopics.ALGORITHM },
  {
    label: InsightTopics.CREATOR_ECONOMY,
    value: InsightTopics.CREATOR_ECONOMY,
  },
  { label: InsightTopics.IA, value: InsightTopics.IA },
  { label: InsightTopics.MONETIZATION, value: InsightTopics.MONETIZATION },
  { label: InsightTopics.PSYCHOLOGY, value: InsightTopics.PSYCHOLOGY },
  { label: InsightTopics.TREND, value: InsightTopics.TREND },
];

export const insightTerritoryItems: IItems<InsightTerritory>[] = [
  { label: InsightTerritory.GENERAL, value: InsightTerritory.GENERAL },
  {
    label: InsightTerritory.BEAUTY_SKINCARE,
    value: InsightTerritory.BEAUTY_SKINCARE,
  },
  {
    label: InsightTerritory.COOKING_GASTRONOMY,
    value: InsightTerritory.COOKING_GASTRONOMY,
  },
  { label: InsightTerritory.EDUCATION, value: InsightTerritory.EDUCATION },
  {
    label: InsightTerritory.ENTERTAINMENT,
    value: InsightTerritory.ENTERTAINMENT,
  },
  { label: InsightTerritory.FINANCE, value: InsightTerritory.FINANCE },
  {
    label: InsightTerritory.GAMES_ESPORTS,
    value: InsightTerritory.GAMES_ESPORTS,
  },
  { label: InsightTerritory.HUMOR_MEMES, value: InsightTerritory.HUMOR_MEMES },
  { label: InsightTerritory.MARKETING, value: InsightTerritory.MARKETING },
  {
    label: InsightTerritory.FASHION_STYLE,
    value: InsightTerritory.FASHION_STYLE,
  },
  { label: InsightTerritory.TECNOLOGY, value: InsightTerritory.TECNOLOGY },
  { label: InsightTerritory.HEALTH, value: InsightTerritory.HEALTH },
];

export const insightFrequencyItems: IItems<InsightFrequency>[] = [
  { label: InsightFrequency.DAILY, value: InsightFrequency.DAILY },
  {
    label: InsightFrequency.THREE_DAY_PER_WEEK,
    value: InsightFrequency.THREE_DAY_PER_WEEK,
  },
  { label: InsightFrequency.WEEKLY, value: InsightFrequency.WEEKLY },
  { label: InsightFrequency.QUARTERLY, value: InsightFrequency.QUARTERLY },
];

export const insightHourItems: IItems<InsightHour>[] = [
  { label: InsightHour.SIX_AM, value: InsightHour.SIX_AM },
  { label: InsightHour.SEVEN_AM, value: InsightHour.SEVEN_AM },
  { label: InsightHour.EIGTH_AM, value: InsightHour.EIGTH_AM },
  { label: InsightHour.NINE_AM, value: InsightHour.NINE_AM },
  { label: InsightHour.TEN_AM, value: InsightHour.TEN_AM },
  { label: InsightHour.ELEVEN_AM, value: InsightHour.ELEVEN_AM },
  { label: InsightHour.TWELVE_AM, value: InsightHour.TWELVE_AM },
  { label: InsightHour.ONE_PM, value: InsightHour.ONE_PM },
  { label: InsightHour.TWO_PM, value: InsightHour.TWO_PM },
  { label: InsightHour.THREE_PM, value: InsightHour.THREE_PM },
  { label: InsightHour.FOUR_PM, value: InsightHour.FOUR_PM },
  { label: InsightHour.FIVE_PM, value: InsightHour.FIVE_PM },
  { label: InsightHour.SIX_PM, value: InsightHour.SIX_PM },
  { label: InsightHour.SEVEN_PM, value: InsightHour.SEVEN_PM },
  { label: InsightHour.EIGHT_PM, value: InsightHour.EIGHT_PM },
  { label: InsightHour.NINE_PM, value: InsightHour.NINE_PM },
  { label: InsightHour.TEN_PM, value: InsightHour.TEN_PM },
];
