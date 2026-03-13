import React from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export default function Auth() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121417] p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1C1F24] p-10 rounded-[40px] shadow-2xl max-w-md w-full text-center border border-gold/10"
      >
        <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-gold/20">
          <div className="w-12 h-12 border-4 border-black rounded-full border-t-transparent animate-spin-slow" />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-3 text-gold">MyTask</h1>
        <p className="text-gray-400 mb-10 font-serif italic">Focus. Flow. Personal Task Manager.</p>
        
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-4 bg-gold-gradient text-black py-5 rounded-[24px] font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-gold/10 active:scale-95"
        >
          <LogIn size={24} />
          Sign in with Google
        </button>

        <div className="mt-12 pt-8 border-t border-gold/10">
          <p className="text-xs font-bold text-gold/50 tracking-widest uppercase">Built with ❤️ by Anibesh & Shubham</p>
        </div>
      </motion.div>
    </div>
  );
}
