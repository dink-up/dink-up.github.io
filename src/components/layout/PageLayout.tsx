import { type ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showNotifications?: boolean;
  showBottomNav?: boolean;
  headerRightContent?: ReactNode;
  className?: string;
}

export function PageLayout({
  children,
  title,
  showBack = false,
  showNotifications = true,
  showBottomNav = true,
  headerRightContent,
  className = '',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header
        title={title}
        showBack={showBack}
        showNotifications={showNotifications}
        rightContent={headerRightContent}
      />
      <main
        className={`
          max-w-lg mx-auto
          px-4 py-6
          ${showBottomNav ? 'pb-24' : 'pb-6'}
          ${className}
        `}
      >
        {children}
      </main>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

// Simple page layout without header/nav for auth pages
interface SimpleLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SimpleLayout({ children, className = '' }: SimpleLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <main className={`flex-1 max-w-lg mx-auto w-full px-4 py-8 ${className}`}>
        {children}
      </main>
    </div>
  );
}