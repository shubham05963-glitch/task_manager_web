import React from 'react';
import { Task } from '../types';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, doc, updateDoc, deleteDoc } from '../firebase';
import { handleFirestoreError } from '../utils';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
}

export default function TaskList({ tasks, loading }: TaskListProps) {
  const toggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'completed' ? 'incomplete' : 'completed';
      await updateDoc(doc(db, 'tasks', task.id), { status: newStatus });
    } catch (error) {
      handleFirestoreError(error, 'update', `tasks/${task.id}`);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      handleFirestoreError(error, 'delete', `tasks/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Clock size={32} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No tasks for today</h3>
        <p className="text-gray-500">Enjoy your free time or add a new task!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">
      {/* Vertical Timeline Line */}
      <div className="absolute right-[34px] top-0 bottom-0 w-[1px] bg-gold/10" />

      <AnimatePresence mode="popLayout">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              delay: idx * 0.05,
              duration: 0.4,
              layout: { duration: 0.3 }
            }}
            whileHover={{ y: -2 }}
            className="group relative bg-[#1C1F24] p-5 rounded-3xl border border-gold/5 hover:border-gold/20 transition-all flex items-start gap-4"
          >
            {/* Muted Pastel Border Overlay */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-2 rounded-l-3xl opacity-40" 
              style={{ backgroundColor: task.color }}
            />
            
            <button 
              onClick={() => toggleStatus(task)}
              className={`mt-1 transition-colors ${task.status === 'completed' ? 'text-gold' : 'text-gold/20 hover:text-gold/40'}`}
            >
              {task.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>
            
            <div className="flex-1 min-w-0">
              <h4 className={`font-bold text-lg truncate ${task.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                {task.title}
              </h4>
              <p className={`text-[11px] mt-1 line-clamp-2 ${task.status === 'completed' ? 'text-gray-700' : 'text-gray-500'}`}>
                {task.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-[10px] font-bold text-gold/40 uppercase tracking-widest">
                <Clock size={12} />
                <span>{format(new Date(task.dueDate), 'h:mm a')}</span>
              </div>
            </div>

            {/* Timeline Dot */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#121417] border border-gold/20 flex items-center justify-center">
                <div className={`w-2 h-2 rounded-full ${task.status === 'completed' ? 'bg-gold' : 'bg-gold/20'}`} />
              </div>
              <span className="text-[8px] font-bold text-gold/30">{format(new Date(task.dueDate), 'h:mm')}</span>
            </div>

            <button 
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gold/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
            >
              <Trash2 size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
