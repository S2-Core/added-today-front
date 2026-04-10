import { motion } from "motion/react";

import { ContentPlatform } from "@/constants/calendar";
import AnimatedNumber from "@/components/ui/animatedNumber";
import { IDashboard } from "@/contexts/calendar/interfaces";
import { IContentCalendarItem } from "@/contexts/calendar/interfaces";

import DashboardCard from "../dashboardCard";
import { getPlatformCardIcon } from "../dashboardIcon.utils";
import { dashboardValueMotionProps } from "../dashboardMotion.constants";
import { formatCountLabel } from "../dashboardValue.utils";

interface IProps {
  contentsCount: number;
  contentsByPlatform: IDashboard["contentsByPlatform"];
  mostUsedPlatform: IContentCalendarItem["platform"] | "OTHER";
  index: number;
}

const DashboardPlatformsCard = ({
  contentsCount,
  contentsByPlatform,
  mostUsedPlatform,
  index,
}: IProps) => {
  return (
    <DashboardCard
      index={index}
      icon={getPlatformCardIcon(mostUsedPlatform)}
      iconContainerClassName="bg-purple-500/30 text-purple-500"
    >
      {(isInView) => (
        <>
          <motion.span
            {...dashboardValueMotionProps}
            className="text-center text-lg lg:text-start"
          >
            {contentsCount ? "Por plataforma" : "Nenhum conteúdo no período"}
          </motion.span>

          {!!contentsByPlatform.length && (
            <motion.div
              {...dashboardValueMotionProps}
              transition={{
                ...dashboardValueMotionProps.transition,
                delay: 0.06,
              }}
              className="flex flex-col gap-2"
            >
              {contentsByPlatform.map(({ platform, count }, itemIndex) => (
                <div
                  key={`${platform}-${count}-${itemIndex}`}
                  className="flex w-full items-center justify-between"
                >
                  <span className="text-foreground/70">
                    {ContentPlatform[platform]}
                  </span>

                  <span className="font-bold">
                    <AnimatedNumber
                      value={count}
                      duration={550}
                      shouldAnimate={isInView}
                      formatter={(animatedValue) =>
                        formatCountLabel(
                          Math.floor(animatedValue),
                          "conteúdo",
                          "conteúdos",
                        )
                      }
                    />
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </DashboardCard>
  );
};

export default DashboardPlatformsCard;
