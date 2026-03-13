import React, { useState, useEffect } from 'react';
import { auth, db, collection, query, where, onSnapshot, onAuthStateChanged, User } from './firebase';
import { Task } from './types';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Profile from './components/Profile';
import { Menu, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { startOfDay, isSameDay } from 'date-fns';

import LandingPage from './components/LandingPage';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApp, setShowApp] = useState(false);
  const [view, setView] = useState<'home' | 'profile' | 'completed' | 'incomplete'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setTasksLoading(true);
    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(taskData);
      setTasksLoading(false);
    }, (error) => {
      console.error('Task snapshot error:', error);
      setTasksLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121417]">
        <div className="w-12 h-12 border-4 border-gold rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return <LandingPage onLaunchWeb={() => {}} />;
}
