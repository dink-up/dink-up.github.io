import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { userService } from './userService';

const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export const authService = {
  // Sign up with email and password
  async signUpWithEmail(email: string, password: string, displayName: string): Promise<FirebaseUser> {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
    await userService.createUser(user.uid, displayName, user.photoURL);
    return user;
  },

  // Sign in with email and password
  async signInWithEmail(email: string, password: string): Promise<FirebaseUser> {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  // Sign in with Google
  async signInWithGoogle(): Promise<FirebaseUser> {
    const { user } = await signInWithPopup(auth, googleProvider);
    // Create or update user in Firestore
    await userService.createOrUpdateUser(user.uid, user.displayName || 'User', user.photoURL);
    return user;
  },

  // Sign in with Microsoft
  async signInWithMicrosoft(): Promise<FirebaseUser> {
    const { user } = await signInWithPopup(auth, microsoftProvider);
    // Create or update user in Firestore
    await userService.createOrUpdateUser(user.uid, user.displayName || 'User', user.photoURL);
    return user;
  },

  // Sign out
  async signOut(): Promise<void> {
    await firebaseSignOut(auth);
  },

  // Get current user
  getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  },
};