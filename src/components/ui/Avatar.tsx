import { User } from 'lucide-react';

type AvatarSize = 'small' | 'default' | 'large';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  small: 'w-8 h-8',
  default: 'w-10 h-10',
  large: 'w-16 h-16',
};

const iconSizes: Record<AvatarSize, string> = {
  small: 'w-4 h-4',
  default: 'w-5 h-5',
  large: 'w-8 h-8',
};

export function Avatar({ src, alt = 'User', size = 'default', className = '' }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`
          ${sizeStyles[size]}
          rounded-full object-cover
          bg-slate-100 dark:bg-slate-800
          ${className}
        `}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeStyles[size]}
        rounded-full
        bg-slate-100 dark:bg-slate-800
        flex items-center justify-center
        ${className}
      `}
    >
      <User className={`${iconSizes[size]} text-slate-400 dark:text-slate-500`} />
    </div>
  );
}