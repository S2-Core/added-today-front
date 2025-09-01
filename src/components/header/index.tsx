"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { useAuth } from "@/contexts";

import Loading from "../loading";

import { noAuthRoutes, routeLinks } from "@/constants/routes";

const Header = () => {
  const page = usePathname() || "/";

  const [asideOpen, setAsideOpen] = useState(false);

  const { handleLogout, headerRoutes } = useAuth();

  useEffect(() => {
    setAsideOpen(false);
  }, [page]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAsideOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (
    noAuthRoutes.includes(page) ||
    !routeLinks.map(({ href }) => href).includes(page)
  )
    return <></>;

  return (
    <>
      <header className="top-0 z-[1001] sticky bg-transparent shadow-lg backdrop-blur transition-all select-none">
        <div className="flex justify-between items-center mx-auto px-5 2xl:px-0 h-header container">
          <button
            title="Abrir menu de links"
            aria-controls="app-aside"
            aria-expanded={asideOpen}
            tabIndex={-1}
            onClick={() => setAsideOpen(true)}
            className="p-3 rounded-full outline-none text-foreground hover:text-primary active:text-primary/50 text-2xl transition-all duration-300 cursor-pointer"
          >
            {asideOpen ? <FaBarsStaggered /> : <FaBars />}
          </button>

          <button
            title="Fazer logout"
            onClick={() => {
              setAsideOpen(false);
              handleLogout();
            }}
            tabIndex={-1}
            className="inline-flex items-center gap-2 p-2 rounded-full text-foreground hover:text-primary active:text-primary/50 text-2xl transition-all duration-300 cursor-pointer"
          >
            <IoLogOutOutline />
          </button>
        </div>
      </header>

      {asideOpen && (
        <div
          className="z-[9998] fixed inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setAsideOpen(false)}
        />
      )}

      <aside
        id="app-aside"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 w-72 lg:w-80 max-w-[90vw] bg-background z-[9999] transition-transform duration-300 ${
          asideOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center px-5 border-gray-4 border-b h-header">
          <button
            title="Fechar menu de links"
            tabIndex={-1}
            onClick={() => setAsideOpen(false)}
            className="text-foreground hover:text-primary active:text-primary text-2xl transition-all duration-300 cursor-pointer"
          >
            <IoClose />
          </button>
        </div>

        <nav className="px-5 py-4 h-full overflow-y-auto">
          <ul className="flex flex-col items-center gap-2 h-fit">
            {headerRoutes ? (
              headerRoutes.map(({ description, title, href }, i) => (
                <Link
                  key={`m-${title}-${i}`}
                  title={description}
                  href={href}
                  tabIndex={-1}
                  onClick={() => setAsideOpen(false)}
                  className={`block rounded-xl px-3 py-2 transition-all w-full text-sm duration-300 text-foreground ${page.startsWith(href) ? "text-primary bg-primary/10" : "active:text-primary hover:text-secondary hover:bg-secondary/10"}`}
                >
                  {title}
                </Link>
              ))
            ) : (
              <Loading className="py-10" />
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Header;
