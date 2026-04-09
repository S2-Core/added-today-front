"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";
import { usePathname, useRouter } from "next/navigation";

import { useAnalytics, useAuth } from "@/contexts";

import FixedModal from "../fixedModal";
import PlanCard from "../planCard";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  mapFeatureBlockedByPlanEventProperties,
  mapFreeLimitReachedEventProperties,
  mapPaywallViewedEventProperties,
  mapUpgradeCtaClickedEventProperties,
} from "@/lib/analytics";

import { IUIPlan } from "@/contexts/billings/interfaces";

interface IProps {
  isOpen: boolean;
  close: () => void;
  allUIPlans: IUIPlan[] | null;
  usedFeature:
    | "LAILA_INTERACTIONS"
    | "QUOTATIONS"
    | "INSIGHTS"
    | "OPPORTUNITIES"
    | "CALENDAR_AI_SUGGESTIONS";
}

const PlansModal = ({ isOpen, close, allUIPlans, usedFeature }: IProps) => {
  const [path, navigate] = [usePathname(), useRouter()];

  const { trackEvent } = useAnalytics();
  const { loggedUser, userCurrentPlan } = useAuth();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isMobileDotsFixed, setIsMobileDotsFixed] = useState(false);

  const dotsTriggerRef = useRef<HTMLDivElement | null>(null);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!open || !loggedUser) return;

    trackEvent(
      ANALYTICS_EVENTS.PAYWALL_VIEWED,
      mapPaywallViewedEventProperties({
        path,
        user: loggedUser,
        currentPlanCode: userCurrentPlan?.currentPlan?.code,
        feature: "chat",
        requiredPlan: "PRO",
        surface: "feature_block",
      }),
    );

    trackEvent(
      ANALYTICS_EVENTS.FEATURE_BLOCKED_BY_PLAN,
      mapFeatureBlockedByPlanEventProperties({
        path,
        user: loggedUser,
        feature: "chat",
        currentPlanCode: userCurrentPlan?.currentPlan?.code,
        requiredPlan: allUIPlans?.find(
          ({ priceCents }) =>
            priceCents > (userCurrentPlan?.currentPlan.priceCents as number),
        )?.code,
      }),
    );

    if (userCurrentPlan?.currentPlan?.code === "FREE") {
      const entitlement = userCurrentPlan.entitlements.find(
        ({ key }) => key === usedFeature,
      );

      trackEvent(
        ANALYTICS_EVENTS.FREE_LIMIT_REACHED,
        mapFreeLimitReachedEventProperties({
          path,
          user: loggedUser,
          feature: usedFeature,
          currentUsage:
            (entitlement?.limit ?? 0) - (entitlement?.remaining ?? 0),
          limitValue: entitlement?.limit ?? 0,
          currentPlanCode: userCurrentPlan?.currentPlan?.code,
        }),
      );
    }
  }, [open, loggedUser]);

  useEffect(() => {
    if (!emblaApi || !allUIPlans) return;

    const initialIndex =
      allUIPlans.findIndex(({ isCurrentPlan }) => isCurrentPlan) || 0;

    emblaApi.scrollTo(initialIndex, true);
    setSelectedIndex(initialIndex);

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, allUIPlans]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = dotsTriggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();

      const OFFSET = 120;

      setIsMobileDotsFixed(rect.top <= window.innerHeight - OFFSET);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  if (!allUIPlans) return null;

  return (
    <FixedModal isOpen={isOpen} close={close} size="32rem">
      <div className="flex flex-col justify-center items-center gap-2 text-center">
        <p className="font-title font-bold text-2xl">
          Parece que seu plano chegou ao limite
        </p>

        <span className="text">
          Para continuar utilizando o serviço, você precisa atualizar seu plano.
          Confira planos disponíveis abaixo:
        </span>
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="hidden md:flex gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              tabIndex={-1}
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={[
                "h-2 w-2 rounded-full transition-all",
                i === selectedIndex ? "bg-primary w-5" : "bg-foreground/20",
                "cursor-pointer",
              ].join(" ")}
              aria-label={`Ir para o plano ${i + 1}`}
            />
          ))}
        </div>

        <div className="relative pt-8 md:pt-0 w-full">
          <div
            ref={dotsTriggerRef}
            className="md:hidden top-0 absolute mt-20 w-full h-px"
          />

          <div
            className={[
              "md:hidden left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
              isMobileDotsFixed
                ? "fixed bottom-20 rounded-full bg-foreground/20 px-2.5 py-1.5 shadow-md backdrop-blur-md"
                : "absolute top-0",
            ].join(" ")}
          >
            <div className="flex justify-center items-center gap-2 w-full">
              {scrollSnaps.map((_, i) => (
                <button
                  tabIndex={-1}
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className={[
                    "h-2 w-2 rounded-full transition-all",
                    i === selectedIndex ? "bg-primary w-5" : "bg-foreground/20",
                    "cursor-pointer",
                  ].join(" ")}
                  aria-label={`Ir para o plano ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <button
              tabIndex={-1}
              type="button"
              onClick={scrollPrev}
              disabled={!emblaApi?.canScrollPrev()}
              className="hidden top-1/2 z-10 absolute md:flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 -translate-y-1/2 cursor-pointer"
            >
              <FaArrowLeft />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <ul className="flex gap-4 mr-1 rounded-xl">
                {allUIPlans.map((plan) => (
                  <PlanCard
                    key={plan.code}
                    plan={plan}
                    clickable={!plan.isCurrentPlan && plan.priceCents !== 0}
                    hasCTA
                    onClick={() => {
                      if (plan.isCurrentPlan) return;

                      trackEvent(
                        ANALYTICS_EVENTS.UPGRADE_CTA_CLICKED,
                        mapUpgradeCtaClickedEventProperties({
                          path,
                          user: loggedUser,
                          currentPlanCode:
                            userCurrentPlan?.currentPlan?.code ?? null,
                          targetPlanCode: plan.code,
                          ctaAction: plan.cta.action,
                          ctaLabel: plan.cta.label,
                          introPriceEligible: plan.introPriceEligible,
                          surface: "authenticated_billing",
                        }),
                      );

                      navigate.push(`/plans/${plan.code}`);
                    }}
                  />
                ))}
              </ul>
            </div>

            <button
              tabIndex={-1}
              type="button"
              onClick={scrollNext}
              disabled={!emblaApi?.canScrollNext()}
              className="hidden top-1/2 right-0 z-10 absolute md:flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 -translate-y-1/2 cursor-pointer"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </FixedModal>
  );
};

export default PlansModal;
