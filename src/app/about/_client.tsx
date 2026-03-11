"use client";

import { motion } from "motion/react";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Footer from "@/components/footer";

import { aboutItems } from "@/constants/about";

const Client = () => {
  const { Icon, title, description } = aboutItems.highlight;

  const items = aboutItems.items;

  const { title: footerTitle, description: footerDescription } =
    aboutItems.footerMessage;

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Fique por dentro das principais oportunidades, calcule valores, se atualize com informações adequadas para o seu perfil e aprenda com agentes de IA que evoluem com você (e para você)" />

        <motion.section
          className="flex flex-col gap-10 md:gap-6 p-6 border-2 border-secondary/30 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="flex flex-col gap-2 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            title={title}
          >
            <div className="flex justify-center sm:justify-start items-center gap-3">
              <Icon size={20} className="text-foreground" />
              <h2 className="font-title font-bold text-foreground text-base xs:text-2xl">
                {title}
              </h2>
            </div>
            <span className="text-foreground/60 text-xs xs:text-sm sm:text-base text-justify">
              {description}
            </span>
          </motion.div>

          <ul className="items-start gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2">
            {items.map(({ title, subtitle, description, list }, i) => (
              <motion.li
                key={`about-item-${title}-${description}-${i}`}
                className="flex flex-col gap-2 select-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                title={title}
              >
                <h3 className="font-title font-bold text-foreground text-center sm:text-start">
                  {title}
                </h3>

                <div className="flex flex-col gap-1">
                  {subtitle && (
                    <h4 className="font-title text-foreground text-sm sm:text-base text-center sm:text-start">
                      {subtitle}
                    </h4>
                  )}

                  {description && (
                    <span className="text-foreground/60 text-xs sm:text-sm text-justify">
                      {description}
                    </span>
                  )}

                  {list && (
                    <ul className="gap-3 grid grid-cols-2 mt-3">
                      {list.map(({ id, text, description }) => (
                        <li key={id} className="flex flex-col gap-1 text-sm">
                          <span className="font-bold">{text}</span>

                          <span className="text-foreground/70 text-xs">
                            {description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="flex flex-col gap-1 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="font-title font-bold text-foreground text-base">
              {footerTitle}
            </span>

            <span className="text-foreground/60 text-xs xs:text-sm sm:text-base text-justify">
              {footerDescription}
            </span>
          </motion.div>
        </motion.section>
      </Container>

      <Footer />
    </>
  );
};

export default Client;
