import { type ReactNode } from 'react';

type BadgeVariant = 
  | 'joined' 
  | 'waitlisted' 
  | 'pending' 
  | 'canceled' 
  | 'owner' 
  | 'admin'
  | 'default';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  joined: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800',
  waitlisted: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  pending: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
  canceled: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800',
  owner: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800',
  admin: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800',
  default: 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        text-xs font-medium
        px-2 py-1 rounded-md
        border
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// Helper component for participant status badges
export function StatusBadge({ status }: { status: string }) {
  const statusVariants: Record<string, BadgeVariant> = {
    joined: 'joined',
    invited_pending: 'pending',
    waitlisted: 'waitlisted',
    declined: 'canceled',
    active: 'joined',
    canceled: 'canceled',
    completed: 'default',
  };

  const statusLabels: Record<string, string> = {
    joined: 'Joined',
    invited_pending: 'Pending',
    waitlisted: 'Waitlisted',
    declined: 'Declined',
    active: 'Active',
    canceled: 'Canceled',
    completed: 'Completed',
  };

  return (
    <Badge variant={statusVariants[status] || 'default'}>
      {statusLabels[status] || status}
    </Badge>
  );
}

// Helper component for role badges
export function RoleBadge({ role }: { role: string }) {
  const roleVariants: Record<string, BadgeVariant> = {
    owner: 'owner',
    admin: 'admin',
    player: 'default',
  };

  const roleLabels: Record<string, string> = {
    owner: 'Owner',
    admin: 'Admin',
  };

  // Don't show badge for regular players
  if (role === 'player') return null;

  return (
    <Badge variant={roleVariants[role] || 'default'}>
      {roleLabels[role] || role}
    </Badge>
  );
}