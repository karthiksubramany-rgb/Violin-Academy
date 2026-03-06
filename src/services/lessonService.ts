import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot,
  Timestamp,
  orderBy,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { AvailabilitySlot, Lesson, UserProfile } from '../types';

export const lessonService = {
  async getAvailability(teacherId: string) {
    const q = query(
      collection(db, 'availability'),
      where('teacherId', '==', teacherId),
      where('isBooked', '==', false),
      orderBy('startTime', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AvailabilitySlot));
  },

  subscribeToAvailability(teacherId: string, callback: (slots: AvailabilitySlot[]) => void) {
    const q = query(
      collection(db, 'availability'),
      where('teacherId', '==', teacherId),
      where('isBooked', '==', false),
      orderBy('startTime', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AvailabilitySlot)));
    });
  },

  async bookLesson(lesson: Omit<Lesson, 'id'>, slotId: string) {
    const lessonRef = await addDoc(collection(db, 'lessons'), lesson);
    const slotRef = doc(db, 'availability', slotId);
    await updateDoc(slotRef, { isBooked: true });
    return lessonRef.id;
  },

  subscribeToUserLessons(userId: string, role: 'student' | 'teacher', callback: (lessons: Lesson[]) => void) {
    const field = role === 'student' ? 'studentId' : 'teacherId';
    const q = query(
      collection(db, 'lessons'),
      where(field, '==', userId),
      orderBy('startTime', 'desc')
    );
    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson)));
    });
  },

  async addAvailabilitySlot(slot: Omit<AvailabilitySlot, 'id'>) {
    return await addDoc(collection(db, 'availability'), slot);
  }
};
