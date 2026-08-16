import { motion } from 'framer-motion';
import { Download, Share2, Wallet, QrCode } from 'lucide-react';

const DashboardTickets = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">My Tickets</h1>
        <p className="text-gray-400">View and manage your passes for TEDxAchievers.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Ticket Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="w-full lg:w-2/3 max-w-2xl relative"
        >
          {/* Glassmorphic Ticket Container */}
          <div className="bg-[#111]/80 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl relative">
            {/* Ambient Glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-red-900/20 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Top section: Details */}
            <div className="p-8 md:p-10 border-b border-white/20 border-dashed relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Standard Pass</h2>
                  <p className="text-red-500 font-mono text-sm tracking-widest uppercase">TEDxAchievers 2026</p>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white text-sm font-semibold">Row G • Seat 14</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase mb-1">Attendee</p>
                  <p className="text-white font-semibold text-lg">Jane Doe</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase mb-1">Date</p>
                  <p className="text-white font-semibold text-lg">Nov 14, 2026</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase mb-1">Time</p>
                  <p className="text-white font-semibold text-lg">09:00 AM EST</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase mb-1">Location</p>
                  <p className="text-white font-semibold text-lg">Achievers University Hall</p>
                </div>
              </div>
            </div>

            {/* Bottom section: Barcode / QR */}
            <div className="p-8 md:p-10 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-xl">
                  <QrCode size={80} className="text-black" />
                </div>
                <p className="text-gray-500 font-mono text-xs tracking-[0.3em]">TXA-2026-8942</p>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                  <Download size={18} />
                  Download PDF
                </button>
                <button className="bg-[#222] hover:bg-[#333] border border-white/20 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                  <Wallet size={18} />
                  Add to Wallet
                </button>
              </div>
            </div>

            {/* Ticket Cutouts */}
            <div className="absolute left-0 top-[65%] -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-[#050505] rounded-full" />
            <div className="absolute right-0 top-[65%] -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-[#050505] rounded-full" />
          </div>
        </motion.div>

        {/* Info Column */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full lg:w-1/3 flex flex-col gap-6"
        >
          <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Transfer Ticket</h3>
            <p className="text-gray-400 text-sm mb-6">
              Can't make it? You can transfer your ticket to someone else up to 48 hours before the event.
            </p>
            <button className="w-full bg-[#1a1a1a] hover:bg-[#222] border border-white/20 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              <Share2 size={18} />
              Transfer to a friend
            </button>
          </div>

          <div className="bg-[#111]/80 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Event Guidelines</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                Please arrive at least 45 minutes early for registration.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                Have your QR code ready with screen brightness turned up.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                Valid ID matching the ticket name is required.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardTickets;
