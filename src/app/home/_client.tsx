"use client";

import Image from "next/image";

import Container from "@/components/container";

import { homeExampleMentals } from "@/constants/mentals";
import { cards } from "@/constants/home";

const Client = () => {
  return (
    <Container Tag="main" className="flex flex-col gap-20">
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
          Uma nova interface para creators baseada em IA. Educação, comunidade,
          monetização e ferramentas em um só lugar.
        </p>
      </section>

      <div className="flex flex-col gap-16 md:mb-16">
        <section className="px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 font-bold text-2xl text-center">
              Nossa Essência
            </h2>

            <ul className="gap-6 grid grid-cols-1 md:grid-cols-3">
              {cards.map(({ description, Icon, title }, i) => (
                <li
                  key={`${i}-${title}-${description}`}
                  className="flex flex-col items-center gap-5 bg-gray-3 shadow p-6 rounded text-center"
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
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="mb-10 font-bold text-2xl">Conheça os Mentals</h2>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-4">
              {homeExampleMentals.map(
                ({ name, description, background }, i) => (
                  <div
                    key={`${i}-${name}-${description}-${background}`}
                    className={`p-6 shadow rounded ${background}`}
                  >
                    <h3
                      title={name}
                      className="font-semibold text-xl capitalize"
                    >
                      {name}
                    </h3>

                    <p title={description}>{description}</p>
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
