"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IoLogOutOutline } from "react-icons/io5";

import { useAuth } from "@/contexts";

import { publicRoutes, headerRouteLinks } from "@/constants/routes";

const Header = () => {
  const page = usePathname() || "/";

  const activeHref =
    headerRouteLinks
      .map(({ href }) => href)
      .filter((href) => page.startsWith(href))
      .sort((a, b) => b.length - a.length)[0] || null;

  const ulRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const [indicator, setIndicator] = useState({ x: 0, width: 0 });

  const measure = useCallback(() => {
    if (!activeHref) return;

    const el = linkRefs.current[activeHref];

    const ul = ulRef.current;

    if (!el || !ul) return;

    const elRect = el.getBoundingClientRect();

    const ulRect = ul.getBoundingClientRect();

    setIndicator({
      x: elRect.left - ulRect.left + ul.scrollLeft,
      width: elRect.width,
    });
  }, [activeHref]);

  const { handleLogout } = useAuth();

  useLayoutEffect(() => {
    const ul = ulRef.current;

    if (!ul) return;

    const onResize = () => requestAnimationFrame(measure);

    measure();

    window.addEventListener("resize", onResize);

    ul.addEventListener("scroll", onResize, { passive: true });

    let ro: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onResize);

      ro.observe(ul);

      const el = activeHref ? linkRefs.current[activeHref] : null;

      if (el) ro.observe(el);
    }
    return () => {
      window.removeEventListener("resize", onResize);

      ul.removeEventListener("scroll", onResize);

      if (ro) ro.disconnect();
    };
  }, [measure, activeHref]);

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => measure());
    }
  }, [measure]);

  if (
    publicRoutes.includes(page) ||
    !headerRouteLinks.map(({ href }) => href).includes(page)
  )
    return <></>;

  return (
    <header className="top-0 z-999 sticky bg-background/70 shadow-lg backdrop-blur transition-all select-none">
      <div className="flex justify-center md:justify-end items-center mx-auto px-5 2xl:px-0 h-header container">
        <nav className="flex items-center">
          <ul ref={ulRef} className="relative flex items-center gap-5 scroll">
            {headerRouteLinks.map(({ description, title, href }, i) => (
              <Link
                key={`${title}-${i}`}
                href={href}
                title={description}
                tabIndex={-1}
                ref={(link) => {
                  linkRefs.current[href] = link;
                }}
                className={`relative transition-all text-sm sm:text-base duration-300 text-light hover:text-primary ${page.startsWith(href) ? "text-primary" : "active:text-primary"}`}
              >
                {title}
              </Link>
            ))}

            {!!indicator.width && (
              <motion.span
                initial={false}
                animate={{ x: indicator.x, width: indicator.width }}
                transition={{ type: "keyframes", stiffness: 500, damping: 35 }}
                className="top-5 sm:top-6 left-0 absolute bg-primary rounded-full h-[2px]"
              />
            )}
          </ul>

          <button
            title="Fazer logout"
            onClick={handleLogout}
            tabIndex={-1}
            className="ml-5 text-light hover:text-primary active:text-primary text-2xl transition-all duration-300 cursor-pointer"
          >
            <IoLogOutOutline />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
