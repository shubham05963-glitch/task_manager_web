import React from 'react';
import { User, UserCircle, CheckCircle2, ListTodo, LogOut, X } from 'lucide-react';
import { auth, signOut } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'profile' | 'completed' | 'incomplete') => void;
  user: any;
}

export default function Sidebar({ isOpen, onClose, onNavigate, user }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-[#1C1F24] z-50 shadow-2xl flex flex-col border-r border-gold/10"
          >
            <div className="p-6 border-b border-gold/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-gradient rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black rounded-full border-t-transparent" />
                </div>
                <span className="font-serif font-bold text-xl text-gold">MyTask</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gold/5 text-gold rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-2">
              <button
                onClick={() => { onNavigate('profile'); onClose(); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gold/5 transition-colors text-left group"
              >
                <UserCircle size={24} className="text-gold/40 group-hover:text-gold transition-colors" />
                <span className="font-medium text-gray-300 group-hover:text-gold transition-colors">Profile</span>
              </button>
              <button
                onClick={() => { onNavigate('completed'); onClose(); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gold/5 transition-colors text-left group"
              >
                <CheckCircle2 size={24} className="text-gold/40 group-hover:text-gold transition-colors" />
                <span className="font-medium text-gray-300 group-hover:text-gold transition-colors">Completed Tasks</span>
              </button>
              <button
                onClick={() => { onNavigate('incomplete'); onClose(); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gold/5 transition-colors text-left group"
              >
                <ListTodo size={24} className="text-gold/40 group-hover:text-gold transition-colors" />
                <span className="font-medium text-gray-300 group-hover:text-gold transition-colors">Incomplete Tasks</span>
              </button>
            </div>

            <div className="p-4 border-t border-gold/10">
              <button
                onClick={() => signOut(auth)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 text-red-500 transition-colors text-left"
              >
                <LogOut size={24} />
                <span className="font-medium">Sign Out</span>
              </button>
              <div className="mt-4 text-center">
                <p className="text-[10px] font-bold text-gold/30 tracking-widest uppercase">Built with ❤️ by Anibesh & Shubham</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
