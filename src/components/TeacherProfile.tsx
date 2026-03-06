import React from 'react';
import { Award, BookOpen, Music, Star, X } from 'lucide-react';
import { motion } from 'motion/react';

interface TeacherProfileProps {
  onClose?: () => void;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ onClose }) => {
  const qualifications = [
    { title: "Senior Grade Certification", institution: "Karnataka Board" },
    { title: "Western Music Theory", institution: "University of Edinburgh, UK", score: "98%" },
    { title: "Developing Musicianship", institution: "Berklee College of Music, USA", score: "100%" },
    { title: "Teaching the Violin and Viola", institution: "Northwestern University, USA", score: "Distinction" },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 max-w-4xl w-full mx-auto">
      <div className="relative h-64 bg-stone-900 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/violin-teacher/1200/600" 
          alt="Karthik Subramany" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="absolute bottom-8 left-8 flex items-end gap-6">
          <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl bg-stone-100">
            <img 
              src="https://picsum.photos/seed/karthik/400/400" 
              alt="Karthik Subramany" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mb-2">
            <h2 className="text-4xl font-serif italic text-white">Karthik Subramany</h2>
            <p className="text-stone-300 flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span>International Classical Violinist & Mentor</span>
            </p>
          </div>
        </div>
      </div>

      <div className="p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
              <UserIcon className="w-3 h-3" />
              About the Tutor
            </h3>
            <div className="text-stone-600 leading-relaxed space-y-4 font-serif text-lg italic">
              <p>
                Karthik Subramany is an internationally recognised Indian classical violinist with over two decades of performance and teaching experience. He began learning the violin at the age of five and gave his first public performance at the age of nine at the Ganesh Temple in Bangalore.
              </p>
              <p>
                He received rigorous training in Carnatic classical music under eminent musicians including Sri M. Chennakeshavan (disciple of Dr. M. Balamuralikrishna) and Vidwan R. S. Ramakanth, son of Sangeetha Kalanidhi Sri R. K. Srikantan.
              </p>
              <p>
                Throughout his musical journey, Karthik has participated in numerous competitions and has been the recipient of several awards and recognitions.
              </p>
              <p>
                While deeply rooted in Carnatic classical tradition, his versatility extends to Bollywood compositions, fusion, ghazals, and Irish folk music.
              </p>
              <p>
                He currently serves as a Community Mentor for Northwestern University’s violin teacher program on Coursera. Karthik teaches at established music institutions and conducts private online violin mentorship for students worldwide.
              </p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
              <Award className="w-3 h-3" />
              Qualifications
            </h3>
            <div className="space-y-4">
              {qualifications.map((q, i) => (
                <div key={i} className="p-4 bg-stone-50 rounded-2xl border border-black/5">
                  <p className="text-sm font-bold text-stone-900">{q.title}</p>
                  <p className="text-xs text-stone-500 mt-1">{q.institution}</p>
                  {q.score && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                      {q.score}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
              <Music className="w-3 h-3" />
              Specializations
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Carnatic Classical', 'Bollywood', 'Fusion', 'Ghazals', 'Irish Folk'].map(s => (
                <span key={s} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full border border-black/5">
                  {s}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

import { User as UserIcon } from 'lucide-react';
