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
  buttonOptionsSetLoading?: Dispatch<SetStateAction<boolean>>;
  buttonOptionsLoading?: boolean;
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
    introOfferTitle,
    introOfferMessage,
    introPriceEligible,
    introOfferValidUntil,
    introPriceCycles,
    introPriceCents,
    isCurrentPlan,
    cta,
  },
  currentPlan = null,
  hasCTA = false,
  hasButtonOptions = false,
  clickable = false,
  buttonOptionsOnclick,
  buttonOptionsSetLoading,
  buttonOptionsLoading,
  onClick,
  setModal,
  className,
}: IProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const isPaidCurrentPlan = isCurrentPlan && priceCents !== 0;

  const subscription = currentPlan?.subscription;

  const shouldShowCTA = hasCTA && (priceCents !== 0 || isCurrentPlan);

  const isCancelAtPeriodEnd =
    isPaidCurrentPlan &&
    !!subscription?.cancelAtPeriodEnd &&
    !!subscription?.canceledAt;

  const isOneTimeEnding =
    isPaidCurrentPlan &&
    subscription?.checkoutMode === "ONE_TIME" &&
    !!subscription?.cancelAtPeriodEnd &&
    !!subscription?.currentPeriodEnd;

  const isRecurringRenewal =
    isPaidCurrentPlan &&
    subscription?.checkoutMode === "RECURRING" &&
    !subscription?.cancelAtPeriodEnd &&
    !!subscription?.currentPeriodEnd;

  const shouldShowPlanStatus =
    isCancelAtPeriodEnd || isOneTimeEnding || isRecurringRenewal;

  const statusLabel = `Seu plano ${isCancelAtPeriodEnd ? "será cancelado" : isOneTimeEnding ? "se encerra" : isRecurringRenewal ? "será renovado" : ""} em`;

  const statusDate = shouldShowPlanStatus
    ? new Date(
        isCancelAtPeriodEnd
          ? (subscription!.canceledAt as string)
          : subscription!.currentPeriodEnd,
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  const statusContainerClassName = [
    "flex w-full items-center",
    shouldShowPlanStatus && shouldShowCTA
      ? "flex-col-reverse lg:flex-row lg:justify-between gap-5"
      : "justify-center lg:justify-end",
  ].join(" ");

  return (
    <motion.li
      variants={fadeUp}
      title={header.title}
      className={[
        "shadow-md border h-fit rounded-xl w-full select-none",
        isCurrentPlan && !!currentPlan
          ? "bg-primary/10 border-primary"
          : priceCents === 0
            ? "bg-background border-primary/30 grayscale opacity-50"
            : "bg-background border-primary/30",
        className,
      ].join(" ")}
    >
      <div
        onClick={onClick}
        className={`group ${
          clickable
            ? "cursor-pointer hover:bg-tertiary/10  transition-all duration-300"
            : ""
        }`}
      >
        <div className="flex flex-col gap-1 bg-tertiary px-8 py-5 rounded-t-xl text-white">
          <span className="font-title text-3xl text-center">
            {header.title}
          </span>

          <span className="text-white/70 text-xs text-center">
            {header.subtitle}
          </span>
        </div>

        <div className="flex flex-col sm:gap-8 px-8 py-5">
          {(shouldShowPlanStatus || shouldShowCTA) && (
            <div className={statusContainerClassName}>
              {shouldShowPlanStatus && statusLabel && statusDate && (
                <div
                  className={[
                    "text-center sm:text-start flex flex-col",
                    isRecurringRenewal ? "text-primary" : "text-error",
                  ].join(" ")}
                >
                  <span className="font-bold">{statusLabel}:</span>

                  <span>{` ${statusDate}`}</span>
                </div>
              )}

              {shouldShowCTA && (
                <span
                  className={[
                    "px-4 py-2 border-2 rounded-full",
                    cta.action === "CURRENT"
                      ? "border-primary"
                      : "border-success",
                  ].join(" ")}
                >
                  {cta.label}
                </span>
              )}
            </div>
          )}

          {sections.map(({ title, items }, i) => (
            <div key={`${i}-${title}`} className="flex flex-col gap-3 sm:gap-5">
              <div className="relative sm:text-left text-center">
                <div
                  className={[
                    "hidden md:hidden sm:block lg:block w-full h-0.5",
                    clickable ? "group-hover:bg-transparent" : "bg-primary/30",
                    isCurrentPlan && !!currentPlan
                      ? "bg-transparent"
                      : "bg-primary/30",
                  ].join(" ")}
                />

                <span
                  className={[
                    "sm:-top-3 md:top-0 lg:-top-3 sm:left-3 md:left-0 lg:left-3 md:static sm:absolute lg:absolute  px-2 font-title font-bold text-sm sm:text-base",
                    clickable ? "group-hover:bg-transparent" : "bg-background",
                    isCurrentPlan && !!currentPlan
                      ? "bg-transparent"
                      : "bg-background",
                  ].join(" ")}
                >
                  {title}
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {items.map(
                  (
                    { key, icon, title, description, displayLimit, showBadge },
                    i,
                  ) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm/normal"
                    >
                      {key ? (
                        <FaCheckCircle className="mt-0.5 w-full max-w-5.25 h-full max-h-5.25 aspect-square text-success-light" />
                      ) : showBadge ? (
                        <figure className="relative w-8 h-8 aspect-square">
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
                <hr className="sm:hidden lg:hidden md:block mt-2 mb-5 border-primary/30 border-dashed" />
              )}
            </div>
          ))}

          <div
            className={[
              "flex flex-col gap-3 p-3 border rounded-md relative",
              isCurrentPlan
                ? "bg-transparent border-primary/30"
                : "bg-success-light/10 border-success/30",
              introPriceEligible && introPriceCents !== null
                ? "pt-6 mt-8 sm:mt-0"
                : "mt-3 sm:mt-0",
            ].join(" ")}
          >
            {introPriceEligible && introPriceCents !== null && (
              <span
                className="-top-3 sm:-top-4 left-1/2 absolute bg-primary shadow-md px-2 py-1 rounded font-title text-white text-xs sm:text-base text-center whitespace-nowrap -translate-x-1/2"
                title={introOfferMessage ?? ""}
              >
                {introOfferTitle}
              </span>
            )}

            <div className="flex justify-center items-baseline gap-2 w-full font-bold text-tertiary">
              <span className="text-3xl">
                {formatCurrency(
                  (introPriceEligible ? (introPriceCents ?? 0) : priceCents) /
                    100,
                  currency,
                )}
              </span>

              <span>/ {planIntervals[interval] ?? interval}</span>
            </div>

            <hr className="border-primary/30 border-dashed" />

            {introPriceEligible && introPriceCents !== null && (
              <div className="flex flex-col items-center gap-1 w-full text-sm/normal">
                <div className="flex items-center gap-1">
                  <span>Orferta válida até</span>

                  <span className="font-bold">
                    {new Date(
                      introOfferValidUntil as string,
                    ).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </span>
                </div>

                <div className="inline text-center">
                  <span>Depois o valor será:</span>

                  <span>{`${formatCurrency(priceCents / 100, currency)}/${planIntervals[interval] ?? interval}`}</span>
                </div>
              </div>
            )}

            <span className="text-foreground/70 text-xs text-center">
              {footer.priceNote}
            </span>
          </div>

          {hasButtonOptions &&
            !!currentPlan &&
            buttonOptionsOnclick &&
            buttonOptionsLoading !== undefined &&
            buttonOptionsSetLoading &&
            currentPlan?.subscription?.checkoutMode === "RECURRING" &&
            setModal && (
              <button
                tabIndex={-1}
                type="button"
                disabled={buttonOptionsLoading}
                className={[
                  "mt-5 py-2 border cursor-pointer border-primary/30 rounded-lg w-full text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-primary/30 disabled:hover:bg-transparent disabled:hover:text-primary",
                  currentPlan?.subscription?.status === "ACTIVE"
                    ? "hover:border-error hover:bg-error/10 hover:text-error"
                    : "hover:border-primary hover:bg-primary/10 hover:text-primary",
                ].join(" ")}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!currentPlan?.subscription?.cancelAtPeriodEnd) {
                    setModal(true);

                    return;
                  }

                  buttonOptionsSetLoading(true);

                  await buttonOptionsOnclick("CANCELED");

                  buttonOptionsSetLoading(false);
                }}
              >
                {!currentPlan?.subscription?.cancelAtPeriodEnd
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
