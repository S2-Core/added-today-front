"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IoLogOutOutline } from "react-icons/io5";

import { AuthContext } from "@/contexts/auth";

import { excludedRoutes, routeLinks } from "@/constants/header";

const Header = () => {
  const [page] = [usePathname()];

  const { handleLogout } = useContext(AuthContext);

  if (
    excludedRoutes.includes(page) ||
    !routeLinks.map(({ href }) => href).includes(page)
  )
    return <></>;

  return (
    <header className="top-0 z-999 sticky bg-background/70 shadow-lg backdrop-blur transition-all select-none">
      <div className="flex justify-center md:justify-end items-center mx-auto md:px-5 2xl:px-0 h-header container">
        <nav className="flex items-center">
          <ul className="flex items-center gap-5">
            {routeLinks.map(({ description, title, href }, i) => (
              <Link
                key={`${title}-${i}`}
                href={href}
                title={description}
                tabIndex={-1}
                className={`relative transition-all duration-300 text-light hover:text-secondary ${
                  page === href ? "text-secondary" : "active:text-primary"
                }`}
              >
                {title}

                {page.includes(href) && (
                  <motion.span
                    layoutId="links"
                    transition={{
                      type: "keyframes",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="top-6 left-0 absolute bg-secondary rounded-full w-full h-[2px]"
                  />
                )}
              </Link>
            ))}
          </ul>

          <button
            title="Fazer logout"
            onClick={handleLogout}
            tabIndex={-1}
            className="ml-5 text-light hover:text-secondary active:text-primary text-2xl transition-all duration-300 cursor-pointer"
          >
            <IoLogOutOutline />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
