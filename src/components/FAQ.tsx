import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: "What is TEDx?",
    answer: "TEDx is a grassroots initiative, created in the spirit of TED's overall mission to research and discover 'ideas worth spreading.' TEDx brings the spirit of TED to local communities around the globe through independently organized TEDx events."
  },
  {
    question: "Why should I attend?",
    answer: "Attending TEDxAchievers will give you the opportunity to hear from incredible thinkers and doers, network with like-minded individuals, and be inspired by fresh ideas that can spark meaningful change in your life and community."
  },
  {
    question: "Would we be buying tickets? And how much?",
    answer: "Yes, tickets will be available for purchase. Pricing details and ticket tiers will be announced shortly, so stay tuned!"
  },
  {
    question: "When and where is the event?",
    answer: "TEDxAchievers is coming soon to Achievers University. The exact date, hall details, and schedule will be communicated to ticket holders."
  },
  {
    question: "Is there a virtual attendance option?",
    answer: "Yes, we will be providing a high-quality live stream of the main stage events for those who cannot attend in person. Virtual tickets will be made available soon."
  },
  {
    question: "Are tickets refundable?",
    answer: "Tickets are non-refundable, but they are fully transferable. If you can no longer attend, you may transfer your ticket to someone else up to 48 hours before the event."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={`text-xl font-semibold transition-colors duration-300 pr-8 ${isOpen ? 'text-red-500' : 'text-gray-200 group-hover:text-white'}`}>
          {question}
        </span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 p-2 rounded-full border transition-colors duration-300 ${isOpen ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/30'}`}
        >
          {isOpen ? <FiMinus className="text-xl" /> : <FiPlus className="text-xl" />}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-400 font-mono text-base text-sm leading-relaxed max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0a0a0a] py-24 md:py-32 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-30">
        
        <div className="text-center mb-16 md:mb-24">
          <span className="text-gray-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-4">
            [Got Questions?]
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Frequently Asked <span className="text-gray-500">Questions</span>
          </h2>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 md:p-12 shadow-2xl">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FAQ;
