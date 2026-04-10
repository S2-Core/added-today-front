import { ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

interface IProps {
  icon: ReactNode;
  iconContainerClassName?: string;
  accentClassName?: string;
  children: ReactNode | ((isInView: boolean) => ReactNode);
  index?: number;
}

const DashboardCard = ({
  icon,
  iconContainerClassName = "",
  accentClassName = "",
  children,
  index = 0,
}: IProps) => {
  const cardRef = useRef<HTMLLIElement | null>(null);
  const isInView = useInView(cardRef, {
    once: true,
    amount: 0.35,
  });

  return (
    <motion.li
      ref={cardRef}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.05,
      }}
      whileHover={{ y: -2 }}
      className={[
        "flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md transition-shadow duration-300 hover:shadow-lg",
        accentClassName,
      ].join(" ")}
    >
      <div className="flex w-full justify-center lg:justify-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.06 + index * 0.03,
          }}
          className={[
            "w-fit rounded-xl p-3 font-bold transition-transform duration-300",
            iconContainerClassName,
          ].join(" ")}
        >
          {icon}
        </motion.div>
      </div>

      {typeof children === "function" ? children(isInView) : children}
    </motion.li>
  );
};

export default DashboardCard;
