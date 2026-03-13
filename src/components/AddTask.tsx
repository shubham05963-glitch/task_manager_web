import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, addDoc, auth } from '../firebase';
import { COLORS, handleFirestoreError } from '../utils';
import { format } from 'date-fns';

interface AddTaskProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
}

export default function AddTask({ isOpen, onClose, selectedDate }: AddTaskProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [time, setTime] = useState('12:00');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !title) return;

    setLoading(true);
    try {
      const [hours, minutes] = time.split(':').map(Number);
      const dueDate = new Date(selectedDate);
      dueDate.setHours(hours, minutes);

      await addDoc(collection(db, 'tasks'), {
        userId: auth.currentUser.uid,
        title,
        description,
        color,
        dueDate: dueDate.toISOString(),
        status: 'incomplete',
        createdAt: new Date().toISOString(),
      });
      
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      handleFirestoreError(error, 'create', 'tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 bg-[#121417] rounded-t-[40px] z-[70] p-8 max-h-[90vh] overflow-y-auto shadow-2xl border-t border-gold/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-serif font-bold text-gold italic">New Task</h2>
              <button onClick={onClose} className="p-2 hover:bg-gold/5 text-gold rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full bg-[#1C1F24] p-5 rounded-2xl border border-gold/5 focus:border-gold/30 focus:ring-0 transition-all text-lg font-medium text-white placeholder:text-gray-600"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add some details..."
                  rows={3}
                  className="w-full bg-[#1C1F24] p-5 rounded-2xl border border-gold/5 focus:border-gold/30 focus:ring-0 transition-all resize-none text-white placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Date</label>
                  <div className="flex items-center gap-3 bg-[#1C1F24] p-5 rounded-2xl text-gray-300 border border-gold/5">
                    <CalendarIcon size={20} className="text-gold/40" />
                    <span className="font-medium">{format(selectedDate, 'MMM d, yyyy')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Time</label>
                  <div className="flex items-center gap-3 bg-[#1C1F24] p-5 rounded-2xl text-gray-300 border border-gold/5">
                    <Clock size={20} className="text-gold/40" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-transparent border-none p-0 focus:ring-0 font-medium w-full text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Select Color</label>
                <div className="flex flex-wrap gap-4">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 border-2 border-transparent"
                      style={{ backgroundColor: c, borderColor: color === c ? '#C5A059' : 'transparent' }}
                    >
                      {color === c && <Check size={24} className="text-black/60" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-gradient text-black py-5 rounded-[24px] font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gold/10"
              >
                {loading ? 'Creating...' : 'SUBMIT'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
