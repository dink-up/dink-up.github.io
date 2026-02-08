export interface User {
  id: string;
  displayName: string;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  displayName: string;
  photoUrl: string | null;
}