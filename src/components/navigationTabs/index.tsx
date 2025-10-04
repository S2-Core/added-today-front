"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { routeLinks } from "@/constants/routes";

const tabs = routeLinks.filter(({ hide }) => !hide);

const NavigationTabs = () => {
  const pathname = usePathname();
  const ulRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <motion.section
        className="flex flex-col gap-2 select-none"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="font-title font-bold text-foreground text-3xl sm:text-4xl text-center sm:text-start"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bem-vindo ao seu painel
        </motion.h1>

        <motion.span
          className="text-foreground/60 text-lg text-center sm:text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Descubra oportunidades, calcule preços justos e conecte-se com
          mentores especializados.
        </motion.span>
      </motion.section>

      <motion.nav
        aria-label="Navegação principal"
        className="flex bg-secondary/20 p-1 rounded-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.ul
          ref={ulRef}
          role="tablist"
          className="flex items-center gap-2 rounded-md w-full scrollbar-custom"
          style={{ overflow: "hidden" }}
          onAnimationComplete={() => {
            if (ulRef.current) {
              ulRef.current.style.overflowX = "auto";
            }
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {tabs.map(({ href, Icon, description, title }) => {
            const isActive = pathname === href;

            return (
              <motion.li
                key={href}
                title={description}
                role="presentation"
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div transition={{ duration: 0.2 }}>
                  <Link
                    href={href}
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={-1}
                    className={`w-full font-bold px-8 justify-center flex gap-2 py-1.5 text-sm rounded-md transition-all duration-300
                    ${
                      isActive
                        ? "bg-light text-foreground shadow-sm"
                        : "text-secondary hover:text-primary hover:bg-secondary/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{title}</span>
                  </Link>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default NavigationTabs;
