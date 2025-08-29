"use client";

import { IInsight } from "@/contexts/insights/interfaces";
import { formatDate } from "@/utils/date.utils";

import { captalize } from "@/utils/string.utils";

interface IProps {
  insight: IInsight;
}

const Insight = ({ insight }: IProps) => {
  const {
    title,
    summary,
    tip,
    topic,
    territory,
    sentAt,
    contentIdeas,
    hashtags,
    source,
  } = insight;

  return (
    <li
      title={captalize(title)}
      className="flex flex-col gap-6 shadow-xl/30 p-4 border-1 rounded-2xl text-foreground select-none"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-md text-center">{captalize(title)}</p>

          <article className="text-xs text-justify indent-5">
            {captalize(summary)}
          </article>

          <div className="text-xs">
            <span className="font-bold">Fonte:</span>

            <article className="text-justify">{captalize(source)}</article>
          </div>

          <p className="text-[11px]">{hashtags.join(", ")}</p>
        </div>

        <div className="bg-foreground w-full h-[1px]" />

        <div className="flex flex-col gap-3 text-primary">
          <div className="text-sm">
            <h3 className="font-bold">Dica:</h3>

            <article className="text-justify indent-5">
              {captalize(tip)}
            </article>
          </div>

          <div className="text-[13px] text-gray-8">
            <p className="underline">Ideias de conteúdo:</p>

            <ul className="pl-5 italic list-disc">
              {contentIdeas.map((idea, i) => (
                <li key={`${i}-${idea}`}>{idea}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:items-center gap-y-2 md:grid md:grid-cols-3 text-xs">
        <p
          title={`Eviado em ${formatDate(new Date(sentAt), { getHours: true, getMinutes: true })}`}
          className="flex md:justify-start gap-x-1 text-[11px]"
        >
          <span>
            <span className="font-bold">Enviado</span>:
          </span>

          {formatDate(new Date(sentAt), { getHours: true, getMinutes: true })}
        </p>

        <p
          title={captalize(territory)}
          className="flex md:justify-center gap-x-1"
        >
          <span>
            <span className="font-bold">Área</span>:
          </span>

          <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {captalize(territory)}
          </span>
        </p>

        <p title={captalize(topic)} className="flex md:justify-end gap-x-1">
          <span>
            <span className="font-bold">Nicho</span>:
          </span>

          <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {captalize(topic)}
          </span>
        </p>
      </div>
    </li>
  );
};

export default Insight;
