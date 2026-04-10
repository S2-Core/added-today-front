import { motion } from "motion/react";

import AnimatedNumber from "@/components/ui/animatedNumber";

import DashboardCard from "../dashboardCard";
import { getCampaignsCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatCountLabel } from "../dashboardValue.utils";

interface IProps {
  campaignsCount: number;
  index: number;
}

const DashboardCampaignsCard = ({ campaignsCount, index }: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getCampaignsCardIcon()}
      iconContainerClassName="bg-blue-700/30 text-blue-700"
    >
      {(isInView) => (
        <>
          <motion.span
            {...dashboardValueMotionProps}
            className={[
              "text-center text-lg lg:text-start",
              campaignsCount ? "font-bold" : "",
            ].join(" ")}
          >
            <AnimatedNumber
              value={campaignsCount}
              duration={650}
              shouldAnimate={isInView}
              formatter={(animatedValue) =>
                campaignsCount
                  ? formatCountLabel(
                      Math.floor(animatedValue),
                      "campanha",
                      "campanhas",
                    )
                  : "Nenhuma campanha no período"
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
            Ativas no período exibido
          </motion.span>
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardCampaignsCard;
