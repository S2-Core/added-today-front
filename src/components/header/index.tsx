"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { links } from "@/constants/header";

const Header = () => {
  const page = usePathname();

  return (
    <header className="shadow-lg backdrop-blur sticky top-0 z-99 transition-all bg-background/70">
      <div className="container mx-auto h-header flex items-center justify-center md:justify-end md:px-5 2xl:px-0">
        <nav className="flex items-center">
          <ul className="flex items-center gap-5">
            {links.map(({ description, title, href }, i) => (
              <Link
                key={`${title}-${i}`}
                href={href}
                title={description}
                tabIndex={-1}
                className="relative hover:text-secondary active:text-primary transition-all duration-300"
              >
                {title}

                {page === href && (
                  <motion.span
                    layoutId="underline"
                    transition={{
                      type: "keyframes",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="absolute left-0 top-6 h-[2px] bg-secondary rounded-full w-full"
                  />
                )}
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
