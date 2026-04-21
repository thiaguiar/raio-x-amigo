interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6 w-full sm:mb-8">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted-foreground sm:text-sm">
        <span>Pergunta {current} de {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
