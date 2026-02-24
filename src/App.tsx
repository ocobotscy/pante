import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, GraduationCap, Award, Camera } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Khoirul Anam', country: 'Indonesia', flag: '🇮🇩', score: 100.0, grade: 'A+' },
  { rank: 2, name: 'Gabriel Jonathan', country: 'Indonesia', flag: '🇮🇩', score: 96.2, grade: 'A+' },
  { rank: 3, name: 'Angel Aurelia', country: 'Indonesia', flag: '🇮🇩', score: 95.8, grade: 'A' },
  { rank: 4, name: 'John Smith', country: 'United States', flag: '🇺🇸', score: 92.4, grade: 'A-' },
  { rank: 5, name: 'Emma Watson', country: 'United Kingdom', flag: '🇬🇧', score: 91.0, grade: 'A-' },
  { rank: 6, name: 'Hans Müller', country: 'Germany', flag: '🇩🇪', score: 89.5, grade: 'B+' },
  { rank: 7, name: 'Lucas Martin', country: 'France', flag: '🇫🇷', score: 88.2, grade: 'B+' },
  { rank: 8, name: 'Sofia Rossi', country: 'Italy', flag: '🇮🇹', score: 87.9, grade: 'B' },
  { rank: 9, name: 'Michael Johnson', country: 'United States', flag: '🇺🇸', score: 86.5, grade: 'B' },
  { rank: 10, name: 'Elena Popova', country: 'Spain', flag: '🇪🇸', score: 85.0, grade: 'B' },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-amber-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-slate-400" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-700" />;
    default:
      return <span className="font-medium text-slate-400 text-sm w-5 text-center">{rank}</span>;
  }
};

export default function App() {
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-800 p-4 md:p-8 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 text-center flex flex-col items-center gap-4 mt-4">
          
          {/* Hidden Upload Area for University Photo */}
          <div 
            className="relative w-full max-w-3xl h-48 md:h-64 bg-slate-100 border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center mb-4 overflow-hidden cursor-pointer group transition-all hover:shadow-md"
            onClick={triggerUpload}
            title="Click to upload university photo"
          >
            {headerImage ? (
              <img src={headerImage} alt="University" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-slate-300 group-hover:text-slate-400 transition-colors">
                <GraduationCap className="w-12 h-12 mb-2" />
                <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Add Cover Photo
                </span>
              </div>
            )}
            
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-widest text-slate-500 uppercase mb-2">
              University of London
            </h2>
            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-slate-900 mb-4">
              Blockchain Technology & Cryptography
            </h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
              Official ranking of top performing students based on final examination scores and academic excellence in the Blockchain course.
            </p>
          </div>
        </header>

        {/* Leaderboard Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Table Header */}
          <div className="grid grid-cols-[60px_1fr_100px_100px] md:grid-cols-[80px_2fr_1fr_1fr_1fr] gap-4 p-4 md:px-8 md:py-5 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="text-center">Rank</div>
            <div>Student Name</div>
            <div className="hidden md:block">Nationality</div>
            <div className="text-right">Grade</div>
            <div className="text-right">Final Score</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {leaderboardData.map((user, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={user.rank}
                className={`grid grid-cols-[60px_1fr_100px_100px] md:grid-cols-[80px_2fr_1fr_1fr_1fr] gap-4 p-4 md:px-8 md:py-5 items-center transition-colors hover:bg-slate-50 ${
                  user.rank <= 3 ? 'bg-blue-50/30' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex justify-center">
                  {getRankIcon(user.rank)}
                </div>

                {/* Student Info */}
                <div className="flex items-center gap-2">
                  <div className={`font-medium text-sm md:text-base ${user.rank <= 3 ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>
                    {user.name}
                  </div>
                  {user.rank === 1 && (
                    <Award className="w-4 h-4 text-amber-500 ml-1" />
                  )}
                  <div className="text-xs text-slate-500 md:hidden flex items-center gap-1 ml-2">
                     {user.flag}
                  </div>
                </div>

                {/* Nationality (Desktop) */}
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                  <span className="text-lg">{user.flag}</span>
                  <span className="truncate">{user.country}</span>
                </div>

                {/* Grade */}
                <div className="text-right text-sm">
                  <span className={`px-2.5 py-1 rounded-md font-medium ${
                    user.grade.includes('A') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    'bg-blue-50 text-blue-700 border border-blue-100'
                  }`}>
                    {user.grade}
                  </span>
                </div>

                {/* Score */}
                <div className="text-right font-semibold text-sm md:text-base text-slate-900">
                  {user.score.toFixed(1)}%
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center text-slate-400 text-xs">
          Academic Year 2025-2026 • University of London
        </div>
      </div>
    </div>
  );
}
