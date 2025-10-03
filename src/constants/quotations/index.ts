import { ICreateInput } from "@/components/register/interfaces";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

export const createInputs: ICreateInput<ICreateQuotation>[] = [
  {
    name: "niche",
    label: "Nicho",
    placeholder: "Digite seu nicho",
    required: true,
  },
  {
    name: "engagementRate",
    label: "Taxa de Engajamento",
    placeholder: "Digite a sua taxa média de engajamento",
    type: "percentage",
    required: true,
  },
  {
    name: "instagramFollowers",
    label: "Número de Seguidores no Instagram",
    placeholder: "Digite seu número de seguidores no Instagram",
    type: "number",
    required: false,
  },
  {
    name: "tiktokFollowers",
    label: "Numero de Seguidores no TikTok",
    placeholder: "Digite seu número de seguidores no TikTok",
    type: "number",
    required: false,
  },
  {
    name: "youtubeSubscribers",
    label: "Numero de Inscritos no YouTube",
    placeholder: "Digite seu número de inscritos no YouTube",
    type: "number",
    required: false,
  },
  {
    name: "estimatedTiktokViews",
    label: "Visualizações em Média no TikTok",
    placeholder:
      "Digite quantos seus videos no TikTok costumam ter de visualização",
    type: "number",
    required: false,
  },
  {
    name: "includesImageRights",
    label: "Permitirá o Uso da sua Imagem na Campanha?",
    type: "checkbox",
    required: false,
  },
  {
    name: "includesBoostRights",
    label: "Permitirá que a Marca Impulsione o seu Conteúdo?",
    type: "checkbox",
    required: false,
  },
  {
    name: "includesEvent",
    label: "Participará de Algum Evento Presencial?",
    type: "checkbox",
    required: false,
  },
  {
    name: "includesReelsCombo",
    label: "Criará Reels/Stories para a Campanha?",
    type: "checkbox",
    required: false,
  },
  {
    name: "includesTiktokVideo",
    label: "Criará Vídeos para o TikTok?",
    type: "checkbox",
    required: false,
  },
];
