import React from 'react';
import { Smartphone, Apple, Calendar, Clock, Users, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onLaunchWeb: () => void;
}

export default function LandingPage({ onLaunchWeb }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#121417] text-white font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rounded-full border-t-transparent" />
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-gold">MyTask</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-6 text-gold"
          >
            MyTask
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-400 font-serif italic mb-12">
            Focus. Flow. Personal <br className="md:hidden" /> Task Manager.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button 
              onClick={() => alert('MyTask app will under constration')}
              className="flex items-center justify-center gap-3 bg-gold-gradient text-black px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-gold/10 active:scale-95"
            >
              <Apple size={24} />
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-bold">Available for</p>
                <p className="text-lg">iOS</p>
              </div>
            </button>
            <a 
              href="/MyTask.apk" 
              download="MyTask.apk"
              className="flex items-center justify-center gap-3 bg-gold-gradient text-black px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-gold/10 active:scale-95"
            >
              <Smartphone size={24} />
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-bold">Download for</p>
                <p className="text-lg">Android</p>
              </div>
            </a>
          </div>
        </motion.div>

        {/* App Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-[320px] md:max-w-[360px] mx-auto"
        >
          <div className="relative aspect-[9/19] bg-[#1C1F24] rounded-[3rem] border-[8px] border-[#2A2E35] shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2A2E35] rounded-b-2xl z-10" />
            
            <div className="p-6 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border border-gold/30 rounded" />
                  <span className="text-xs font-bold text-gray-400">My Tasks</span>
                </div>
                <div className="w-6 h-6 bg-gold-gradient rounded flex items-center justify-center text-black">
                  <span className="text-sm font-bold">+</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-xs text-gray-500">March</span>
                <div className="flex gap-4">
                  {[9, 10, 11, 12, 13].map((d, i) => (
                    <div key={d} className={`flex flex-col items-center ${d === 13 ? 'text-gold' : 'text-gray-600'}`}>
                      <span className="text-[10px] font-bold">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i]}</span>
                      <span className={`text-sm font-bold ${d === 13 ? 'border-b-2 border-gold pb-1' : ''}`}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Hello", desc: "welcome to my profile", color: "bg-[#C8D5B9]/20 border-[#C8D5B9]/40", time: "12:28" },
                  { title: "what happening", desc: "welcome", color: "bg-[#D4A373]/20 border-[#D4A373]/40", time: "8:10" },
                  { title: "Hello", desc: "welcome to my profile", color: "bg-[#B5838D]/20 border-[#B5838D]/40", time: "5:55" }
                ].map((task, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${task.color} relative`}>
                    <h4 className="font-bold text-sm mb-1">{task.title}</h4>
                    <p className="text-[10px] text-gray-400">{task.desc}</p>
                    <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gold rounded-full" />
                      <span className="text-[8px] text-gray-500">{task.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-gradient rounded-full shadow-lg flex items-center justify-center text-black">
              <span className="text-2xl font-bold">+</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Simplify Your Day Section */}
      <section className="px-6 py-24 bg-[#1C1F24]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-gold">Simplify <br /> Your Day</h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
            <button 
              onClick={() => alert('MyTask app will under constration')}
              className="flex items-center justify-center gap-3 bg-gold-gradient text-black px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all"
            >
              <Apple size={24} />
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-bold">Available for</p>
                <p className="text-lg">iOS</p>
              </div>
            </button>
            <a 
              href="/MyTask.apk" 
              download="MyTask.apk"
              className="flex items-center justify-center gap-3 bg-gold-gradient text-black px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition-all"
            >
              <Smartphone size={24} />
              <div className="text-left leading-tight">
                <p className="text-[10px] uppercase font-bold">Download for</p>
                <p className="text-lg">Android</p>
              </div>
            </a>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-serif italic text-gold mb-12">How It Works</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Calendar className="text-gold" />, title: "Smart Scheduling", desc: "Minimalist design and smarter scheduler." },
                { icon: <Clock className="text-gold" />, title: "Focus Timer", desc: "Seamless covers for focus timers on your stopwatch." },
                { icon: <Users className="text-gold" />, title: "Seamless Collaboration", desc: "Connect seamlessly with users and teams." },
                { icon: <Lock className="text-gold" />, title: "Privacy First", desc: "Protect your data and secure your privacy." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 bg-[#121417] rounded-3xl border border-gold/10">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="text-sm font-bold mb-2 text-gold">{item.title}</h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-gold/10 text-center">
        <div className="flex justify-center gap-8 mb-6 text-xs text-gray-500 font-medium">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms</a>
          <a href="#" className="hover:text-gold transition-colors">Support</a>
        </div>
        <p className="text-xs font-bold text-gold/50 tracking-widest">Built with ❤️ by Anibesh & Shubham</p>
      </footer>
    </div>
  );
}
