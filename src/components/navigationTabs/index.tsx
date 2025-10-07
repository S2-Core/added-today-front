"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { IoChevronDown } from "react-icons/io5";

import { useAuth } from "@/contexts";
import { routeLinks } from "@/constants/routes";

const tabs = routeLinks.filter(({ hide }) => !hide);

interface IProps {
  title?: string;
  subTitle?: string;
}

const NavigationTabs = ({
  title = "Bem-vindo à sua central de crescimento",
  subTitle = "Descubra oportunidades, calcule valores e aprenda com mentores de IA que evoluem com você.",
}: IProps) => {
  const { isNavigationTabsLoaded, setIsNavigationTabsLoaded } = useAuth();

  const [pathname, navigation] = [usePathname(), useRouter()];
  const [isOpen, setIsOpen] = useState(false);

  const ulRef = useRef<HTMLUListElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentTab = tabs.find((tab) => tab.href === pathname);

  useEffect(() => {
    const handleCloseDropdown = (event: MouseEvent | KeyboardEvent) => {
      if (
        event instanceof MouseEvent &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleCloseDropdown);
      document.addEventListener("keydown", handleCloseDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
      document.removeEventListener("keydown", handleCloseDropdown);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-6">
      <motion.section
        className="flex flex-col gap-2 select-none"
        initial={
          isNavigationTabsLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          isNavigationTabsLoaded
            ? { duration: 0 }
            : { duration: 0.6, ease: "easeOut" }
        }
        onAnimationComplete={() => setIsNavigationTabsLoaded(true)}
      >
        <motion.h1
          className="font-title font-bold text-foreground text-3xl md:text-4xl text-center sm:text-start"
          initial={
            isNavigationTabsLoaded
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          animate={{ opacity: 1, scale: 1 }}
          transition={
            isNavigationTabsLoaded
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.2 }
          }
        >
          {title}
        </motion.h1>

        <motion.span
          className="text-foreground/60 text-lg text-center sm:text-start"
          initial={
            isNavigationTabsLoaded
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            isNavigationTabsLoaded
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.3 }
          }
        >
          {subTitle}
        </motion.span>
      </motion.section>

      <motion.nav
        title="Navegação principal"
        className="flex bg-secondary/20 p-1 rounded-md w-full"
        initial={
          isNavigationTabsLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          isNavigationTabsLoaded
            ? { duration: 0 }
            : { duration: 0.5, ease: "easeOut" }
        }
      >
        <div ref={dropdownRef} className="lg:hidden relative w-full">
          <motion.button
            className="flex justify-between items-center bg-secondary/10 px-4 py-2 rounded-md outline-none w-full font-bold text-foreground cursor-pointer select-none"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span>{currentTab?.title || "Selecione uma opção"}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <IoChevronDown className="w-5 h-5 text-secondary" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                className="z-10 absolute bg-secondary/10 shadow-md backdrop-blur-lg mt-2 border-2 border-secondary/30 rounded-lg w-full overflow-hidden"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {tabs.map(({ href, title }) => {
                  const isActive = pathname === href;
                  return (
                    <motion.li
                      key={href}
                      whileHover={{
                        backgroundColor: "var(--light)",
                        background: 0.5,
                      }}
                      onClick={() => {
                        navigation.push(href);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 font-bold cursor-pointer ${
                        isActive
                          ? "text-primary bg-secondary/30"
                          : "text-foreground"
                      }`}
                    >
                      {title}
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <motion.ul
          ref={ulRef}
          role="tablist"
          className="hidden lg:flex items-center gap-2 rounded-md w-full scrollbar-custom"
          style={{ overflow: "hidden" }}
          onAnimationComplete={() => {
            if (ulRef.current) ulRef.current.style.overflowX = "auto";
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: isNavigationTabsLoaded
                ? {}
                : { staggerChildren: 0.1 },
            },
          }}
        >
          {tabs.map(({ href, Icon, description, title }) => {
            const isActive = pathname === href;
            return (
              <motion.li
                key={href}
                title={isActive ? "Você está aqui!" : description}
                role="presentation"
                className="w-full"
                variants={{
                  hidden: isNavigationTabsLoaded
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={
                  isNavigationTabsLoaded
                    ? { duration: 0 }
                    : { duration: 0.4, ease: "easeOut" }
                }
              >
                <Link
                  href={href}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={-1}
                  className={`w-full font-bold px-8 justify-center flex gap-2 py-1.5 text-sm rounded-md transition-all duration-300
                    ${
                      isActive
                        ? "bg-light text-foreground shadow-sm cursor-default"
                        : "text-secondary hover:text-primary hover:bg-secondary/30 cursor-pointer"
                    }`}
                  onClick={(e) => {
                    if (isActive) e.preventDefault();
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{title}</span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.nav>
    </div>
  );
};

export default NavigationTabs;
