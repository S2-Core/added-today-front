"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { links } from "@/constants/header";

const Header = () => {
  const page = usePathname();

  return (
    <header className="shadow-lg backdrop-blur sticky top-0 z-99 transition-all bg-background/70">
      <div className="container mx-auto h-header flex items-center justify-center md:justify-end md:px-5 2xl:px-0">
        <nav className="flex items-center">
          <ul className="flex items-center gap-5">
            {links.map(({ description, title, href }, i) => (
              <li
                key={`${title}-${i}`}
                className="relative hover:text-secondary active:text-primary transition-all duration-300"
              >
                <Link href={href} title={description} tabIndex={-1}>
                  {title}
                </Link>

                {page === href && (
                  <span className="bg-secondary h-[2px] rounded-full absolute top-6 left-0 w-full transition-all duration-1000" />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
