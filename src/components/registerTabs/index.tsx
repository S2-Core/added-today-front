"use client";

import { Dispatch, SetStateAction } from "react";
import { BiSolidLock } from "react-icons/bi";
import { motion, easeOut } from "motion/react";

import Container from "../container";
import Loading from "../loading";

import { IStage } from "@/app/register/_client";

interface IProps {
  stage: IStage;
  unlocked2: boolean;
  finalSubmitted: boolean;
  loading: boolean;
  setStage: Dispatch<SetStateAction<IStage>>;
}

const RegisterTabs = ({
  stage,
  unlocked2,
  finalSubmitted,
  loading,
  setStage,
}: IProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const goToStage = (target: IStage): void => {
    if (target === 1) {
      setStage(1);

      return;
    }

    if (target === 2) {
      if (!unlocked2) return;

      setStage(2);

      return;
    }

    if (target === 3) {
      if (!finalSubmitted) return;

      setStage(3);
    }
  };

  return (
    <Container Tag="div" className="grid grid-cols-3 py-0! select-none">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="contents"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-3">
          <div
            className={`hidden md:flex rounded-l h-2 ${unlocked2 ? "bg-primary" : "bg-secondary rounded-r"}`}
          />

          <button
            type="button"
            onClick={() => goToStage(1)}
            disabled={!unlocked2 || stage === 1 || loading || finalSubmitted}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              unlocked2 && stage !== 1 && !loading && !finalSubmitted
                ? "cursor-pointer"
                : stage === 1
                  ? "cursor-default"
                  : "cursor-not-allowed"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-white text-sm/normal ${
                stage === 1 ? "bg-primary" : "bg-secondary"
              }`}
            >
              {loading ? (
                <Loading className="w-2 h-2 text-white" />
              ) : finalSubmitted ? (
                <BiSolidLock />
              ) : (
                1
              )}
            </span>

            <span
              className={`hidden sm:flex ${stage === 1 ? "text-foreground" : "text-foreground/50"}`}
            >
              Identidade
            </span>
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-3">
          <div
            className={[
              "hidden md:flex h-2",
              finalSubmitted
                ? "bg-primary"
                : unlocked2
                  ? "bg-secondary"
                  : "bg-transparent",
              !finalSubmitted ? "rounded-r" : "",
            ].join(" ")}
          />

          <button
            type="button"
            onClick={() => goToStage(2)}
            disabled={!unlocked2 || stage === 2 || loading || finalSubmitted}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              unlocked2 && stage !== 2 && !loading && !finalSubmitted
                ? "cursor-pointer"
                : stage === 2
                  ? "cursor-default"
                  : "cursor-not-allowed"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                unlocked2
                  ? `text-white ${stage === 2 ? "bg-primary" : "bg-secondary"}`
                  : "bg-transparent border-foreground/50 border text-foreground/50"
              }`}
            >
              {loading ? (
                <Loading className="w-2 h-2 text-white" />
              ) : finalSubmitted ? (
                <BiSolidLock />
              ) : (
                2
              )}
            </span>

            <span
              className={`hidden sm:flex ${stage === 2 ? "text-foreground" : "text-foreground/50"}`}
            >
              Conta
            </span>
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-col gap-3">
          <div
            className={`hidden md:flex h-2 ${finalSubmitted ? "bg-secondary" : "bg-transparent"} rounded-r`}
          />

          <button
            type="button"
            onClick={() => goToStage(3)}
            disabled={!finalSubmitted || stage === 3}
            className={`flex justify-center md:justify-start items-center gap-2 mt-5 md:mt-0 font-medium text-foreground ${
              finalSubmitted && stage !== 3
                ? "cursor-pointer"
                : stage === 3
                  ? "cursor-default"
                  : "cursor-not-allowed"
            }`}
          >
            <span
              className={`flex justify-center items-center rounded-full w-8 h-8 text-sm/normal ${
                finalSubmitted
                  ? `text-white ${stage === 3 ? "bg-primary" : "bg-secondary"}`
                  : "bg-transparent border-foreground/50 border text-foreground/50"
              }`}
            >
              3
            </span>

            <span
              className={`hidden sm:flex ${stage === 3 ? "text-foreground" : "text-foreground/50"}`}
            >
              Checkout
            </span>
          </button>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default RegisterTabs;
