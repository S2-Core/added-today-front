"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";

import { useAuth } from "@/contexts";

import { noAuthRoutes, routeLinks } from "@/constants/routes";

const Header = () => {
  const [page, navigate] = [usePathname() || "/", useRouter()];

  const { handleLogout, headerRoutes, userCurrentPlan } = useAuth();

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
      <div className="flex justify-between items-center mx-auto px-5 h-header container">
        <motion.figure
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => {
            if (page !== "/campaigns") navigate.push("/campaigns");
          }}
          className={`${userCurrentPlan?.currentPlan.priceCents !== 0 ? "hidden sm:block" : ""} ${page !== "/campaigns" ? "cursor-pointer" : ""}`}
        >
          <Image
            alt="Logo"
            src="/images/logo.png"
            width={200}
            height={40}
            priority
            objectFit="cover"
          />

          <figcaption hidden aria-hidden className="hidden">
            Logo
          </figcaption>
        </motion.figure>

        <div
          className={`flex items-center gap-5 w-full sm:w-fit ${userCurrentPlan?.currentPlan.priceCents !== 0 ? "justify-between" : "justify-end"}`}
        >
          {userCurrentPlan?.currentPlan.priceCents !== 0 && (
            <div className="flex items-center gap-1">
              <motion.figure
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-10 sm:w-7.5 h-10 sm:h-7.5"
              >
                <Image
                  alt="Logo"
                  src="/images/proIcon.png"
                  fill
                  priority
                  objectFit="cover"
                  className="w-full h-full aspect-square"
                />

                <figcaption hidden aria-hidden className="hidden">
                  Logo
                </figcaption>
              </motion.figure>

              <span className="font-bold text-primary sm:text-sm text-base">
                {userCurrentPlan?.currentPlan.name}
              </span>
            </div>
          )}

          <div className="relative" ref={menuRef}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <button
                title="Abrir menu"
                onClick={() => setOpen((prev) => !prev)}
                tabIndex={-1}
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
                  className="top-12 right-1 z-50 absolute"
                >
                  <div className="bg-background shadow-lg backdrop-blur border border-gray-200 rounded w-43.5 overflow-hidden">
                    {headerRoutes?.map(({ href, title, description, Icon }) => (
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
                          title={
                            page === href ? "Você está aqui!" : description
                          }
                        >
                          {title}
                        </span>
                      </motion.button>
                    ))}

                    <motion.button
                      onClick={() => {
                        handleLogout(true);

                        setOpen(false);
                      }}
                      title="Fazer logout"
                      tabIndex={-1}
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
      </div>
    </header>
  );
};

export default Header;
