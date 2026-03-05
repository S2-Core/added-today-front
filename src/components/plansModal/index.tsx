"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";

import FixedModal from "../fixedModal";
import PlanCard from "../planCard";

import { IUIPlan } from "@/contexts/auth/interfaces";

interface IProps {
  isOpen: boolean;
  close: () => void;
  allUIPlans: IUIPlan[] | null;
}

const PlansModal = ({ isOpen, close, allUIPlans }: IProps) => {
  const [navigate] = [useRouter()];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
        <div className="flex gap-2">
          {scrollSnaps.map((_, i) => (
            <button
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

        <div className="relative w-full">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
            className="top-1/2 z-10 absolute flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 -translate-y-1/2 cursor-pointer"
          >
            <FaArrowLeft />
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <ul className="flex gap-4 mr-1 rounded-xl">
              {allUIPlans.map((plan) => (
                <PlanCard
                  key={plan.code}
                  plan={plan}
                  clickable={!plan.isCurrentPlan}
                  onClick={() => {
                    if (plan.isCurrentPlan) return;

                    navigate.push(`/plans/${plan.code}/checkout`);
                  }}
                />
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
            className="top-1/2 right-0 z-10 absolute flex justify-center items-center disabled:opacity-40 border border-foreground/20 rounded-lg w-full max-w-8 h-8 -translate-y-1/2 cursor-pointer"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </FixedModal>
  );
};

export default PlansModal;
