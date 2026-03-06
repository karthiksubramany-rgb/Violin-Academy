import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-bottom border-black/5 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-stone-50/50 transition-colors px-4 rounded-xl group"
      >
        <span className="text-lg font-serif italic text-stone-900 group-hover:text-stone-700 transition-colors">
          {question}
        </span>
        <div className={cn(
          "p-2 rounded-full transition-all",
          isOpen ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-400"
        )}>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-8 px-4 text-stone-600 leading-relaxed font-sans">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I register for Private Online Violin Mentorship via Vibrato Violin Academy?",
      answer: "Enrollment follows a structured placement process. Prospective students submit an application form. Based on experience level and goals, an appropriate mentorship placement is assigned. Enrollment is confirmed upon activation of the subscription."
    },
    {
      question: "Is there a trial or taster session available?",
      answer: "Due to limited weekly intake and structured scheduling, trial sessions might be offered depending on the availability of the time slots but not guaranteed. Placement is assigned after application review to ensure serious commitment and continuity."
    },
    {
      question: "How many students are there per class?",
      answer: "All sessions are conducted as private 1-to-1 mentorship. This ensures focused attention, technical correction, and structured progression."
    },
    {
      question: "What if I need to reschedule a session?",
      answer: "Rescheduling requests must be communicated at least 24 hours in advance. Sessions missed without prior notice are not eligible for rescheduling."
    },
    {
      question: "If I miss a session, will it be compensated?",
      answer: "Sessions missed without prior notice cannot be compensated. In the case of advance notice, rescheduling may be arranged within the same monthly cycle, subject to availability."
    },
    {
      question: "What are the technical requirements?",
      answer: (
        <div className="space-y-2">
          <p>Students require:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Stable high-speed internet connection</li>
            <li>Laptop or desktop with webcam</li>
            <li>Quiet practice environment</li>
            <li>Properly sized violin</li>
            <li>Metronome and Shruti/Tanpura app</li>
          </ul>
        </div>
      )
    },
    {
      question: "What is the minimum age requirement?",
      answer: "Students aged 8 and above are eligible. There is no upper age limit for dedicated learners."
    },
    {
      question: "Do I need prior musical knowledge?",
      answer: "No prior knowledge is required. Beginners receive structured foundational training. Students with prior experience will be assessed and placed at the appropriate level."
    },
    {
      question: "Are learning materials provided?",
      answer: "Yes. All required notation materials and practice references are provided digitally as part of the mentorship program."
    },
    {
      question: "How is this mentorship different from other online music classes?",
      answer: "Unlike generic online classes that follow fixed curriculum templates, this mentorship model emphasizes structured progression, personalized correction, and long-term skill development. Each student’s progress is monitored closely to ensure measurable improvement."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-stone-900" />
        </div>
        <h2 className="text-4xl font-serif italic text-stone-900">Frequently Asked Questions</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          Everything you need to know about the mentorship program and our academy policies.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-xl shadow-stone-200/50">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <div className="bg-stone-900 rounded-3xl p-12 text-center text-white space-y-6">
        <h3 className="text-2xl font-serif italic">Still have questions?</h3>
        <p className="text-stone-400 max-w-md mx-auto">
          If you couldn't find the answer you were looking for, feel free to reach out to us directly.
        </p>
        <button className="px-8 py-4 bg-white text-stone-900 rounded-full font-bold hover:bg-stone-100 transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
};
