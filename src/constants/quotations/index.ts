import { ICreateInput } from "@/components/register/interfaces";

import { ICreateQuotation } from "@/contexts/quotations/interfaces";

export const createInputs: ICreateInput<ICreateQuotation>[] = [
  {
    name: "instagramFollowers",
    label: "Quantos Seguidores no Instagram?",
    placeholder: "Digite quantos seguidores Instagram você tem",
    type: "number",
    required: true,
  },
  {
    name: "tiktokFollowers",
    label: "Quantos Seguidores no TikTok?",
    placeholder: "Digite quantos seguidores TikTok você tem",
    type: "number",
    required: true,
  },
  {
    name: "youtubeSubscribers",
    label: "Quantos Inscritos no YouTube?",
    placeholder: "Digite quantos inscritos no YouTube você tem",
    type: "number",
    required: true,
  },
  {
    name: "engagementRate",
    label: "Taxa Média de Engajamento?",
    placeholder: "Digite a sua taxa média de engajamento",
    type: "number",
    required: true,
  },
  {
    name: "niche",
    label: "Qual o Nicho?",
    placeholder: "Digite seu nincho",
    required: true,
  },
  {
    name: "includesImageRights",
    label: "Permitirá Uso da sua Imagem na Campanha?",
    type: "checkbox",
    required: true,
  },
  {
    name: "includesBoostRights",
    label: "Permitirá que a Marca Impulsione o Conteúdo?",
    type: "checkbox",
    required: true,
  },
  {
    name: "includesEvent",
    label: "Participará de Algum Evento Presencial?",
    type: "checkbox",
    required: true,
  },
  {
    name: "includesReelsCombo",
    label: "Criará Reels/Stories para a campanha?",
    type: "checkbox",
    required: true,
  },
  {
    name: "includesTiktokVideo",
    label: "Criará Vídeo para o TikTok?",
    type: "checkbox",
    required: true,
  },
  {
    name: "estimatedTiktokViews",
    label: "Visualizações em Média no TikTok?",
    placeholder:
      "Digite quantos seus videos no TikTok costumam ter de visualização",
    type: "number",
    required: true,
  },
];
