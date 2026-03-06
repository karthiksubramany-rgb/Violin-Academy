import React from 'react';
import { FileText, CheckCircle, Clock, Globe, Shield, Zap, Target, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const Guidelines: React.FC = () => {
  const sections = [
    {
      title: "1. Mentorship Structure",
      icon: <Target className="w-5 h-5" />,
      content: "Mentorship is conducted through weekly private sessions under a structured progression model. Each monthly cycle includes four (4) live sessions scheduled at a mutually agreed time."
    },
    {
      title: "2. Subscription & Enrollment",
      icon: <Globe className="w-5 h-5" />,
      content: "Enrollment operates on a monthly subscription basis. Subscription confirms commitment to the assigned placement level and scheduled weekly session."
    },
    {
      title: "3. Scheduling & Attendance",
      icon: <Clock className="w-5 h-5" />,
      content: "Students are expected to attend sessions consistently to ensure measurable progress. Timeliness is essential to maintain structured flow."
    },
    {
      title: "4. Rescheduling Policy",
      icon: <Zap className="w-5 h-5" />,
      content: "Students may request rescheduling with a minimum of 24 hours prior notice. Sessions missed without advance notice are not eligible for rescheduling."
    },
    {
      title: "5. Instructor Commitments",
      icon: <Shield className="w-5 h-5" />,
      content: "If a session must be rescheduled due to instructor availability, advance notice will be provided wherever possible. In rare cases of unforeseen absence, an additional compensatory session will be arranged."
    },
    {
      title: "6. Technical Requirements",
      icon: <Globe className="w-5 h-5" />,
      content: "Students are responsible for maintaining stable internet connectivity and a suitable learning environment. Time lost due to technical issues from the student’s end cannot be extended."
    },
    {
      title: "7. Practice & Progress",
      icon: <CheckCircle className="w-5 h-5" />,
      content: "Consistent practice between sessions is essential. Students are expected to demonstrate preparation and progressive improvement."
    },
    {
      title: "8. Cancellation",
      icon: <XCircle className="w-5 h-5" />,
      content: "Subscriptions may be cancelled prior to the next billing cycle. Once a cycle has commenced, sessions within that cycle remain scheduled."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-stone-900" />
        </div>
        <h2 className="text-4xl font-serif italic text-stone-900">Guidelines & Procedures</h2>
        <p className="text-stone-500 max-w-2xl mx-auto">
          The following guidelines ensure clarity, structure, and consistency in the Private Violin Mentorship program.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-stone-50 rounded-lg text-stone-600">
                {section.icon}
              </div>
              <h3 className="text-lg font-serif italic text-stone-900">{section.title}</h3>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-3xl text-center">
        <p className="text-emerald-800 font-medium italic">
          "Enrollment confirms acknowledgment of the above mentorship guidelines."
        </p>
      </div>
    </div>
  );
};
