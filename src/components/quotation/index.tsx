"use client";

import { IQuotation } from "@/contexts/quotations/interfaces";
import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utils";

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

  return (
    <li
      title={captalize(niche)}
      className="shadow-xl/30 mx-auto p-4 border-1 rounded-md max-w-2xl text-foreground select-none"
    >
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="md:[&>*:nth-child(even)]:justify-end md:[&>*:nth-child(odd)]:justify-start gap-y-2 grid grid-cols-1 md:grid-cols-2 text-xs">
          {youtubeSubscribers !== undefined && youtubeSubscribers !== null && (
            <p
              title={String(youtubeSubscribers)}
              className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
            >
              <span>
                <span className="font-bold">Quantos Inscritos no Youtube?</span>
                :
              </span>

              <span>{youtubeSubscribers}</span>
            </p>
          )}

          {instagramFollowers !== undefined && instagramFollowers !== null && (
            <p
              title={String(instagramFollowers)}
              className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
            >
              <span>
                <span className="font-bold">
                  Quantos Seguidores no Instagram?
                </span>
                :
              </span>

              <span>{instagramFollowers}</span>
            </p>
          )}

          {tiktokFollowers !== undefined && tiktokFollowers !== null && (
            <p
              title={String(tiktokFollowers)}
              className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
            >
              <span>
                <span className="font-bold">Quantos Seguidores no Tiktok?</span>
                :
              </span>

              <span>{tiktokFollowers}</span>
            </p>
          )}

          {estimatedTiktokViews !== undefined &&
            estimatedTiktokViews !== null && (
              <p
                title={String(estimatedTiktokViews)}
                className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
              >
                <span>
                  <span className="font-bold">
                    Média de Visualizações no Tiktok
                  </span>
                  :
                </span>

                <span>{estimatedTiktokViews}</span>
              </p>
            )}

          <p
            title={includesTiktokVideo ? "Sim" : "Não"}
            className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
          >
            <span>
              <span className="font-bold">Criará Vídeo para o TikTok?</span>:
            </span>

            <span>{includesTiktokVideo ? "Sim" : "Não"}</span>
          </p>

          <p
            title={includesReelsCombo ? "Sim" : "Não"}
            className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
          >
            <span>
              <span className="font-bold">
                Criará Reels/Stories para a campanha?
              </span>
              :
            </span>

            <span>{includesReelsCombo ? "Sim" : "Não"}</span>
          </p>

          <p
            title={includesBoostRights ? "Sim" : "Não"}
            className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
          >
            <span>
              <span className="font-bold">
                Permitir que a marca impulsione o conteúdo?
              </span>
              :
            </span>

            <span>{includesBoostRights ? "Sim" : "Não"}</span>
          </p>

          <p
            title={includesImageRights ? "Sim" : "Não"}
            className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
          >
            <span>
              <span className="font-bold">
                Permitir Uso da Imagem na Campanha?
              </span>
              :
            </span>

            <span>{includesImageRights ? "Sim" : "Não"}</span>
          </p>

          <p
            title={includesEvent ? "Sim" : "Não"}
            className="flex md:flex-row flex-col md:flex-wrap gap-x-1"
          >
            <span>
              <span className="font-bold">
                Participará de Algum Evento Presencial?
              </span>
              :
            </span>

            <span>{includesEvent ? "Sim" : "Não"}</span>
          </p>
        </div>

        <article
          title={captalize(openAiResponse)}
          className="w-fit max-w-full text-primary text-sm text-justify break-words whitespace-pre-line"
        >
          {captalize(openAiResponse)}
        </article>

        <div className="md:items-center gap-3 md:gap-5 grid grid-cols-1 md:grid-cols-3 text-xs">
          <p title={captalize(niche)} className="flex flex-col md:items-start">
            <span>
              <span className="font-bold">Nicho</span>:
            </span>

            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {captalize(niche)}
            </span>
          </p>

          <p
            title={`${(engagementRate * 100).toFixed(2).replace(".", ",")} %`}
            className="flex flex-col md:items-center"
          >
            <span>
              <span className="font-bold">Taxa média de engajamento</span>:
            </span>

            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {`${(engagementRate * 100).toFixed(2).replace(".", ",")} %`}
            </span>
          </p>

          <p
            title={`Criado em ${formatDate(new Date(createdAt), { getHours: true, getMinutes: true })}`}
            className="flex flex-col md:items-end text-[11px]"
          >
            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="font-bold">Criado em</span>:
            </span>

            {formatDate(new Date(createdAt), {
              getHours: true,
              getMinutes: true,
            })}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Quotation;
