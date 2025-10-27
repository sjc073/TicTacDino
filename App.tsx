
import React, { useState, useEffect } from 'react';
import type { SquareValue, Player } from './types';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import { playPlaceSound, playWinSound, playDrawSound } from './utils/sounds';

const calculateWinner = (squares: SquareValue[]): { winner: Player; line: number[] } | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as Player, line: lines[i] };
    }
  }
  return null;
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [isTRexNext, setIsTRexNext] = useState<boolean>(true);
  const [winnerInfo, setWinnerInfo] = useState<{ winner: Player | 'Draw'; line: number[] | null } | null>(null);

  useEffect(() => {
    if (winnerInfo) return;

    const winnerResult = calculateWinner(squares);
    if (winnerResult) {
      setWinnerInfo({ winner: winnerResult.winner, line: winnerResult.line });
      playWinSound();
    } else if (squares.every(Boolean)) {
      setWinnerInfo({ winner: 'Draw', line: null });
      playDrawSound();
    }
  }, [squares, winnerInfo]);

  const handleClick = (i: number) => {
    if (winnerInfo || squares[i]) {
      return;
    }
    
    playPlaceSound();
    
    const newSquares = squares.slice();
    newSquares[i] = isTRexNext ? 'T-Rex' : 'Pterodactyl';
    setSquares(newSquares);
    setIsTRexNext(!isTRexNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsTRexNext(true);
    setWinnerInfo(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 perspective-1000">
      <header className="text-center mb-8">
        <h1 className="font-bangers text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
          Tic-Tac-Dino
        </h1>
      </header>
      
      <main className="flex flex-col items-center">
        <GameStatus winner={winnerInfo?.winner || null} isTRexNext={isTRexNext} />
        <Board squares={squares} onClick={handleClick} winningLine={winnerInfo?.line || null} />
        {(winnerInfo) && (
          <button
            onClick={handleReset}
            className="mt-12 px-8 py-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold rounded-full shadow-lg text-xl transform hover:scale-105 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Play Again
          </button>
        )}
      </main>
      
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        <p>A dino-mite creation for your entertainment.</p>
      </footer>
       <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .rotate-x-15 { transform: rotateX(15deg); }
        .-rotate-y-10 { transform: rotateX(15deg) rotateY(-10deg); }
      `}</style>
    </div>
  );
};

export default App;
