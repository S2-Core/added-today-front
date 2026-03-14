"use client";

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { motion, easeOut } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";

import { planIcons, planIntervals } from "@/constants/plans";

import { formatCurrency } from "@/utils/number.utils";

import { IUIPlan } from "@/contexts/billings/interfaces";
import { IUserCurrentPlan } from "@/contexts/auth/interfaces";

interface IProps {
  plan: IUIPlan;
  currentPlan?: IUserCurrentPlan | null;
  hasCTA?: boolean;
  hasButtonOptions?: boolean;
  clickable?: boolean;
  buttonOptionsOnclick?: (status: "ACTIVE" | "CANCELED") => Promise<void>;
  onClick?: () => void;
  setModal?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

const PlanCard = ({
  plan: {
    header,
    sections,
    priceCents,
    currency,
    interval,
    footer,
    introPriceCents,
    isCurrentPlan,
    cta,
  },
  currentPlan = null,
  hasCTA = false,
  hasButtonOptions = false,
  clickable = false,
  buttonOptionsOnclick,
  onClick,
  setModal,
  className,
}: IProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  return (
    <motion.li
      variants={fadeUp}
      title={header.title}
      className={[
        "shadow-md border h-fit rounded-xl w-full select-none",
        isCurrentPlan && !!currentPlan
          ? "bg-primary/10 border-primary"
          : "bg-background border-primary/30",
        className,
      ].join(" ")}
    >
      <div
        onClick={onClick}
        className={
          clickable
            ? "cursor-pointer hover:bg-tertiary/10 transition-all duration-300"
            : ""
        }
      >
        <div className="flex flex-col gap-1 bg-tertiary px-8 py-5 rounded-t-xl text-white">
          <span className="font-title text-xl md:text-left text-center">
            {header.title}
          </span>

          <span className="text-white/50 text-xs md:text-left text-center">
            {header.subtitle}
          </span>
        </div>

        <div className="flex flex-col px-8 py-5">
          {hasCTA && (
            <div className="flex justify-center lg:justify-end w-full">
              <span
                className={[
                  "px-4 py-2 border-2 rounded-full mb-3",
                  cta.action === "CURRENT"
                    ? "border-primary"
                    : "border-success",
                ].join(" ")}
              >
                {cta.label}
              </span>
            </div>
          )}

          {sections.map(({ title, items }, i) => (
            <div key={`${i}-${title}`} className="flex flex-col gap-3">
              <span className="font-title font-bold sm:text-left text-center">
                {title}
              </span>

              <ul className="flex flex-col gap-2 sm:ml-5">
                {items.map(
                  (
                    { key, icon, title, description, displayLimit, showBadge },
                    i,
                  ) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm/normal"
                    >
                      {key && (
                        <FaCheckCircle className="w-full max-w-5.25 h-full max-h-5.25 aspect-square text-success-light" />
                      )}

                      {showBadge ? (
                        <figure className="relative w-7 h-7 aspect-square">
                          <Image
                            src={"/images/proIcon.png"}
                            alt="Ícone do plano"
                            fill
                            className="w-full h-full object-contain"
                          />

                          <figcaption hidden aria-hidden className="hidden">
                            Ícone do plano
                          </figcaption>
                        </figure>
                      ) : (
                        <span className="w-full max-w-7 h-full max-h-7 aspect-square text-lg">
                          {planIcons[icon as keyof typeof planIcons] ?? icon}
                        </span>
                      )}

                      <div className="flex flex-col">
                        <span className="font-title font-bold text-base/normal">
                          {title}
                        </span>

                        <span className="text-sm/normal">
                          {description}

                          {displayLimit && (
                            <span className="font-bold">{` (${displayLimit})`}</span>
                          )}
                        </span>
                      </div>
                    </li>
                  ),
                )}
              </ul>

              {sections.length - 1 !== i && (
                <hr className="mt-2 mb-5 border-primary/30 border-dashed" />
              )}
            </div>
          ))}

          <div
            className={[
              "flex flex-col gap-3 p-3 border mt-5 rounded-xl",
              isCurrentPlan
                ? "bg-transparent border-primary/30"
                : "bg-success-light/10 border-success/30",
            ].join(" ")}
          >
            <div className="flex flex-col gap-1">
              <div
                className={[
                  "relative flex items-baseline gap-1 w-fit",
                  introPriceCents ? "text-error/70" : "",
                ].join(" ")}
              >
                {introPriceCents && (
                  <div className="top-1/2 absolute bg-error/70 w-full h-0.5 -translate-y-1/2" />
                )}

                <span className="text-3xl">
                  {formatCurrency(priceCents / 100, currency)}
                </span>

                <span>/ {planIntervals[interval] ?? interval}</span>
              </div>

              {introPriceCents && (
                <div className="flex items-baseline gap-1 w-fit">
                  <span className="text-3xl">
                    {formatCurrency(introPriceCents / 100, currency)}
                  </span>

                  <span>/ {planIntervals[interval ?? interval]}</span>
                </div>
              )}

              <span className="text-foreground/50 text-sm">
                {footer.priceNote}
              </span>
            </div>

            {footer.badge && (
              <div
                className={[
                  "flex items-start gap-2 px-5 py-2 border rounded-xl text-sm/normal",
                  isCurrentPlan
                    ? "bg-primary/5 border-primary/30"
                    : "bg-success-light/10 border-success/30",
                ].join(" ")}
              >
                <span>🎁</span>

                <span className="font-title font-bold text-base/normal">
                  {footer.badge}
                </span>
              </div>
            )}
          </div>

          {hasButtonOptions &&
            !!currentPlan &&
            buttonOptionsOnclick &&
            setModal &&
            ["ACTIVE", "CANCELED"].includes(
              currentPlan.subscription?.status ?? "",
            ) && (
              <button
                tabIndex={-1}
                type="button"
                className={[
                  "mt-5 py-2 border cursor-pointer border-primary/30 rounded-lg w-full text-primary transition-all duration-300",
                  currentPlan?.subscription?.status === "ACTIVE"
                    ? "hover:border-error hover:bg-error/10 hover:text-error"
                    : "hover:border-primary hover:bg-primary/10 hover:text-primary",
                ].join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (currentPlan?.subscription?.status !== "ACTIVE") {
                    setModal(true);

                    return;
                  }

                  buttonOptionsOnclick("CANCELED");
                }}
              >
                {currentPlan?.subscription?.status === "ACTIVE"
                  ? "Cancelar plano"
                  : "Reativar plano"}
              </button>
            )}
        </div>
      </div>
    </motion.li>
  );
};

export default PlanCard;
