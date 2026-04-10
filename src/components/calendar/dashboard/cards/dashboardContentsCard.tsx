import { motion } from "motion/react";

import { ContentType } from "@/constants/calendar";
import AnimatedNumber from "@/components/ui/animatedNumber";
import { IDashboard } from "@/contexts/calendar/interfaces";

import DashboardCard from "../dashboardCard";
import { getContentCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatCountLabel } from "../dashboardValue.utils";

interface IProps {
  contentsCount: number;
  contentsByType: IDashboard["contentsByType"];
  index: number;
}

const DashboardContentsCard = ({
  contentsCount,
  contentsByType,
  index,
}: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getContentCardIcon()}
      iconContainerClassName="bg-blue-500/30 text-blue-500"
    >
      {(isInView) => (
        <>
          <motion.span
            key={`contents-count-${contentsCount}`}
            {...dashboardValueMotionProps}
            className={[
              "text-center text-lg lg:text-start",
              contentsCount ? "font-bold" : "",
            ].join(" ")}
          >
            <AnimatedNumber
              value={contentsCount}
              duration={650}
              shouldAnimate={isInView}
              formatter={(animatedValue) =>
                contentsCount
                  ? formatCountLabel(
                      Math.floor(animatedValue),
                      "conteúdo",
                      "conteúdos",
                    )
                  : "Nenhum conteúdo no período"
              }
            />
          </motion.span>

          {!!contentsByType.length && (
            <motion.span
              {...dashboardValueMotionProps}
              transition={{
                ...dashboardValueMotionProps.transition,
                delay: 0.06,
              }}
              className="text-center text-sm text-foreground/70 lg:text-start"
            >
              {contentsByType.map(({ contentType, count }, itemIndex) => (
                <span
                  key={`${contentType}-${itemIndex}`}
                >{`${count} ${ContentType[contentType]}${itemIndex !== contentsByType.length - 1 ? " | " : ""}`}</span>
              ))}
            </motion.span>
          )}
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardContentsCard;
