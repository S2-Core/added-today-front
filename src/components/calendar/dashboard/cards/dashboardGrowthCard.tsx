import { motion } from "motion/react";

import AnimatedNumber from "@/components/ui/animatedNumber";

import DashboardCard from "../dashboardCard";
import { getGrowthCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatGrowthPercentage } from "../dashboardValue.utils";

interface IProps {
  contentGrowthPercent?: number | null;
  earningsGrowthPercent?: number | null;
  index: number;
}

const DashboardGrowthCard = ({
  contentGrowthPercent,
  earningsGrowthPercent,
  index,
}: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getGrowthCardIcon()}
      iconContainerClassName="bg-error/30 text-error"
    >
      {(isInView) => (
        <>
          <motion.div
            {...dashboardValueMotionProps}
            className="grid w-full grid-cols-2 gap-5"
          >
            <div className="flex flex-col items-center gap-1">
              <motion.span
                key={`content-growth-${contentGrowthPercent ?? 0}`}
                {...dashboardValueMotionProps}
                transition={{
                  ...dashboardValueMotionProps.transition,
                  delay: 0.03,
                }}
                className="text-center text-xl font-bold lg:text-start"
              >
                <AnimatedNumber
                  value={contentGrowthPercent ?? 0}
                  duration={900}
                  shouldAnimate={isInView}
                  formatter={(animatedValue) =>
                    formatGrowthPercentage(animatedValue)
                  }
                />
              </motion.span>

              <span className="text-xs text-foreground/50">Conteúdos</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <motion.span
                key={`earnings-growth-${earningsGrowthPercent ?? 0}`}
                {...dashboardValueMotionProps}
                transition={{
                  ...dashboardValueMotionProps.transition,
                  delay: 0.07,
                }}
                className="text-center text-xl font-bold lg:text-start"
              >
                <AnimatedNumber
                  value={earningsGrowthPercent ?? 0}
                  duration={900}
                  shouldAnimate={isInView}
                  formatter={(animatedValue) =>
                    formatGrowthPercentage(animatedValue)
                  }
                />
              </motion.span>

              <span className="text-xs text-foreground/50">Ganhos</span>
            </div>
          </motion.div>

          <motion.span
            {...dashboardValueMotionProps}
            transition={{
              ...dashboardValueMotionProps.transition,
              delay: 0.08,
            }}
            className="text-center text-sm text-foreground/70 lg:text-start"
          >
            Crescimento do período anterior para o atual
          </motion.span>
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardGrowthCard;
