export const ROUTES = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Main tabs
  HOME: '/',
  DISCOVER: '/discover',
  PROFILE: '/profile',
  
  // Events
  EVENT_DETAIL: '/event/:eventId',
  CREATE_EVENT: '/event/create',
  EDIT_EVENT: '/event/:eventId/edit',
  
  // Lists
  LISTS: '/lists',
  LIST_DETAIL: '/list/:listId',
  CREATE_LIST: '/list/create',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  
  // Settings
  SETTINGS: '/settings',
} as const;

// Helper function to generate dynamic routes
export const getEventRoute = (eventId: string) => `/event/${eventId}`;
export const getEditEventRoute = (eventId: string) => `/event/${eventId}/edit`;
export const getListRoute = (listId: string) => `/list/${listId}`;