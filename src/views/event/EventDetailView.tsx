import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CapacityBar } from '@/components/ui/CapacityBar';
import { StatusBadge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';

export function EventDetailView() {
  const { eventId } = useParams();

  // Placeholder - will be replaced with actual data fetching
  const isLoading = false;
  const event = null;

  if (isLoading) {
    return (
      <PageLayout showBack showBottomNav={false}>
        <div className="flex justify-center py-12">
          <Spinner size="large" />
        </div>
      </PageLayout>
    );
  }

  if (!event) {
    return (
      <PageLayout showBack showBottomNav={false}>
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            Event not found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This event may have been deleted or you don't have access.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showBack showBottomNav={false}>
      <div className="space-y-6">
        {/* Event Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Event Details
          </h1>
          <StatusBadge status="active" />
        </div>

        {/* Event Info */}
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Calendar className="w-5 h-5" />
              <span>Date will appear here</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Clock className="w-5 h-5" />
              <span>Time will appear here</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin className="w-5 h-5" />
              <span>Location will appear here</span>
            </div>
          </div>
        </Card>

        {/* Capacity */}
        <Card>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-3">
            Capacity
          </h3>
          <CapacityBar current={0} max={8} />
        </Card>

        {/* Participants */}
        <Card>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-3">
            Participants
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
            No participants yet
          </p>
        </Card>

        {/* Action Button */}
        <div className="sticky bottom-4">
          <Button className="w-full">Join Event</Button>
        </div>
      </div>
    </PageLayout>
  );
}