"use client";

import { useState, useEffect } from "react";
import { PuzzlePiece, GameState } from "@/types/puzzle";
import {
  GRID_SIZE,
  createInitialPieces,
  shufflePieces,
  isAdjacent,
  isPuzzleComplete,
} from "@/utils/puzzleUtils";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  imageUrl: string;
}

export default function SlidingPuzzle({ imageUrl }: Props) {
  const [gameState, setGameState] = useState<GameState>({
    pieces: createInitialPieces(),
    isComplete: false,
    imageUrl,
  });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setGameState(() => ({
      pieces: shufflePieces(createInitialPieces()),
      isComplete: false,
      imageUrl,
    }));
  }, [imageUrl]);

  const handlePieceClick = (clickedPiece: PuzzlePiece) => {
    if (clickedPiece.isEmpty) return;

    const emptyPiece = gameState.pieces.find((p) => p.isEmpty);
    if (
      !emptyPiece ||
      !isAdjacent(clickedPiece.currentPosition, emptyPiece.currentPosition)
    )
      return;

    const newPieces = gameState.pieces.map((piece) => {
      if (piece.id === clickedPiece.id) {
        return { ...piece, currentPosition: emptyPiece.currentPosition };
      }
      if (piece.id === emptyPiece.id) {
        return { ...piece, currentPosition: clickedPiece.currentPosition };
      }
      return piece;
    });

    const isComplete = isPuzzleComplete(newPieces);
    setGameState({ ...gameState, pieces: newPieces, isComplete });
  };

  return (
    <div
      className={`relative aspect-square w-[min(80vw,80vh)] mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 ${
        isDarkMode ? "shadow-lg shadow-purple-500/20" : "shadow-xl"
      }`}
    >
      {gameState.pieces.map((piece) => {
        if (piece.isEmpty) return null;

        return (
          <div
            key={piece.id}
            onClick={() => handlePieceClick(piece)}
            className={`absolute transition-all duration-300 cursor-pointer bg-cover border border-white/10
              ${
                gameState.isComplete
                  ? "hover:transform-none"
                  : "hover:scale-[1.02] hover:z-10"
              }
              ${
                isDarkMode
                  ? "hover:shadow-purple-500/30"
                  : "hover:shadow-black/20"
              }
              hover:shadow-lg`}
            style={{
              position: "absolute",
              left: `${
                (piece.currentPosition % GRID_SIZE) * (100 / GRID_SIZE)
              }%`,
              top: `${
                Math.floor(piece.currentPosition / GRID_SIZE) *
                (100 / GRID_SIZE)
              }%`,
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              backgroundImage: `url(${gameState.imageUrl})`,
              backgroundSize: "400% 400%",
              backgroundPosition: `${
                (piece.originalPosition % GRID_SIZE) * 33.33
              }% ${Math.floor(piece.originalPosition / GRID_SIZE) * 33.33}%`,
            }}
          />
        );
      })}
      {gameState.isComplete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white">
          <p className="text-4xl font-bold animate-bounce">
            Puzzle Complete! 🎉
          </p>
        </div>
      )}
    </div>
  );
}
