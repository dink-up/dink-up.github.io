import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/config/firebase';

export const storageService = {
  // Upload profile photo
  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const fileExtension = file.name.split('.').pop();
    const storageRef = ref(storage, `profile-photos/${userId}.${fileExtension}`);
    
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    
    return downloadUrl;
  },

  // Delete profile photo
  async deleteProfilePhoto(_userId: string, photoUrl: string): Promise<void> {
    try {
      // Extract the path from the URL
      const storageRef = ref(storage, photoUrl);
      await deleteObject(storageRef);
    } catch (error) {
      // Ignore if file doesn't exist
      console.error('Error deleting profile photo:', error);
    }
  },

  // Upload any file
  async uploadFile(path: string, file: File): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  },

  // Get download URL
  async getUrl(path: string): Promise<string> {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  },
};