"use client";

import { usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, easeOut } from "motion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";

import PlanCard from "@/components/planCard";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import { mapPlansViewedEventProperties } from "@/lib/analytics";

import { IUIPlan } from "@/contexts/billings/interfaces";
import {
  IAnalyticsEventName,
  IAnalyticsEventProperties,
} from "@/contexts/analytics/interfaces";
import { IUser } from "@/contexts/users/interfaces";
import { IUserCurrentPlan } from "@/contexts/auth/interfaces";

interface IProps {
  trackEvent: (
    eventName: IAnalyticsEventName,
    properties?: IAnalyticsEventProperties,
  ) => void;
  loggedUser: IUser | null;
  userCurrentPlan: IUserCurrentPlan | null;
  allUIPlans: IUIPlan[];
  setSelectedPlan: Dispatch<SetStateAction<IUIPlan | null>>;
}

const PlansCarousel = ({
  loggedUser,
  userCurrentPlan,
  trackEvent,
  allUIPlans,
  setSelectedPlan,
}: IProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const path = usePathname();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const hasTrackedPlansViewed = useRef<boolean>(false);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi || !allUIPlans) return;

    const initialIndex =
      allUIPlans.findIndex(({ priceCents }) => priceCents !== 0) || 0;

    emblaApi.scrollTo(initialIndex, true);
    setSelectedIndex(initialIndex);
    setSelectedPlan(allUIPlans[initialIndex] ?? null);

    const onSelect = () => {
      const i = emblaApi.selectedScrollSnap();
      setSelectedIndex(i);
      setSelectedPlan(allUIPlans?.[i] ?? null);
    };

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
    if (!allUIPlans || hasTrackedPlansViewed.current) return;

    hasTrackedPlansViewed.current = true;

    trackEvent(
      ANALYTICS_EVENTS.PLANS_VIEWED,
      mapPlansViewedEventProperties({
        path,
        user: loggedUser,
        currentPlanCode: userCurrentPlan?.currentPlan?.code ?? null,
        isFounder: loggedUser?.isFounder,
        visiblePlanCodes: (allUIPlans ?? []).map(({ code }) => code),
        hasIntroPriceEligible: useMemo(
          () =>
            (allUIPlans ?? []).some((plan) => Boolean(plan.introPriceEligible)),
          [allUIPlans],
        ),
        surface: "public_pricing",
      }),
    );
  }, [path, trackEvent, allUIPlans]);

  return (
    <div className="flex flex-col gap-3">
      <motion.div
        variants={fadeUp}
        className="flex justify-between items-center gap-5"
      >
        <button
          tabIndex={-1}
          type="button"
          onClick={scrollPrev}
          disabled={!emblaApi?.canScrollPrev()}
          className="flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-8 h-8 cursor-pointer"
        >
          <FaArrowLeft />
        </button>

        <div className="flex gap-2">
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

        <button
          tabIndex={-1}
          type="button"
          onClick={scrollNext}
          disabled={!emblaApi?.canScrollNext()}
          className="flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-8 h-8 cursor-pointer"
        >
          <FaArrowRight />
        </button>
      </motion.div>

      <div ref={emblaRef} className="rounded-xl overflow-hidden">
        <ul className="flex gap-4 mr-0.5 rounded-xl cursor-grab active:cursor-grabbing">
          {allUIPlans.map((plan) => (
            <PlanCard key={plan.code} plan={plan} className="flex-[0_0_100%]" />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlansCarousel;
