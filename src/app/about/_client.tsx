"use client";

import { motion } from "motion/react";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Footer from "@/components/footer";

import { aboutItems } from "@/constants/about";

const Client = () => {
  const { title, description } = aboutItems.highlight;

  const items = aboutItems.items;

  const { title: footerTitle, description: footerDescription } =
    aboutItems.footerMessage;

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Fique por dentro das principais oportunidades, calcule valores, se atualize com informações adequadas para o seu perfil e aprenda com agentes de IA que evoluem com você (e para você)" />

        <motion.section
          className="flex flex-col gap-10 p-6 border-2 border-secondary/30 rounded-xl"
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
            <h2 className="font-title font-bold text-foreground text-xl md:text-3xl text-center md:text-start">
              {title}
            </h2>

            <span className="text-foreground/70 text-sm md:text-lg md:text-justify">
              {description}
            </span>
          </motion.div>

          <ul className="items-start gap-10 grid grid-cols-1">
            {items.map(
              ({ Icon, iconColor, title, subtitle, description, list }, i) => (
                <motion.li
                  key={`about-item-${title}-${description}-${i}`}
                  className="flex flex-col gap-1 select-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  title={title}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          size={25}
                          className={`min-w-6.25 min-h-6.25 ${iconColor ? `text-success/70` : ""}`}
                        />
                      )}

                      <h3 className="font-title font-bold text-foreground text-base md:text-lg whitespace-nowrap">
                        {title}
                      </h3>
                    </div>

                    <div className="hidden md:block bg-primary/20 w-full h-0.5" />
                  </div>

                  <div className="flex flex-col">
                    {subtitle && (
                      <h4 className="mt-1 font-title text-foreground text-sm md:text-base">
                        {subtitle}
                      </h4>
                    )}

                    {description && (
                      <span className="mt-1 text-foreground/70 text-sm md:text-base md:text-justify">
                        {description}
                      </span>
                    )}

                    {list && (
                      <ul className="gap-5 grid grid-cols-1 md:grid-cols-2 mt-5">
                        {list.map(({ id, Icon, text, description }) => (
                          <li
                            key={id}
                            className="flex flex-col gap-2 p-2 md:p-4 border border-primary/30 rounded-xl"
                          >
                            <div className="flex items-center gap-2">
                              {Icon && (
                                <Icon
                                  size={25}
                                  className="hidden md:block text-primary"
                                />
                              )}

                              <span className="font-bold text-xs sm:text-sm md:text-base">
                                {text}
                              </span>
                            </div>

                            <span className="text-foreground/70 text-xs md:text-sm">
                              {description}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.li>
              ),
            )}
          </ul>

          <motion.div
            className="flex flex-col gap-2 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="font-title font-bold text-foreground text-base md:text-lg">
              {footerTitle}
            </span>

            <span className="text-foreground/70 text-sm md:text-base text-justify">
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
