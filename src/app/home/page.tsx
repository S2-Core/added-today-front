"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaBolt, FaUsers, FaBrain } from "react-icons/fa";

import Container from "@/components/container";

import { homeExampleMentals } from "@/constants/mentals";

const Home = () => {
  return (
    <Container Tag="main" className="flex flex-col gap-20">
      <section className="flex flex-col gap-5 px-6 text-center">
        <figure className="relative mx-auto w-full max-w-100 h-30 overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Logo"
            fill
            className="mx-auto object-cover"
          />
          <figcaption className="hidden w-full">Logo</figcaption>
        </figure>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-extrabold text-4xl md:text-5xl leading-tight"
        >
          Conecte. Crie. Conquiste.
        </motion.h1>

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

            <ul className="gap-6 grid grid-cols-1 md:grid-cols-3 text-center">
              <li className="bg-gray-3 shadow p-6 rounded">
                <FaUsers size={32} className="mx-auto mb-3 text-primary" />

                <h3 className="mb-2 font-semibold text-lg">
                  Comunidade com Propósito
                </h3>

                <p>
                  Rede para quem está sozinho, criando conexão e suporte real
                  entre creators.
                </p>
              </li>

              <li className="bg-gray-3 shadow p-6 rounded">
                <FaBolt size={32} className="mx-auto mb-3 text-primary" />

                <h3 className="mb-2 font-semibold text-lg">
                  Tecnologia Acessível
                </h3>

                <p>
                  IA integrada para auxiliar com ideias, tempo e produção de
                  conteúdo.
                </p>
              </li>

              <li className="bg-gray-3 shadow p-6 rounded">
                <FaBrain size={32} className="mx-auto mb-3 text-primary" />

                <h3 className="mb-2 font-semibold text-lg">
                  Aprendizado com Mentores Digitais
                </h3>

                <p>
                  Mentals com personalidade própria que guiam o criador em
                  jornadas temáticas.
                </p>
              </li>
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
                    <h3 className="font-semibold text-xl capitalize">{name}</h3>

                    <p>{description}</p>
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

export default Home;
