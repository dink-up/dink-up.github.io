import { useState, useEffect, useCallback } from 'react';
import { eventService } from '@/services/eventService';
import type { Event, EventParticipant } from '@/types/event.types';

interface UseEventResult {
  event: Event | null;
  participants: EventParticipant[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useEvent(eventId: string | undefined): UseEventResult {
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setEvent(null);
      setParticipants([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch event details
      const eventData = await eventService.getById(eventId);
      setEvent(eventData);

      // Fetch participants if event exists
      if (eventData) {
        const participantData = await eventService.getParticipants(eventId);
        setParticipants(participantData);
      } else {
        setParticipants([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch event'));
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    participants,
    isLoading,
    error,
    refetch: fetchEvent,
  };
}