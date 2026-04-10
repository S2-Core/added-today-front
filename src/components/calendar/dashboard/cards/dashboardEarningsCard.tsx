import { motion } from "motion/react";

import AnimatedNumber from "@/components/ui/animatedNumber";

import DashboardCard from "../dashboardCard";
import { getEarningsCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatDashboardCurrencyFromCents } from "../dashboardValue.utils";

interface IProps {
  earningsAmountCents: number;
  currency: string;
  index: number;
}

const DashboardEarningsCard = ({
  earningsAmountCents,
  currency,
  index,
}: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getEarningsCardIcon()}
      iconContainerClassName="bg-success-light/30 text-success"
      accentClassName="bg-success-light/20"
    >
      {(isInView) => (
        <>
          <motion.span
            {...dashboardValueMotionProps}
            className="text-center text-sm font-bold text-success lg:text-start"
          >
            Ganhos totais
          </motion.span>

          <motion.span
            key={`earnings-${earningsAmountCents}`}
            {...dashboardValueMotionProps}
            transition={{
              ...dashboardValueMotionProps.transition,
              delay: 0.04,
            }}
            className="text-center text-2xl font-bold text-success lg:text-start"
          >
            <AnimatedNumber
              value={earningsAmountCents / 100}
              duration={1100}
              shouldAnimate={isInView}
              formatter={(animatedValue) =>
                formatDashboardCurrencyFromCents(
                  Math.round(animatedValue * 100),
                  currency,
                )
              }
            />
          </motion.span>
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardEarningsCard;
