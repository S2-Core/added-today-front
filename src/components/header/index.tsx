"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion } from "motion/react";
import { IoLogOutOutline } from "react-icons/io5";

import { AuthContext } from "@/contexts/Auth";

import { excludedRoutes, routeLinks } from "@/constants/header";

const Header = () => {
  const [page, params] = [usePathname(), useParams()];

  const { logout } = useContext(AuthContext);

  if (excludedRoutes.includes(page)) return <></>;

  return (
    <header className="shadow-lg backdrop-blur sticky top-0 z-99 transition-all bg-background/70">
      <div className="container mx-auto h-header flex items-center justify-center md:justify-end md:px-5 2xl:px-0">
        <nav className="flex items-center">
          <ul className="flex items-center gap-5">
            {routeLinks.map(({ description, title, href }, i) => (
              <Link
                key={`${title}-${i}`}
                href={href}
                title={description}
                tabIndex={-1}
                className={`relative transition-all duration-300 ${page.includes(href) ? (params.id ? "text-primary" : "text-secondary") : "text-light hover:text-secondary active:text-primary"}`}
              >
                {title}

                {page.includes(href) && (
                  <motion.span
                    layoutId="underline"
                    transition={{
                      type: "keyframes",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className={`absolute top-6 h-[2px] rounded-full ${params.id ? "w-[50%] left-[25%] bg-primary" : "w-full left-0 bg-secondary"}`}
                  />
                )}
              </Link>
            ))}
          </ul>

          <button
            title="Fazer logout"
            onClick={logout}
            tabIndex={-1}
            className="ml-5 text-2xl text-light hover:text-secondary active:text-primary cursor-pointer transition-all duration-300"
          >
            <IoLogOutOutline />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
