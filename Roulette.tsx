import React, { useState } from 'react';
import { Trip } from '../types';
import { 
  MapPin, 
  Navigation, 
  Info, 
  Clock, 
  Map as MapIcon, 
  Activity, 
  Sun, 
  Utensils, 
  Briefcase, 
  Calendar,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Mountain,
  Backpack
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TripResultProps {
  trip: Trip;
  onReset: () => void;
}

type TabType = 'vibes' | 'details' | 'logistics';

const TripResult: React.FC<TripResultProps> = ({ trip, onReset }) => {
  const [activeTab, setActiveTab] = useState<TabType>('vibes');

  const handleAmudAnanOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    const scheme = `amudanan://search?q=${encodeURIComponent(trip.name)}`;
    const webUrl = `https://amudanan.co.il/w/index.php?search=${encodeURIComponent(trip.name)}`;
    
    // Try to open scheme
    window.location.href = scheme;
    
    // Fallback after short delay
    setTimeout(() => {
      window.open(webUrl, '_blank');
    }, 500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex flex-col bg-black text-white p-6 rtl h-[100dvh] overflow-hidden"
    >
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={trip.imageUrl || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop'} 
          alt={trip.name} 
          className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center mb-4">
        <button 
          onClick={onReset}
          className="w-12 h-12 glass rounded-full flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowRight size={24} className="rotate-180" />
        </button>
        <div className="bg-accent px-4 py-1.5 rounded-full text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-accent/40">
          {trip.region === 'north' ? 'צפון' : trip.region === 'center' ? 'מרכז' : trip.region === 'jerusalem' ? 'ירושלים' : 'דרום'}
        </div>
      </header>

      {/* Title Section */}
      <section className="relative z-10 pt-4 pb-6 mt-auto">
        <h1 className="text-6xl font-black font-display tracking-tight leading-[0.8] uppercase mb-4">{trip.name}</h1>
        <div className="flex items-center gap-2 text-white/70 font-bold text-sm">
          <MapPin size={16} className="text-accent" />
          <span>{trip.startPoint}</span>
        </div>
      </section>

      {/* Main Content Card */}
      <div className="relative z-10 glass rounded-[2.5rem] flex flex-col min-h-0 mb-6 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-white/5">
          {(['vibes', 'details', 'logistics'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'text-accent border-b-2 border-accent' : 'text-white/30'
              }`}
            >
              {tab === 'vibes' ? 'האווירה' : tab === 'details' ? 'פרטים' : 'לוגיסטיקה'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 hide-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              {activeTab === 'vibes' && (
                <div className="space-y-4">
                  <p className="text-lg font-bold leading-tight">{trip.description}</p>
                  <div className="bg-accent/5 p-4 rounded-2xl border-r-4 border-accent italic text-white/80 font-medium text-sm">
                    "{trip.whyThisFits}"
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="grid grid-cols-2 gap-3 pb-4">
                  <DetailItem icon={<Clock size={16}/>} label="משך" value={trip.duration} />
                  <DetailItem icon={<Activity size={16}/>} label="קושי" value={trip.difficulty === 'easy' ? 'קלה' : trip.difficulty === 'medium' ? 'בינונית' : 'מאתגרת'} />
                  <DetailItem icon={<Mountain size={16}/>} label="סוג" value={trip.trailType} />
                  <DetailItem icon={<Calendar size={16}/>} label="עונה" value={trip.season} />
                </div>
              )}

              {activeTab === 'logistics' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-accent text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                       <Backpack size={14} /> ציוד הכרחי
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trip.whatToBring.map((w, i) => (
                        <span key={i} className="bg-white/5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-white/70 border border-white/5">
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-accent text-[9px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Utensils size={14} /> איפה אוכלים?
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {trip.foodRecommendations.map((f, i) => (
                        <div key={i} className="text-xs font-bold bg-white/5 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                          <div className="w-1 h-1 bg-accent rounded-full" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Actions */}
      <footer className="relative z-10 flex gap-3 pb-4">
        <a 
          href={trip.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-grow h-16"
        >
          <Navigation size={20} />
          ניווט
        </a>
        <button 
          onClick={handleAmudAnanOpen}
          className="w-16 h-16 glass rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
        >
          <Info size={24} className="text-white" />
        </button>
        <button 
          onClick={onReset}
          className="w-16 h-16 glass rounded-2xl flex items-center justify-center active:scale-95 transition-transform group"
        >
          <Sparkles size={24} className="text-white group-hover:text-accent transition-colors" />
        </button>
      </footer>
    </motion.div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
    <div className="flex items-center gap-2 text-accent mb-1">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{label}</span>
    </div>
    <div className="font-bold text-white tracking-tight">{value}</div>
  </div>
);

export default TripResult;
