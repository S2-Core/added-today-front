"use client";

import { IInsight } from "@/contexts/insights/interfaces";
import { formatDate } from "@/utils/date.utils";

import { captalize } from "@/utils/string.utils";
import { FaRegClock } from "react-icons/fa";
import { IoFileTrayFull, IoPricetagsOutline } from "react-icons/io5";

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
      title={title}
      className="flex flex-col gap-6 bg-light shadow-lg p-6 border border-gray-3 rounded-2xl text-foreground"
    >
      <h2 className="font-bold text-primary text-2xl text-center select-none">
        {captalize(title)}
      </h2>

      <div className="flex flex-col gap-5 bg-gray-1 p-4 rounded-xl">
        <div className="flex flex-col gap-1">
          <h3 className="flex items-center gap-2 font-semibold text-xl select-none">
            📖 Resumo
          </h3>

          <article className="text-md text-justify indent-5 leading-relaxed">
            {captalize(summary)}
          </article>
        </div>

        <div className="flex flex-col gap-4">
          <p
            title={`Fonte: ${captalize(source)}`}
            className="text-xs text-justify"
          >
            <span className="font-bold select-none">Fonte:</span>

            <span className="ml-2 italic">{captalize(source)}</span>
          </p>

          <div className="flex sm:flex-row flex-col sm:flex-wrap gap-1 mt-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                title={tag}
                className="bg-secondary/10 px-2 py-[2px] rounded-full text-secondary text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-primary/5 p-4 rounded-xl text-primary">
        <h3 className="flex items-center gap-2 font-bold text-xl select-none">
          💡 Dica
        </h3>

        <article className="text-md text-justify indent-5">
          {captalize(tip)}
        </article>
      </div>

      <div className="flex flex-col gap-1 bg-gray-1 p-4 rounded-xl">
        <h3 className="flex items-center gap-2 font-semibold text-md select-none">
          📝 Ideias de conteúdo
        </h3>

        <ul className="flex flex-col gap-2 pl-8 text-gray-8 text-sm text-justify italic list-disc">
          {contentIdeas.map((idea, i) => (
            <li
              key={`${i}-${idea}`}
              title={`Ideia: ${idea.charAt(idea.length - 1) === "." ? idea : `${idea}.`}`}
            >
              {idea.charAt(idea.length - 1) === "." ? idea : `${idea}.`}
            </li>
          ))}
        </ul>
      </div>

      <div className="gap-5 grid grid-cols-1 sm:grid-cols-3 text-gray-7 text-xs select-none">
        <p
          title={`Criado em: ${formatDate(new Date(sentAt), { getHours: true, getMinutes: true })}`}
          className="flex md:flex-row justify-center items-center gap-2 text-center"
        >
          <FaRegClock className="text-tertiary" />

          {formatDate(new Date(sentAt), { getHours: true, getMinutes: true })}
        </p>

        <p
          title={`Área: ${captalize(territory)}`}
          className="flex md:flex-row justify-center items-center gap-2 text-center"
        >
          <IoFileTrayFull className="text-tertiary" />

          {captalize(territory)}
        </p>

        <p
          title={`Nicho: ${captalize(topic)}`}
          className="flex md:flex-row justify-center items-center gap-3 text-center"
        >
          <IoPricetagsOutline className="text-tertiary" />

          {captalize(topic)}
        </p>
      </div>
    </li>
  );
};

export default Insight;
