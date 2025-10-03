"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosLock } from "react-icons/io";
import { motion } from "motion/react";
import { FaArrowDown } from "react-icons/fa";

import Container from "@/components/container";
import Footer from "@/components/footer";

import { captalize } from "@/utils/string.utils";

import { cards, dashboardExampleMentals } from "@/constants/dashboard";
import { siteName } from "@/constants/metadata";

const Client = () => {
  return (
    <>
      <Container Tag="main" className="flex flex-col gap-20 max-w-5xl">
        <section className="flex flex-col gap-10 mt-10 sm:mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center items-center gap-2"
          >
            <motion.h1 className="font-logo font-bold text-primary text-5xl md:text-8xl select-none">
              {siteName}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              className="bg-primary rounded w-15 h-1 origin-left"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-extrabold text-3xl md:text-4xl leading-tight select-none"
          >
            IA para monetizar e crescer como criador
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-lg md:text-xl select-none"
          >
            Da ideia ao contrato: a added transforma sua criação em negócio, com
            IA que mostra oportunidades, precifica seu conteúdo e te acompanha
            na jornada.
          </motion.p>
        </section>

        <div className="flex flex-col gap-20 md:mb-16">
          <section>
            <div className="flex flex-col gap-6 mx-auto max-w-5xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-bold text-2xl text-center select-none"
              >
                O que a added faz por você
              </motion.h2>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.2 },
                  },
                }}
                className="gap-6 grid grid-cols-1 md:grid-cols-2 select-none"
              >
                {cards.map(({ description, Icon, title, href }, i) => (
                  <motion.li
                    key={`${i}-${title}-${description}-${href}`}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    title={`Ir para "${title}"`}
                    className="relative flex flex-col items-center gap-5 bg-gray-3/50 shadow-lg backdrop-blur rounded text-center cursor-pointer card-glow"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();

                      e.currentTarget.style.setProperty(
                        "--x",
                        `${e.clientX - rect.left}px`
                      );

                      e.currentTarget.style.setProperty(
                        "--y",
                        `${e.clientY - rect.top}px`
                      );
                    }}
                  >
                    <FaArrowDown className="top-5 right-5 absolute text-primary text-xl rotate-45 animate-bounce" />

                    <Link
                      href={href}
                      tabIndex={-1}
                      className="flex flex-col items-center p-6 rounded w-full h-full hover:scale-95 active:scale-90 transition-all duration-300 0"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          delay: 0.2,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <Icon size={32} className="mx-auto mb-3 text-primary" />
                      </motion.div>

                      <div className="flex sm:flex-row flex-col justify-center items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{title}</h3>
                      </div>

                      <p>{description}</p>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </section>

          <section>
            <div className="flex md:flex-row flex-col md:justify-between items-center gap-10 md:gap-15">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-4 md:text-left text-center"
              >
                <h2 className="font-bold text-primary text-xl select-none">
                  Conheça os mentals
                </h2>

                <p className="md:max-w-full max-w-xl text-foreground text-center md:text-justify select-none">
                  Com personalidade própria, história e missão, os mentals são
                  agentes de IA que ajudam o criador de conteúdo em cada etapa
                  de sua jornada de aprendizado e desenvolvimento
                </p>
              </motion.div>

              <div className="flex flex-col items-center gap-6 mb-20 md:mb-0 pl-4 md:pl-0 w-full md:w-fit select-none">
                {dashboardExampleMentals.map(
                  ({ name, description, image, locked }, i) => (
                    <motion.div
                      key={`${i}-${name}-${description}`}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                      className="relative flex items-center gap-4 shadow-md py-4 border-1 border-foreground rounded-full w-full md:w-sm max-w-[28.5rem] md:max-w-full"
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
                          <div className="top-0 left-0 absolute flex justify-center items-center bg-dark/60 w-full h-full">
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
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default Client;
