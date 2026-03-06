import React from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Globe, 
  Layers, 
  Music, 
  Smartphone, 
  Star, 
  Target, 
  Users 
} from 'lucide-react';
import { motion } from 'motion/react';

export const Mentorship: React.FC = () => {
  const levels = [
    {
      title: "Level 1 – Foundation",
      duration: "6–8 months",
      items: [
        "Introduction to Carnatic violin",
        "Sruthi tuning and bow control",
        "Sarali, Janti, Dhatu, Alankaras",
        "Geethams and Swarajathis",
        "Basic tonal clarity and coordination"
      ]
    },
    {
      title: "Level 2 – Professional Development",
      duration: "12+ months",
      items: [
        "Varnams (Adi, Ata talas)",
        "Pancharathna krithis of Thyagaraja",
        "Compositions of Muthuswami Dikshitar",
        "Madhyama & Vilamba kala krithis",
        "Raga structure and interpretation",
        "Advanced technical terminology"
      ]
    },
    {
      title: "Level 3 – Advanced Classical Performance",
      duration: "15+ months",
      items: [
        "Rare varnams and krithis",
        "Manodharma (Improvisation)",
        "Kalpana swaras and Neraval",
        "Ragam Thanam Pallavi",
        "Concert-level violin training",
        "Role of violin as solo & accompaniment"
      ]
    }
  ];

  const advantages = [
    "Structured progression from basics to performance level",
    "Practical-first approach with rhythm training from day one",
    "Personal attention – no rotating teachers",
    "PDF notation materials included",
    "Guidance for violin purchase",
    "Mridangam/tabla rhythm tracks provided",
    "Voice recordings for ear training",
    "Training for concerts and recordings",
    "Flexible scheduling with prior notice"
  ];

  const countries = [
    "USA", "UK", "Canada", "Germany", "Netherlands", "France", 
    "Australia", "Singapore", "Saudi Arabia", "Ireland", 
    "Norway", "Africa", "Jamaica", "New Zealand"
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-widest border border-black/5">
          <Star className="w-3 h-3 fill-current" />
          <span>Private Classical Violin Mentorship</span>
        </div>
        <h2 className="text-5xl font-serif italic text-stone-900 tracking-tight leading-tight">
          Online Carnatic Violin Classes
        </h2>
        <p className="text-stone-500 text-lg max-w-2xl mx-auto">
          Private one-to-one online Carnatic/Western violin lessons conducted weekly for students worldwide.
        </p>
      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <section className="space-y-6">
            <h3 className="text-2xl font-serif italic text-stone-900 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-stone-400" />
              About the Mentorship
            </h3>
            <ul className="space-y-4">
              {[
                "Basic training provided in South Indian, Carnatic Classical style",
                "Private one-to-one weekly sessions",
                "Structured Carnatic classical foundation",
                "Practical-focused training with integrated theory",
                "Personalised progression based on student ability",
                "Suitable for ages 8 to 65",
                "Carnatic notation (S R G M) provided in PDF format",
                "Optional video tutorial access"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-600">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-sm italic">
              "Students must have their own violin before enrolling."
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-2xl font-serif italic text-stone-900 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-stone-400" />
              Technical Requirements
            </h3>
            <p className="text-stone-500 text-sm italic">Classes are conducted online via Skype (Zoom alternative available).</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Reliable high-speed internet",
                "Headset with microphone",
                "Quiet practice environment",
                "Metronome app (TalaBox)",
                "Shruthi box / Tanpura app"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-black/5">
                  <div className="w-2 h-2 bg-stone-300 rounded-full" />
                  <span className="text-sm text-stone-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-stone-900 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl">
          <h3 className="text-2xl font-serif italic flex items-center gap-3">
            <Target className="w-6 h-6 text-stone-500" />
            Music Theory Covered
          </h3>
          <div className="space-y-6">
            {[
              "History and structure of Carnatic music",
              "Saptaswaras and Sthayis",
              "Raga classification (Janaka & Janya)",
              "Seven Thaalas and Jaathis",
              "Detailed Ragalakshana studies",
              "Major Composer studies"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-[10px] font-bold text-stone-500 group-hover:bg-stone-700 transition-colors">
                  {i + 1}
                </div>
                <p className="text-stone-300 group-hover:text-white transition-colors">{item}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-stone-800">
            <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mb-4">Featured Composers</p>
            <div className="flex flex-wrap gap-2">
              {["Purandara Dasa", "Thyagaraja", "Muthuswami Dikshitar", "Shyama Shastri"].map(c => (
                <span key={c} className="px-3 py-1 bg-stone-800 rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-tight">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Levels */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-3xl font-serif italic text-stone-900">Structured Curriculum</h3>
          <p className="text-stone-500">A progressive journey from foundation to performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {levels.map((level, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{level.duration}</span>
              </div>
              <h4 className="text-lg font-serif italic text-stone-900 mb-4">{level.title}</h4>
              <ul className="space-y-3">
                {level.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-stone-500">
                    <div className="w-1 h-1 bg-stone-300 rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages & Community */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="space-y-8">
          <h3 className="text-2xl font-serif italic text-stone-900 flex items-center gap-3">
            <Star className="w-6 h-6 text-stone-400" />
            Program Advantages
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {advantages.map((adv, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-stone-700">{adv}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="p-10 bg-stone-100 rounded-[3rem] space-y-8">
            <h3 className="text-2xl font-serif italic text-stone-900 flex items-center gap-3">
              <Globe className="w-6 h-6 text-stone-400" />
              Global Community
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Join a vibrant community of learners from across the globe. Our students currently learn from:
            </p>
            <div className="flex flex-wrap gap-2">
              {countries.map(country => (
                <span key={country} className="px-4 py-2 bg-white rounded-full text-xs font-medium text-stone-600 border border-black/5 shadow-sm">
                  {country}
                </span>
              ))}
            </div>
            <div className="pt-6 flex items-center gap-4 text-stone-400">
              <Users className="w-10 h-10 opacity-20" />
              <p className="text-xs italic">Connecting cultures through the language of music.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
