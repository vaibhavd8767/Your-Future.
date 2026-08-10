import React, { useState, useRef } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Award, FileText } from 'lucide-react';
import { College } from '../types';

interface ThreeCollegeCardProps {
  college: College;
  onSelectCollege: (id: number) => void;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
}

export const ThreeCollegeCard: React.FC<ThreeCollegeCardProps> = ({
  college,
  onSelectCollege,
  isSaved = false,
  onToggleSave,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt calculations (-10 to +10 degrees)
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position calculation
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectCollege(college.id)}
      style={{
        perspective: '1200px',
      }}
      className="group cursor-pointer select-none"
    >
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: rotateX === 0 ? 'transform 0.5s ease-out' : 'transform 0.08s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="relative bg-[#0f172a] rounded-[1.5rem] p-5 shadow-xl hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)] border border-white/10 hover:border-[#38bdf8] transition-all duration-300 flex flex-col justify-between h-full"
      >
        {/* Dynamic 3D Glare Light Effect */}
        <div
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, 0.25) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: glarePos.opacity,
          }}
          className="absolute inset-0 rounded-[1.5rem] pointer-events-none transition-opacity duration-300 z-30"
        />

        <div>
          {/* Card Top Image Container */}
          <div
            style={{ transform: 'translateZ(30px)' }}
            className="relative overflow-hidden mb-5 bg-[#1e293b] rounded-[1.2rem] p-1 border border-white/10 group-hover:border-sky-500/40 transition-colors"
          >
            <div className="overflow-hidden rounded-[1rem] relative h-48 sm:h-52">
              <img
                src={college.image}
                alt={college.collage_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800';
                }}
              />

              {/* Sky Blue Rank Badge */}
              <div
                style={{ transform: 'translateZ(45px)' }}
                className="absolute top-3 left-3 bg-[#38bdf8] text-[#020617] text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-lg shadow-md flex items-center gap-1 uppercase"
              >
                <Award className="w-3.5 h-3.5 text-[#020617]" />
                <span>#{college.ranking} Rank</span>
              </div>

              {/* Save / Bookmark Button */}
              {onToggleSave && (
                <button
                  style={{ transform: 'translateZ(45px)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(college.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all duration-200 shadow-md ${
                    isSaved
                      ? 'bg-[#38bdf8] text-[#020617]'
                      : 'bg-slate-900/80 text-slate-200 hover:bg-slate-900 hover:text-[#38bdf8] border border-white/10'
                  }`}
                  title={isSaved ? 'Remove from shortlisted' : 'Shortlist college'}
                >
                  <FileText className="w-4 h-4" />
                </button>
              )}

              {/* Autonomous Tag */}
              <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-[#38bdf8] text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-sky-500/30 uppercase tracking-widest">
                {college.is_autonomous === 'Yes' ? 'Autonomous' : 'Affiliated'}
              </div>
            </div>
          </div>

          {/* College Title */}
          <h2
            style={{ transform: 'translateZ(25px)' }}
            className="text-lg font-extrabold text-white leading-tight uppercase tracking-tight mb-2.5 line-clamp-2 group-hover:text-[#38bdf8] transition-colors"
          >
            {college.collage_name}
          </h2>

          {/* Location Pin & Region */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="flex items-center text-xs font-bold text-slate-400 mb-4"
          >
            <MapPin className="w-4 h-4 text-[#38bdf8] mr-1 shrink-0" />
            <span className="uppercase tracking-wider">
              {college.district ? `${college.district}, ` : ''}
              {college.state.toUpperCase()}, India
            </span>
          </div>

          {/* Key Attributes Pills */}
          <div
            style={{ transform: 'translateZ(15px)' }}
            className="flex flex-wrap gap-1.5 mb-5 text-[11px]"
          >
            <span className="bg-[#1e293b] text-slate-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-700">
              {college.university_type}
            </span>
            <span className="bg-sky-500/10 text-[#38bdf8] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-sky-500/20">
              {college.branch}
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-md border border-emerald-500/20">
              ₹{college.fees.toLocaleString()}/yr
            </span>
          </div>
        </div>

        {/* View Details Link */}
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="pt-3.5 border-t border-white/10 flex items-center justify-between mt-auto"
        >
          <span className="inline-flex items-center font-extrabold text-xs text-[#38bdf8] uppercase tracking-wider group-hover:translate-x-1 transition-all duration-200">
            Open Dossier <ArrowRight className="w-3.5 h-3.5 ml-1.5 stroke-[3]" />
          </span>
        </div>
      </div>

    </div>
  );
};
