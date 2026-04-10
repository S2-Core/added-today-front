import { motion } from "motion/react";

import AnimatedNumber from "@/components/ui/animatedNumber";

import DashboardCard from "../dashboardCard";
import { getAverageTicketCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatDashboardCurrencyFromCents } from "../dashboardValue.utils";

interface IProps {
  averageEarningPerPubliCents: number;
  currency: string;
  index: number;
}

const DashboardAverageTicketCard = ({
  averageEarningPerPubliCents,
  currency,
  index,
}: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getAverageTicketCardIcon()}
      iconContainerClassName="bg-warning/30 text-warning"
    >
      {(isInView) => (
        <>
          <motion.span
            key={`average-ticket-${averageEarningPerPubliCents}`}
            {...dashboardValueMotionProps}
            className="text-center text-2xl font-bold lg:text-start"
          >
            <AnimatedNumber
              value={averageEarningPerPubliCents / 100}
              duration={1000}
              shouldAnimate={isInView}
              formatter={(animatedValue) =>
                formatDashboardCurrencyFromCents(
                  Math.round(animatedValue * 100),
                  currency,
                )
              }
            />
          </motion.span>

          <motion.span
            {...dashboardValueMotionProps}
            transition={{
              ...dashboardValueMotionProps.transition,
              delay: 0.05,
            }}
            className="text-center text-sm text-foreground/70 lg:text-start"
          >
            Ticket médio por publi no período
          </motion.span>
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardAverageTicketCard;
