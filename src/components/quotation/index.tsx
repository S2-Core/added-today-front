"use client";

import ReactMarkdown from "react-markdown";
import {
  FaCheckSquare,
  FaInstagram,
  FaRegClock,
  FaStar,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utils";

import { IQuotation } from "@/contexts/quotations/interfaces";
import { TbTargetArrow } from "react-icons/tb";
import { PiEyesFill } from "react-icons/pi";

interface IProps {
  quotation: IQuotation;
}

const Quotation = ({ quotation }: IProps) => {
  const { createdAt, data, openAiResponse } = quotation;
  let {
    niche,
    includesEvent,
    engagementRate,
    tiktokFollowers,
    includesReelsCombo,
    instagramFollowers,
    youtubeSubscribers,
    includesBoostRights,
    includesImageRights,
    includesTiktokVideo,
    estimatedTiktokViews,
  } = data;

  const renderBadge = (label: string, title: string, value?: boolean) => (
    <div
      title={`${title}: ${value ? "Sim" : "Não"}`}
      className={`flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-medium shadow-md ${value ? "bg-success/30 text-success" : "bg-error/20 text-error"}`}
    >
      {value ? <FaCheckSquare size={15} /> : <IoClose size={18} />}

      {label}
    </div>
  );

  return (
    <li
      title={`Nicho: ${captalize(niche)}`}
      className="bg-light shadow-lg mx-auto p-6 border rounded-2xl max-w-2xl text-foreground select-none"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="flex items-center gap-2 font-bold text-lg">
          <FaStar className="text-warning" />

          {captalize(niche)}
        </h2>

        <span
          title={`Criado em: ${formatDate(new Date(createdAt), { getHours: true, getMinutes: true })}`}
          className="flex items-center gap-2 text-gray-8 text-xs"
        >
          <FaRegClock />

          {formatDate(new Date(createdAt), {
            getHours: true,
            getMinutes: true,
          })}
        </span>
      </div>

      <div className="gap-3 grid grid-cols-2 mb-6">
        {youtubeSubscribers !== undefined && (
          <div
            title={`Inscritos do YouTube: ${youtubeSubscribers}`}
            className="flex sm:flex-row flex-col justify-center items-center gap-1 bg-gray-1 px-3 py-2 rounded-lg text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 text-sm sm:text-sm">
              <FaYoutube className="text-error" />

              <strong>
                YouTube<span className="font-normal">:</span>
              </strong>
            </div>

            {`${youtubeSubscribers} inscritos`}
          </div>
        )}

        {instagramFollowers !== undefined && (
          <div
            title={`Seguidores do Instagram: ${instagramFollowers}`}
            className="flex sm:flex-row flex-col justify-center items-center gap-1 bg-gray-1 px-3 py-2 rounded-lg text-[10px] sm:text-sm"
          >
            <div className="flex items-center gap-2 text-sm sm:text-sm">
              <FaInstagram />

              <strong>
                Instagram<span className="font-normal">:</span>
              </strong>
            </div>

            {`${instagramFollowers} seguidores`}
          </div>
        )}

        {tiktokFollowers !== undefined && (
          <div
            title={`Seguidores do TikTok: ${tiktokFollowers}`}
            className="flex sm:flex-row flex-col justify-center items-center gap-1 bg-gray-1 px-3 py-2 rounded-lg text-[10px] sm:text-sm"
          >
            <div className="flex items-center gap-2 text-sm sm:text-sm">
              <FaTiktok />

              <strong>
                TikTok<span className="font-normal">:</span>
              </strong>
            </div>

            {`${tiktokFollowers} seguidores`}
          </div>
        )}

        {estimatedTiktokViews !== undefined && (
          <div
            title={`Visualizações em média no TikTok: ${estimatedTiktokViews}`}
            className="flex sm:flex-row flex-col justify-center items-center gap-1 bg-gray-1 px-3 py-2 rounded-lg text-[10px] sm:text-sm"
          >
            <div className="flex items-center gap-2 text-[9px] sm:text-sm">
              <PiEyesFill />

              <strong>
                TikTok Views<span className="font-normal">:</span>
              </strong>
            </div>

            {`${estimatedTiktokViews} visualizações`}
          </div>
        )}

        <div
          title={`Taxa de Engajamento: ${(engagementRate * 100).toFixed(2).replace(".", ",")}%`}
          className="flex justify-center items-center gap-1 col-span-2 bg-gray-1 px-3 py-2 rounded-lg text-xs sm:text-sm"
        >
          <span className="flex items-center gap-2">
            <TbTargetArrow size={18} />

            <strong>
              Engajamento<span className="font-normal">:</span>
            </strong>
          </span>
          {(engagementRate * 100).toFixed(2).replace(".", ",")}%
        </div>
      </div>

      <div className="flex sm:flex-row flex-col sm:flex-wrap gap-4 sm:gap-2 mb-6">
        {renderBadge(
          "Vídeo TikTok",
          "Criará vídeos para o TikTok",
          includesTiktokVideo
        )}

        {renderBadge(
          "Reels/Stories",
          "Criará Reels/Stories para a campanha",
          includesReelsCombo
        )}

        {renderBadge(
          "Impulsionar Conteúdo",
          "Permitirá que a marca impulsione o conteúdo",
          includesBoostRights
        )}

        {renderBadge(
          "Uso da Imagem",
          "Permitirá uso da sua imagem na campanha",
          includesImageRights
        )}

        {renderBadge(
          "Evento Presencial",
          "Participará de algum evento presencial",
          includesEvent
        )}
      </div>

      <article className="text-sm leading-relaxed whitespace-pre-line select-text prose">
        <ReactMarkdown>{captalize(openAiResponse)}</ReactMarkdown>
      </article>
    </li>
  );
};

export default Quotation;
