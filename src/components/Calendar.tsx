import React, { useState, useEffect, useRef } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  const prevMonth = () => setCurrentMonth(addDays(startOfMonth(currentMonth), -1));

  useEffect(() => {
    // Scroll selected date into view
    const selectedElement = scrollRef.current?.querySelector('[data-selected="true"]');
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate]);

  return (
    <div className="bg-[#1C1F24] p-6 rounded-b-[40px] shadow-xl border-b border-gold/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-gold italic">{format(currentMonth, 'MMMM')}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gold/5 text-gold rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gold/5 text-gold rounded-full transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
      >
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());

          return (
            <motion.button
              key={day.toString()}
              data-selected={isSelected}
              whileTap={{ scale: 0.9 }}
              animate={isSelected ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => onDateSelect(startOfDay(day))}
              className={`
                flex-shrink-0 w-16 h-24 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border
                ${isSelected 
                  ? 'bg-gold-gradient text-black border-transparent shadow-lg shadow-gold/20' 
                  : 'bg-[#121417] text-gray-500 border-gold/5 hover:border-gold/20'}
              `}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-black/60' : 'text-gold/40'}`}>
                {format(day, 'EEE')}
              </span>
              <span className="text-xl font-bold">{format(day, 'd')}</span>
              {isToday && !isSelected && (
                <div className="w-1.5 h-1.5 bg-gold rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
