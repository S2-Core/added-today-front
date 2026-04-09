export enum EventType {
  CONTENT = "Conteúdo",
  EARNING = "Ganho",
  CAMPAIGN = "Campanha",
}

export enum ContentType {
  REELS = "reels",
  STORY = "stories",
  POST = "posts",
  VIDEO = "vídeos",
  LIVE = "lives",
}

export enum ContentPlatform {
  INSTAGRAM = "Instagram",
  TIKTOK = "Tiktok",
  YOUTUBE = "Youtube",
  LINKEDIN = "Linkedin",
  OTHER = "Outro",
}

export enum ContentStatus {
  IDEA = "Ideia",
  TO_POST = "A postar",
  POSTED = "Postado",
}

export enum CampaignStatus {
  PLANNED = "Planejado",
  IN_PROGRESS = "Em andamento",
  COMPLETED = "Concluído",
  CANCELED = "Cancelado",
}

export enum EarningStatus {
  EXPECTED = "Esperado",
  RECEIVED = "Recebido",
  CANCELED = "Cancelado",
}

export enum EarningType {
  PUBLI = "Publi",
  ADS_PLATFORM = "Anúncio na plataforma",
}
