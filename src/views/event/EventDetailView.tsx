import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CapacityBar } from '@/components/ui/CapacityBar';
import { StatusBadge, RoleBadge } from '@/components/ui/Badge';
import { Spinner } from '@/components/ui/Spinner';
import { Avatar } from '@/components/ui/Avatar';
import { useEvent } from '@/hooks/useEvent';
import { useAuth } from '@/hooks/useAuth';
import { eventService } from '@/services/eventService';
import { ROUTES } from '@/config/routes';
import type { EventParticipant } from '@/types/event.types';

export function EventDetailView() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { event, participants, isLoading, error, refetch } = useEvent(eventId);

  // Check user's participation status
  const userParticipant = participants.find(p => p.id === user?.uid);
  const isOwner = event?.ownerId === user?.uid;
  const isJoined = userParticipant?.status === 'joined';
  const isWaitlisted = userParticipant?.status === 'waitlisted';
  const isInvited = userParticipant?.status === 'invited_pending';

  // Group participants by status
  const joinedParticipants = participants.filter(p => p.status === 'joined');
  const invitedParticipants = participants.filter(p => p.status === 'invited_pending');
  const waitlistedParticipants = participants
    .filter(p => p.status === 'waitlisted')
    .sort((a, b) => (a.waitlistPosition || 0) - (b.waitlistPosition || 0));

  const handleJoin = async () => {
    if (!eventId || !user) return;
    try {
      await eventService.joinEvent(eventId, user.uid);
      refetch();
    } catch (err) {
      console.error('Failed to join event:', err);
    }
  };

  const handleLeave = async () => {
    if (!eventId || !user) return;
    try {
      await eventService.leaveEvent(eventId, user.uid);
      refetch();
    } catch (err) {
      console.error('Failed to leave event:', err);
    }
  };

  const handleOpenMaps = () => {
    if (!event) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${event.venueName}, ${event.formattedAddress}`
    )}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <PageLayout showBack showBottomNav={false}>
        <div className="flex justify-center py-12">
          <Spinner size="large" />
        </div>
      </PageLayout>
    );
  }

  if (error || !event) {
    return (
      <PageLayout showBack showBottomNav={false}>
        <div className="text-center py-12">
          <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            Event not found
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            This event may have been deleted or you don't have access.
          </p>
          {error && (
            <p className="text-sm text-red-500 mb-4">{error.message}</p>
          )}
          <Button onClick={() => navigate(ROUTES.HOME)}>Go Home</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showBack showBottomNav={false}>
      <div className="space-y-6 pb-20">
        {/* Event Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {event.name}
            </h1>
            <StatusBadge status={event.status} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Organized by {isOwner ? 'you' : 'event owner'}
          </p>
        </div>

        {/* Event Info */}
        <Card>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span>{format(event.date, 'EEEE, MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span>
                {format(event.date, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
              </span>
            </div>
            <div
              className="flex items-start gap-3 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400"
              onClick={handleOpenMaps}
            >
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">{event.venueName}</p>
                <p className="text-sm">{event.formattedAddress}</p>
              </div>
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
            </div>
          </div>
        </Card>

        {/* Description */}
        {event.description && (
          <Card>
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
              Description
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
              {event.description}
            </p>
          </Card>
        )}

        {/* Capacity */}
        <Card>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-3">
            Capacity
          </h3>
          <CapacityBar current={event.joinedCount} max={event.maxPlayers} />
        </Card>

        {/* Participants */}
        <Card>
          <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-3">
            Participants
          </h3>

          {/* Joined */}
          {joinedParticipants.length > 0 ? (
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Joined ({joinedParticipants.length})
              </p>
              {joinedParticipants.map(participant => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  isOwner={participant.id === event.ownerId}
                  isAdmin={event.adminIds?.includes(participant.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
              No participants yet. Be the first to join!
            </p>
          )}

          {/* Invited - Pending */}
          {invitedParticipants.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Invited ({invitedParticipants.length})
              </p>
              {invitedParticipants.map(participant => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  isOwner={false}
                  isAdmin={false}
                />
              ))}
            </div>
          )}

          {/* Waitlisted */}
          {waitlistedParticipants.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                Waitlist ({waitlistedParticipants.length})
              </p>
              {waitlistedParticipants.map(participant => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  isOwner={false}
                  isAdmin={false}
                  waitlistPosition={participant.waitlistPosition}
                />
              ))}
            </div>
          )}
        </Card>

        {/* Event Code */}
        {event.eventCode && (
          <Card>
            <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 mb-2">
              Event Code
            </h3>
            <p className="text-lg font-mono font-bold text-teal-600 dark:text-teal-400">
              {event.eventCode}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Share this code with others to let them join
            </p>
          </Card>
        )}

        {/* Sticky Action Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-lg mx-auto">
            {event.status !== 'active' ? (
              <Button disabled className="w-full">
                Event {event.status}
              </Button>
            ) : isJoined ? (
              <Button variant="secondary" onClick={handleLeave} className="w-full">
                Leave Event
              </Button>
            ) : isWaitlisted ? (
              <Button variant="secondary" onClick={handleLeave} className="w-full">
                Leave Waitlist (Position #{userParticipant?.waitlistPosition})
              </Button>
            ) : isInvited ? (
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleLeave} className="flex-1">
                  Decline
                </Button>
                <Button onClick={handleJoin} className="flex-1">
                  Accept Invitation
                </Button>
              </div>
            ) : (
              <Button onClick={handleJoin} className="w-full">
                {event.joinedCount >= event.maxPlayers ? 'Join Waitlist' : 'Join Event'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Helper component for participant rows
function ParticipantRow({
  participant,
  isOwner,
  isAdmin,
  waitlistPosition,
}: {
  participant: EventParticipant;
  isOwner: boolean;
  isAdmin: boolean;
  waitlistPosition?: number | null;
}) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Avatar userId={participant.id} size="small" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
          User {participant.id.slice(0, 8)}...
        </p>
        {waitlistPosition && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Position #{waitlistPosition}
          </p>
        )}
      </div>
      <div className="flex gap-1">
        {isOwner && <RoleBadge role="owner" />}
        {isAdmin && !isOwner && <RoleBadge role="admin" />}
      </div>
    </div>
  );
}