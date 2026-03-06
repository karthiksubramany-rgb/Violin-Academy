import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { VideoTutorial } from '../types';

export const videoService = {
  async uploadVideo(file: File, title: string, description: string, teacherId: string) {
    const storageRef = ref(storage, `videos/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const videoUrl = await getDownloadURL(snapshot.ref);

    const videoData = {
      title,
      description,
      videoUrl,
      teacherId,
      createdAt: new Timestamp(Date.now() / 1000, 0).toDate().toISOString()
    };

    return await addDoc(collection(db, 'videos'), videoData);
  },

  subscribeToVideos(callback: (videos: VideoTutorial[]) => void) {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VideoTutorial)));
    });
  }
};

import { Timestamp } from 'firebase/firestore';
