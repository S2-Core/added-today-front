"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAnalytics, useAuth, useBillings } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import PlanCard from "@/components/planCard";
import FixedModal from "@/components/fixedModal";
import Form from "@/components/form";
import Textarea from "@/components/textarea";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  mapCancelFlowAbandonedEventProperties,
  mapCancelFlowStartedEventProperties,
  mapPlansViewedEventProperties,
  mapUpgradeCtaClickedEventProperties,
} from "@/lib/analytics";

import { cancelCheckoutSchema } from "@/validators/checkouts/cancelCheckout.validator";

const Client = () => {
  const { trackEvent } = useAnalytics();
  const { userCurrentPlan, handleFindUserCurrentPlan, loggedUser } = useAuth();
  const { allUIPlans, handlePlanSubscriptionStatus } = useBillings();

  const [path, navigate] = [usePathname(), useRouter()];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileDotsFixed, setIsMobileDotsFixed] = useState(false);

  const hasTrackedPlansViewed = useRef<boolean>(false);
  const dotsTriggerRef = useRef<HTMLDivElement | null>(null);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<{ reason: string }>({
    mode: "onChange",
    resolver: yupResolver(cancelCheckoutSchema),
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!userCurrentPlan || !loggedUser) return;

    if (modal)
      trackEvent(
        ANALYTICS_EVENTS.CANCEL_FLOW_STARTED,
        mapCancelFlowStartedEventProperties({
          path,
          user: loggedUser,
          userPlan: {
            currentPlan: userCurrentPlan.currentPlan,
            subscription: userCurrentPlan.subscription ?? undefined,
          },
        }),
      );
  }, [modal, userCurrentPlan, loggedUser]);

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
        hasIntroPriceEligible: (allUIPlans ?? []).some((plan) =>
          Boolean(plan.introPriceEligible),
        ),
        surface: "authenticated_billing",
      }),
    );
  }, [path, trackEvent, allUIPlans]);

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
    <>
      <Container Tag={"main"} className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Escolha o plano ideal para desbloquear recursos exclusivos, aumentar sua visibilidade e acelerar seu crescimento na plataforma." />

        <div className="flex flex-col items-center gap-5">
          <div className="hidden md:flex justify-center w-full">
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

          <div className="relative pt-8 md:pt-0 w-full">
            <div
              ref={dotsTriggerRef}
              className="md:hidden top-0 absolute mt-20 w-full h-px"
            />

            <div
              className={[
                "md:hidden left-1/2 z-50  -translate-x-1/2 transition-all duration-300",
                isMobileDotsFixed
                  ? "fixed bottom-15 rounded-full bg-foreground/20 px-2.5 py-1.5 shadow-md backdrop-blur-md"
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
                      i === selectedIndex
                        ? "bg-primary w-5"
                        : "bg-foreground/20",
                      "cursor-pointer",
                    ].join(" ")}
                    aria-label={`Ir para o plano ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 w-full">
              <button
                tabIndex={-1}
                type="button"
                onClick={scrollPrev}
                disabled={!emblaApi?.canScrollPrev()}
                className="hidden md:flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 cursor-pointer"
              >
                <FaArrowLeft />
              </button>

              <div ref={emblaRef} className="rounded-xl overflow-hidden">
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.12 },
                    },
                  }}
                  className="flex gap-4 mr-0.5 rounded-xl"
                >
                  {allUIPlans.map((plan) => (
                    <PlanCard
                      key={plan.code}
                      plan={plan}
                      currentPlan={userCurrentPlan}
                      hasCTA
                      hasButtonOptions={
                        plan.isCurrentPlan && plan.priceCents !== 0
                      }
                      buttonOptionsOnclick={async (status) => {
                        await handlePlanSubscriptionStatus(status);
                        await handleFindUserCurrentPlan();
                      }}
                      buttonOptionsSetLoading={setLoading}
                      buttonOptionsLoading={loading}
                      clickable={!plan.isCurrentPlan && plan.priceCents !== 0}
                      setModal={setModal}
                      onClick={() => {
                        if (plan.isCurrentPlan || plan.priceCents === 0) return;

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
                      className="flex-[0_0_100%] md:flex-[0_0_calc(50%-0.5rem)]"
                    />
                  ))}
                </motion.ul>
              </div>

              <button
                tabIndex={-1}
                type="button"
                onClick={scrollNext}
                disabled={!emblaApi?.canScrollNext()}
                className="hidden md:flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 cursor-pointer"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </Container>

      <FixedModal
        isOpen={modal}
        close={() => {
          setModal(false);
          reset();
        }}
      >
        <div className="flex flex-col gap-3">
          <span className="font-title font-bold text-center">
            Deseja cancelar a assinatura?
          </span>

          <Form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(async ({ reason }) => {
              setLoading(true);
              setModal(false);
              reset();

              await handlePlanSubscriptionStatus("ACTIVE", reason);

              await handleFindUserCurrentPlan();

              setLoading(false);
            })}
          >
            <Textarea
              name="reason"
              label="Motivo do cancelamento:"
              errors={errors}
              register={register}
              required
            />

            <div className="gap-4 grid grid-cols-2">
              <button
                tabIndex={-1}
                type="submit"
                className="hover:bg-error/10 py-2 border border-error/30 hover:border-error rounded-lg w-full text-error transition-all duration-300 cursor-pointer"
              >
                Cancelar plano
              </button>

              <button
                tabIndex={-1}
                type="button"
                onClick={() => {
                  setModal(false);
                  reset();

                  trackEvent(
                    ANALYTICS_EVENTS.CANCEL_FLOW_ABANDONED,
                    mapCancelFlowAbandonedEventProperties({
                      path,
                      user: loggedUser,
                      userPlan: {
                        currentPlan: userCurrentPlan?.currentPlan,
                        subscription:
                          userCurrentPlan?.subscription ?? undefined,
                      },
                    }),
                  );
                }}
                className="hover:bg-primary/10 py-2 border border-primary/30 hover:border-primary rounded-lg w-full text-primary transition-all duration-300 cursor-pointer"
              >
                Voltar
              </button>
            </div>
          </Form>
        </div>
      </FixedModal>
    </>
  );
};

export default Client;
