
import React from 'react';
import type { SquareValue } from '../types';
import Square from './Square';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const isWinning = winningLine ? winningLine.includes(i) : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="transform-style-preserve-3d transform rotate-x-15 -rotate-y-10 scale-90">
       <div className="grid grid-cols-3 gap-4 p-4 bg-slate-700/50 rounded-2xl shadow-2xl border border-slate-600">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => renderSquare(i))}
      </div>
    </div>
  );
};

export default Board;
