import React, { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile, AvailabilitySlot, Lesson, VideoTutorial } from './types';
import { lessonService } from './services/lessonService';
import { videoService } from './services/videoService';
import { Calendar } from './components/Calendar';
import { VideoPortal } from './components/VideoPortal';
import { PricingTable, PayPalButtons } from './components/Payments';
import { 
  Music, 
  Calendar as CalendarIcon, 
  Video, 
  CreditCard, 
  LogOut, 
  User as UserIcon,
  ChevronRight,
  Plus,
  ArrowRight,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { parseISO, addMinutes, format } from 'date-fns';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'booking' | 'videos' | 'account'>('booking');
  
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlotTime, setNewSlotTime] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  const [newSlotDuration, setNewSlotDuration] = useState(30);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Student',
            role: 'student',
            currency: 'USD',
            subscriptionStatus: 'none',
            photoURL: firebaseUser.photoURL || undefined
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (profile) {
      const unsubSlots = lessonService.subscribeToAvailability('TEACHER_ID', setSlots);
      const unsubLessons = lessonService.subscribeToUserLessons(profile.uid, profile.role, setLessons);
      const unsubVideos = videoService.subscribeToVideos(setVideos);
      
      return () => {
        unsubSlots();
        unsubLessons();
        unsubVideos();
      };
    }
  }, [profile]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleBookLesson = async () => {
    if (!profile || !selectedSlot) return;

    const duration = Math.round((new Date(selectedSlot.endTime).getTime() - new Date(selectedSlot.startTime).getTime()) / 60000);
    let price = 25;
    if (profile.currency === 'INR') price = duration <= 30 ? 900 : 1500;
    else if (profile.currency === 'GBP') price = duration <= 30 ? 20 : 40;
    else price = duration <= 30 ? 25 : 50;

    const lesson: Omit<Lesson, 'id'> = {
      studentId: profile.uid,
      teacherId: selectedSlot.teacherId,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      duration,
      price,
      currency: profile.currency,
      status: 'scheduled'
    };

    await lessonService.bookLesson(lesson, selectedSlot.id);
    setSelectedSlot(null);
    setShowPayment(false);
  };

  const handleUploadVideo = async (file: File, title: string, description: string) => {
    if (!profile || profile.role !== 'teacher') return;
    await videoService.uploadVideo(file, title, description, profile.uid);
  };

  const handleAddSlot = async () => {
    if (!profile || profile.role !== 'teacher') return;
    const start = new Date(newSlotTime);
    const end = addMinutes(start, newSlotDuration);
    
    await lessonService.addAvailabilitySlot({
      teacherId: profile.uid,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      isBooked: false
    });
    setShowAddSlot(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Music className="w-12 h-12 text-stone-300" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-stone-900 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-stone-200">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-serif italic text-stone-900 tracking-tight">Vibrato</h1>
            <p className="text-stone-500 text-lg">Your journey to violin mastery starts here.</p>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200 border border-black/5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-medium text-stone-900">Welcome Back</h2>
              <p className="text-sm text-stone-400">Sign in to manage your lessons and tutorials.</p>
            </div>
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all font-medium shadow-lg shadow-stone-200"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <div className="pt-4 flex items-center justify-center gap-6 text-stone-300">
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Expert Tutors</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>HD Tutorials</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-bottom border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center shadow-lg shadow-stone-100">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-serif italic tracking-tight">Vibrato</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'booking', icon: CalendarIcon, label: 'Lessons' },
              { id: 'videos', icon: Video, label: 'Tutorials' },
              { id: 'account', icon: UserIcon, label: 'Account' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all py-2 px-1 border-bottom-2",
                  activeTab === tab.id 
                    ? "text-stone-900 border-stone-900" 
                    : "text-stone-400 border-transparent hover:text-stone-600"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">{profile?.displayName}</p>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mt-1">{profile?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400 hover:text-stone-900"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-4xl font-serif italic text-stone-900">Book a Lesson</h2>
                      <p className="text-stone-500 mt-2">Choose a time that works for your schedule.</p>
                    </div>
                    {profile?.role === 'teacher' && (
                      <button
                        onClick={() => setShowAddSlot(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        Add Slot
                      </button>
                    )}
                  </div>
                  <Calendar 
                    slots={slots} 
                    onSelectSlot={setSelectedSlot} 
                    currency={profile?.currency || 'USD'} 
                  />
                </div>

                <div className="w-full md:w-80 space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Your Schedule</h3>
                  <div className="space-y-4">
                    {lessons.length > 0 ? (
                      lessons.map(lesson => (
                        <div key={lesson.id} className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              {lesson.status}
                            </span>
                            <span className="text-xs font-medium text-stone-400">
                              {lesson.duration}m
                            </span>
                          </div>
                          <p className="text-sm font-medium text-stone-900">
                            {new Date(lesson.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center border-2 border-dashed border-stone-200 rounded-3xl">
                        <p className="text-xs text-stone-400 italic">No lessons scheduled yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <VideoPortal 
                videos={videos} 
                isTeacher={profile?.role === 'teacher'} 
                onUpload={handleUploadVideo} 
              />
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="bg-white p-12 rounded-[3rem] border border-black/5 shadow-xl shadow-stone-200/50 flex flex-col md:flex-row items-center gap-12">
                <div className="w-32 h-32 bg-stone-100 rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center">
                  {profile?.photoURL ? (
                    <img src={profile.photoURL} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <UserIcon className="w-12 h-12 text-stone-300" />
                  )}
                </div>
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <h2 className="text-3xl font-serif italic">{profile?.displayName}</h2>
                    <p className="text-stone-500">{profile?.email}</p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 bg-stone-50 rounded-full border border-black/5 text-xs font-bold uppercase tracking-widest text-stone-600">
                      {profile?.role}
                    </div>
                    <div className="px-4 py-2 bg-stone-50 rounded-full border border-black/5 text-xs font-bold uppercase tracking-widest text-stone-600">
                      Currency: {profile?.currency}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-serif italic">Subscription Plans</h3>
                  <p className="text-stone-500 mt-2">Unlock unlimited access to tutorials and priority booking.</p>
                </div>
                <PricingTable 
                  currency={profile?.currency || 'USD'} 
                  onSelect={(plan) => setShowPayment(true)} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif italic">Confirm Lesson</h3>
                  <button onClick={() => setSelectedSlot(null)} className="p-2 hover:bg-stone-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-black/5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <CalendarIcon className="w-6 h-6 text-stone-900" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">
                        {format(parseISO(selectedSlot.startTime), 'EEEE, MMMM do')}
                      </p>
                      <p className="text-xs text-stone-500">
                        {format(parseISO(selectedSlot.startTime), 'h:mm a')} - {format(parseISO(selectedSlot.endTime), 'h:mm a')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl border border-black/5">
                    <span className="text-sm font-medium text-stone-500">Total Price</span>
                    <span className="text-xl font-bold text-stone-900">
                      {profile?.currency === 'INR' ? '₹' : profile?.currency === 'GBP' ? '£' : '$'}
                      {Math.round((new Date(selectedSlot.endTime).getTime() - new Date(selectedSlot.startTime).getTime()) / 60000) <= 30 
                        ? (profile?.currency === 'INR' ? 900 : profile?.currency === 'GBP' ? 20 : 25)
                        : (profile?.currency === 'INR' ? 1500 : profile?.currency === 'GBP' ? 40 : 50)}
                    </span>
                  </div>
                </div>

                {!showPayment ? (
                  <button
                    onClick={() => setShowPayment(true)}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <PayPalButtons 
                    amount={25} 
                    currency={profile?.currency || 'USD'} 
                    type="checkout"
                    onSuccess={handleBookLesson}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showPayment && !selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif italic">Complete Subscription</h3>
                  <button onClick={() => setShowPayment(false)} className="p-2 hover:bg-stone-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <PayPalButtons 
                  amount={90} 
                  currency={profile?.currency || 'USD'} 
                  type="subscribe"
                  onSuccess={() => setShowPayment(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Slot Modal */}
      <AnimatePresence>
        {showAddSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-serif italic">Add Availability</h3>
                  <button onClick={() => setShowAddSlot(false)} className="p-2 hover:bg-stone-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Start Time</label>
                    <input
                      type="datetime-local"
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-stone-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Duration (minutes)</label>
                    <select
                      value={newSlotDuration}
                      onChange={(e) => setNewSlotDuration(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-stone-50 border border-black/5 rounded-xl outline-none focus:ring-2 focus:ring-stone-900"
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleAddSlot}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all shadow-lg"
                >
                  Create Slot
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
