import { useNavigate } from 'react-router-dom';
import { Plus, Calendar } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ROUTES } from '@/config/routes';

export function HomeView() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate(ROUTES.CREATE_EVENT)} className="flex-1">
            <Plus className="w-5 h-5" />
            Create Event
          </Button>
        </div>

        {/* Next Upcoming Event */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Next Up
          </h2>
          <EmptyState
            icon={Calendar}
            title="No upcoming events"
            description="Create or join an event to get started"
            action={{
              label: 'Create Event',
              onClick: () => navigate(ROUTES.CREATE_EVENT),
            }}
          />
        </section>

        {/* Events You Own */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Your Events
          </h2>
          <Card>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              No events created yet
            </p>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}