import { Loader2 } from 'lucide-react';

type SpinnerSize = 'small' | 'default' | 'large';

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  small: 'w-4 h-4',
  default: 'w-6 h-6',
  large: 'w-10 h-10',
};

export function Spinner({ size = 'default', className = '' }: SpinnerProps) {
  return (
    <Loader2
      className={`
        ${sizeStyles[size]}
        animate-spin
        text-teal-600 dark:text-teal-400
        ${className}
      `}
    />
  );
}

// Full page loading spinner
export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="large" />
    </div>
  );
}