export type EventVisibility = 'public' | 'code' | 'private';
export type EventJoinType = 'open' | 'invite_only' | 'approval';
export type EventStatus = 'active' | 'canceled' | 'completed';
export type ParticipantStatus = 'joined' | 'invited_pending' | 'waitlisted' | 'declined';
export type ParticipantRole = 'owner' | 'admin' | 'player';

export interface EventLocation {
  venueName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  date: Date;
  endTime: Date;
  maxPlayers: number;
  
  // Location
  venueName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  placeId?: string;
  
  // Visibility & Join Rules
  visibility: EventVisibility;
  joinType: EventJoinType;
  eventCode?: string;
  
  // Status
  status: EventStatus;
  
  // Roles
  ownerId: string;
  adminIds: string[];
  
  // Counts (denormalized)
  joinedCount: number;
  waitlistCount: number;
  
  // System
  createdAt: Date;
  updatedAt: Date;
}

export interface EventParticipant {
  id: string; // Same as userId
  status: ParticipantStatus;
  role: ParticipantRole;
  joinedAt: Date;
  invitedBy?: string;
  waitlistPosition?: number;
}

export interface CreateEventData {
  name: string;
  description?: string;
  date: Date;
  endTime: Date;
  maxPlayers: number;
  venueName: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  placeId?: string;
  visibility: EventVisibility;
  joinType: EventJoinType;
  eventCode?: string;
}

export interface UpdateEventData {
  name?: string;
  description?: string;
  date?: Date;
  endTime?: Date;
  maxPlayers?: number;
  venueName?: string;
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
  visibility?: EventVisibility;
  joinType?: EventJoinType;
  eventCode?: string;
}