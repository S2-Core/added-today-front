"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

import { useAuth, useBillings } from "@/contexts";

import Container from "@/components/container";
import NavigationTabs from "@/components/navigationTabs";
import PlanCard from "@/components/planCard";
import FixedModal from "@/components/fixedModal";
import Form from "@/components/form";
import Textarea from "@/components/textarea";

const Client = () => {
  const { userCurrentPlan, handleFindUserCurrentPlan } = useAuth();
  const { allUIPlans, handlePlanSubscriptionStatus } = useBillings();

  const [navigate] = [useRouter()];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

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

  if (!allUIPlans) return null;

  return (
    <>
      <Container Tag={"main"} className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Escolha o plano ideal para desbloquear recursos exclusivos, aumentar sua visibilidade e acelerar seu crescimento na plataforma." />

        <div className="flex flex-col items-center gap-5">
          <div className="flex justify-between gap-2 w-full">
            <button
              tabIndex={-1}
              type="button"
              onClick={scrollPrev}
              disabled={!emblaApi?.canScrollPrev()}
              className="md:hidden flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 cursor-pointer"
            >
              <FaArrowLeft />
            </button>

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

            <button
              tabIndex={-1}
              type="button"
              onClick={scrollNext}
              disabled={!emblaApi?.canScrollNext()}
              className="md:hidden flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 cursor-pointer"
            >
              <FaArrowRight />
            </button>
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
                    clickable={!plan.isCurrentPlan}
                    setModal={setModal}
                    onClick={() => {
                      if (plan.isCurrentPlan) return;

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
      </Container>

      <FixedModal isOpen={modal} close={() => setModal(false)}>
        <div className="flex flex-col gap-2">
          <span className="font-title font-bold text-center">
            Deseja cancelar a assinatura?
          </span>

          <Form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="reason"
                className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm select-none"
              >
                <span title="Motivo" className="truncate">
                  Motivo:
                </span>
              </label>

              <div className="relative border border-foreground focus-within:border-tertiary rounded-md text-foreground transition-colors">
                <textarea
                  tabIndex={-1}
                  id="reason"
                  value={reason}
                  onChange={({ target: { value } }) => setReason(value)}
                  className="px-3 py-2 outline-none w-full min-h-30 text-foreground focus:placeholder:text-tertiary/50 placeholder:text-sm transition resize-none"
                />
              </div>
            </div>

            <div className="gap-4 grid grid-cols-2">
              <button
                tabIndex={-1}
                type="button"
                onClick={() => async () => {
                  await handlePlanSubscriptionStatus("ACTIVE");

                  await handleFindUserCurrentPlan();
                }}
                className="hover:bg-error/10 py-2 border border-error/30 hover:border-error rounded-lg w-full text-error transition-all duration-300 cursor-pointer"
              >
                Cancelar plano
              </button>

              <button
                tabIndex={-1}
                type="button"
                onClick={() => async () => {
                  await handlePlanSubscriptionStatus("ACTIVE", reason);

                  await handleFindUserCurrentPlan();
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
