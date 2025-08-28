"use client";

import Image from "next/image";

import Container from "@/components/container";

import { homeExampleMentals } from "@/constants/mentals";
import { cards } from "@/constants/home";
import { IoIosLock } from "react-icons/io";

import { captalize } from "@/utils/string.utils";

const Client = () => {
  return (
    <Container Tag="main" className="flex flex-col gap-20 max-w-5xl">
      <section className="flex flex-col gap-5 px-6 text-center">
        <figure className="relative mx-auto w-full max-w-100 h-30 overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="mx-auto object-cover"
          />
          <figcaption className="hidden w-full">Logo</figcaption>
        </figure>

        <h1 className="font-extrabold text-4xl md:text-5xl leading-tight">
          Conecte. Crie. Conquiste.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl">
          Uma nova interface para creators totalmente baseada em IA - uma
          infraestrutura completa que concentra, em um único lugar, capacitação,
          profissionalização e oportunidades de monetização.
        </p>
      </section>

      <div className="flex flex-col gap-20 md:mb-16">
        <section className="px-6">
          <div className="flex flex-col gap-6 mx-auto max-w-5xl">
            <h2 className="font-bold text-2xl text-center">Nossa Essência</h2>

            <ul className="gap-6 grid grid-cols-1 md:grid-cols-3">
              {cards.map(({ description, Icon, title }, i) => (
                <li
                  key={`${i}-${title}-${description}`}
                  className="flex flex-col items-center gap-5 bg-gray-3/50 shadow-lg backdrop-blur p-6 rounded text-center"
                >
                  <Icon size={32} className="mx-auto mb-3 text-primary" />

                  <div>
                    <h3 title={title} className="mb-2 font-semibold text-lg">
                      {title}
                    </h3>

                    <p title={description}>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6">
          <div className="flex md:flex-row flex-col md:justify-between items-center gap-10 md:gap-20">
            <div className="flex flex-col gap-4 md:text-left text-center">
              <h2 className="font-bold text-primary text-xl">
                Conheça os mentals
              </h2>

              <p className="w-full max-w-md text-foreground">
                Com personalidade própria, história e missão, os mentals são
                agentes de IA que ajudam o criador de conteúdo em cada etapa de
                sua jornada de aprendizado e desenvolvimento
              </p>
            </div>

            <div className="flex flex-col gap-6 pl-4 md:pl-0 w-full md:w-fit select-none">
              {homeExampleMentals.map(
                ({ name, description, image, locked }, i) => (
                  <div
                    key={`${i}-${name}-${description}`}
                    className="relative flex items-center gap-4 shadow-md py-4 border-1 border-foreground rounded-full w-full md:w-[19.5rem]"
                  >
                    <div className="top-1/2 left-6 absolute flex flex-shrink-0 justify-center items-center bg-dark border-1 rounded-full w-20 h-20 overflow-hidden -translate-1/2">
                      <Image
                        src={image}
                        alt={name ? captalize(name) : "Desbloqueado em breve"}
                        fill
                        className="mt-8 object-cover scale-200"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {locked && (
                        <div className="top-0 left-0 absolute flex justify-center items-center bg-dark/30 w-full h-full">
                          <IoIosLock size={28} className="text-light" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 mr-8 ml-20 text-left">
                      <h3 className="font-semibold text-primary text-sm">
                        {name ? captalize(name) : "Desbloqueado em breve"}
                      </h3>

                      <p className="text-foreground text-xs">{description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Client;
