"use client";

import { motion } from "motion/react";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import Footer from "@/components/footer";

import { aboutItems } from "@/constants/about";

const Client = () => {
  const { Icon, title, description } = aboutItems.highlight;

  const items = aboutItems.items;

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
              <h2 className="font-title font-bold text-foreground text-md xs:text-2xl">
                {title}
              </h2>
            </div>
            <span className="text-foreground/60 sm:text-md text-xs xs:text-sm text-justify">
              {description}
            </span>
          </motion.div>

          <ul className="items-start gap-6 md:gap-10 grid grid-cols-1 md:grid-cols-2">
            {items.map(({ title, description }, i) => (
              <motion.li
                key={`about-item-${title}-${description}-${i}`}
                className="flex flex-col gap-5 select-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                title={title}
              >
                <h3 className="font-title font-bold text-foreground sm:text-md text-center sm:text-start">
                  {title}
                </h3>
                <span className="text-foreground/60 text-xs sm:text-sm text-justify">
                  {description}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </Container>

      <Footer />
    </>
  );
};

export default Client;
