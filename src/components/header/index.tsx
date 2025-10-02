"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

import { useAuth } from "@/contexts";

import { noAuthRoutes, routeLinks } from "@/constants/routes";
import { siteName } from "@/constants/metadata";

const Header = () => {
  const [page, navigate] = [usePathname() || "/", useRouter()];

  const { handleLogout, headerRoutes } = useAuth();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEvents = (e: MouseEvent | KeyboardEvent) => {
      if (
        e.type === "mousedown" &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      )
        setOpen(false);

      if (e.type === "keydown" && (e as KeyboardEvent).key === "Escape")
        setOpen(false);
    };

    document.addEventListener("mousedown", handleEvents);
    document.addEventListener("keydown", handleEvents);

    return () => {
      document.removeEventListener("mousedown", handleEvents);
      document.removeEventListener("keydown", handleEvents);
    };
  }, []);

  if (
    noAuthRoutes.includes(page) ||
    !routeLinks.map(({ href }) => href).includes(page)
  )
    return null;

  return (
    <header className="top-0 z-50 sticky bg-transparent shadow-lg backdrop-blur transition-all select-none">
      <div className="flex justify-between items-center mx-auto px-5 2xl:px-0 h-header container">
        <div
          className={`flex flex-col items-center ${page !== "/dashboard" ? "cursor-pointer" : ""}`}
          onClick={() => {
            if (page !== "/dashboard") navigate.push("/dashboard");
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-logo font-bold text-primary text-2xl"
          >
            {siteName}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="bg-primary rounded w-4 h-[2px] origin-left"
          />
        </div>

        <div className="relative" ref={menuRef}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <button
              title="Abrir menu"
              onClick={() => setOpen((prev) => !prev)}
              className="p-3 rounded-full outline-none text-foreground hover:text-primary active:text-primary/50 text-2xl transition-all duration-300 cursor-pointer"
            >
              {open ? <FaBarsStaggered /> : <FaBars />}
            </button>
          </motion.div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="top-12 right-[4px] z-50 absolute"
              >
                <div className="bg-background shadow-lg backdrop-blur border border-gray-200 rounded w-43.5 overflow-hidden">
                  {headerRoutes
                    ?.filter(({ hide }) => !hide)
                    .map(({ href, title, description, Icon }) => (
                      <motion.button
                        key={`${href}-${title}-${description}`}
                        type="button"
                        tabIndex={-1}
                        onClick={() => {
                          if (page !== href) {
                            navigate.push(href);

                            setOpen(false);
                          }
                        }}
                        className={`flex items-center gap-2 px-4 py-2 w-full text-sm text-left transition-all duration-300 ${page === href ? "bg-primary/10 text-primary" : "text-foreground hover:text-primary cursor-pointer"}`}
                      >
                        <Icon className="text-lg" />

                        <span
                          title={page === href ? "Você está aqui" : description}
                        >
                          {title}
                        </span>
                      </motion.button>
                    ))}

                  <motion.button
                    onClick={() => {
                      handleLogout();

                      setOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 w-full text-foreground hover:text-primary text-sm text-left transition-all duration-300 cursor-pointer"
                  >
                    <IoLogOutOutline className="text-lg" />

                    <span title="Fazer logout">Fazer logout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
