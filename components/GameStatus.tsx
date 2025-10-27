
import React from 'react';
import type { Player } from '../types';
import { TRexIcon, PterodactylIcon } from './DinoIcons';

interface GameStatusProps {
  winner: Player | 'Draw' | null;
  isTRexNext: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isTRexNext }) => {
  let status;
  let icon;

  if (winner) {
    if (winner === 'Draw') {
      status = "It's a Draw!";
      icon = (
        <>
          <TRexIcon className="w-8 h-8 text-emerald-400" />
          <PterodactylIcon className="w-8 h-8 text-amber-400" />
        </>
      );
    } else {
      status = `${winner} Wins!`;
      icon = winner === 'T-Rex' ? 
        <TRexIcon className="w-10 h-10 text-emerald-400" /> : 
        <PterodactylIcon className="w-10 h-10 text-amber-400" />;
    }
  } else {
    status = `${isTRexNext ? 'T-Rex' : 'Pterodactyl'}'s Turn`;
    icon = isTRexNext ? 
      <TRexIcon className="w-8 h-8 text-emerald-400" /> : 
      <PterodactylIcon className="w-8 h-8 text-amber-400" />;
  }

  return (
    <div className="flex items-center justify-center space-x-4 mb-8 text-3xl md:text-4xl text-slate-100 font-bold font-bangers tracking-wider">
      <div className="flex items-center justify-center h-12 w-12">{icon}</div>
      <h2 className="drop-shadow-lg">{status}</h2>
    </div>
  );
};

export default GameStatus;
