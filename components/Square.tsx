
import React from 'react';
import type { SquareValue } from '../types';
import { TRexIcon, PterodactylIcon } from './DinoIcons';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  const icon = value === 'T-Rex' ? <TRexIcon className="w-12 h-12 md:w-16 md:h-16 text-emerald-400" /> :
               value === 'Pterodactyl' ? <PterodactylIcon className="w-12 h-12 md:w-16 md:h-16 text-amber-400" /> :
               null;

  const baseStyle = "relative w-24 h-24 md:w-32 md:h-32 rounded-lg flex items-center justify-center transition-all duration-300 transform-style-preserve-3d cursor-pointer";
  const perspectiveStyle = "bg-slate-800 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_8px_16px_rgba(0,0,0,0.4)]";
  const hoverStyle = "hover:-translate-y-1 hover:shadow-[inset_0_6px_12px_rgba(0,0,0,0.5),0_12px_24px_rgba(0,0,0,0.4)]";
  const winningStyle = isWinning ? 'bg-slate-600 scale-105' : 'bg-slate-800';

  const contentStyle = "absolute inset-0 flex items-center justify-center transition-transform duration-300 transform-style-preserve-3d";
  const iconAnimationStyle = value ? "animate-pop-in" : "opacity-0";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${perspectiveStyle} ${hoverStyle} ${winningStyle}`}
      aria-label={`Square ${value ? `with ${value}` : 'empty'}`}
    >
      <div className={`${contentStyle} ${iconAnimationStyle}`}>
        {icon}
      </div>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
      `}</style>
    </button>
  );
};

export default Square;
