interface CapacityBarProps {
  current: number;
  max: number;
  className?: string;
}

export function CapacityBar({ current, max, className = '' }: CapacityBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const isFull = current >= max;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {current} / {max} spots
        </span>
        {isFull && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            Full
          </span>
        )}
      </div>
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`
            h-full rounded-full transition-all duration-300
            ${isFull 
              ? 'bg-amber-500 dark:bg-amber-400' 
              : 'bg-teal-600 dark:bg-teal-400'
            }
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}