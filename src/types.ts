export type UserRole = 'student' | 'teacher';
export type Currency = 'USD' | 'GBP' | 'INR';
export type SubscriptionStatus = 'none' | 'weekly' | 'monthly';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  currency: Currency;
  subscriptionStatus: SubscriptionStatus;
  photoURL?: string;
}

export interface AvailabilitySlot {
  id: string;
  teacherId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isBooked: boolean;
}

export interface Lesson {
  id: string;
  studentId: string;
  teacherId: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  price: number;
  currency: Currency;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  teacherId: string;
  createdAt: string;
}
