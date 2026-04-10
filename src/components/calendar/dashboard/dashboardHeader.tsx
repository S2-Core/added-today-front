interface IProps {
  periodLabel: string;
}

const DashboardHeader = ({ periodLabel }: IProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">Seu desempenho</h2>

      <span className="text-sm text-foreground/60">{periodLabel}</span>
    </div>
  );
};

export default DashboardHeader;
