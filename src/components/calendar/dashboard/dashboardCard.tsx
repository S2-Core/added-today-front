import { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  iconContainerClassName?: string;
  accentClassName?: string;
  children: ReactNode;
}

const DashboardCard = ({
  icon,
  iconContainerClassName = "",
  accentClassName = "",
  children,
}: IProps) => {
  return (
    <li
      className={[
        "flex flex-col gap-6 rounded-xl border border-foreground/30 p-5 shadow-md",
        accentClassName,
      ].join(" ")}
    >
      <div className="flex w-full justify-center lg:justify-start">
        <div
          className={[
            "w-fit rounded-xl p-3 font-bold",
            iconContainerClassName,
          ].join(" ")}
        >
          {icon}
        </div>
      </div>

      {children}
    </li>
  );
};

export default DashboardCard;
