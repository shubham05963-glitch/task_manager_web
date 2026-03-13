import React, { useState, useEffect } from 'react';
import { User, Mail, Camera, ArrowLeft } from 'lucide-react';
import { auth, db, doc, getDoc, setDoc } from '../firebase';
import { UserProfile } from '../types';
import { motion } from 'motion/react';
import { handleFirestoreError } from '../utils';

interface ProfileProps {
  onBack: () => void;
}

export default function Profile({ onBack }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      try {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setProfile(data);
          setName(data.name);
        } else {
          // Initialize profile if it doesn't exist
          const initialProfile = {
            uid: auth.currentUser.uid,
            name: auth.currentUser.displayName || 'User',
            email: auth.currentUser.email || '',
            photoURL: auth.currentUser.photoURL || undefined
          };
          await setDoc(docRef, initialProfile);
          setProfile(initialProfile);
          setName(initialProfile.name);
        }
      } catch (error) {
        handleFirestoreError(error, 'get', `users/${auth.currentUser.uid}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    try {
      await setDoc(doc(db, 'users', auth.currentUser.uid), { name }, { merge: true });
      alert('Profile updated!');
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${auth.currentUser.uid}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#121417]">
        <div className="w-8 h-8 border-4 border-gold rounded-full border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121417] flex flex-col">
      <div className="p-6 flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-[#1C1F24] rounded-2xl shadow-sm hover:bg-gold/5 text-gold transition-colors border border-gold/10">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-serif font-bold text-gold italic">Profile</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-12"
        >
          <div className="w-40 h-40 bg-[#1C1F24] rounded-full p-1 shadow-xl border-2 border-gold/20">
            {profile?.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#121417] flex items-center justify-center text-gold/20">
                <User size={64} />
              </div>
            )}
          </div>
          <button className="absolute bottom-2 right-2 p-3 bg-gold-gradient text-black rounded-full shadow-lg hover:opacity-90 transition-colors">
            <Camera size={20} />
          </button>
          <p className="text-center mt-4 text-[10px] text-gold/40 font-bold uppercase tracking-widest">Tap image to change</p>
        </motion.div>

        <div className="w-full max-w-md space-y-6">
          <div className="bg-[#1C1F24] p-6 rounded-[32px] shadow-sm space-y-6 border border-gold/10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Name</label>
              <div className="flex items-center gap-4 p-4 bg-[#121417] rounded-2xl border border-gold/5">
                <User size={20} className="text-gold/40" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 w-full font-medium text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gold/40 uppercase tracking-[0.2em] px-1">Email</label>
              <div className="flex items-center gap-4 p-4 bg-[#121417] rounded-2xl border border-gold/5 opacity-60">
                <Mail size={20} className="text-gold/40" />
                <span className="font-medium text-gray-400">{profile?.email}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={handleUpdate}
            className="w-full bg-gold-gradient text-black py-5 rounded-[32px] font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-gold/10"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
}
