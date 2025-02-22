"use client";

import { useState, useEffect } from "react";
import { PuzzlePiece, GameState } from "@/types/puzzle";
import {
  createInitialPieces,
  shufflePieces,
  isAdjacent,
  isPuzzleComplete,
} from "@/utils/puzzleUtils";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  imageUrl: string;
  gridSize: number;
  mode: "sliding" | "puzzle";
  onComplete?: () => void;
}

export default function SlidingPuzzle({
  imageUrl,
  gridSize,
  mode,
  onComplete,
}: Props) {
  const [gameState, setGameState] = useState<GameState>({
    pieces: createInitialPieces(gridSize),
    isComplete: false,
    imageUrl,
    gridSize,
  });
  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setGameState(() => ({
      pieces: shufflePieces(createInitialPieces(gridSize), gridSize),
      isComplete: false,
      imageUrl,
      gridSize,
    }));
    setSelectedPiece(null);
  }, [imageUrl, gridSize]);

  useEffect(() => {
    if (gameState.isComplete && onComplete) {
      onComplete();
    }
  }, [gameState.isComplete, onComplete]);

  const handlePieceClick = (clickedPiece: PuzzlePiece) => {
    if (mode === "sliding") {
      if (clickedPiece.isEmpty) return;

      const emptyPiece = gameState.pieces.find((p) => p.isEmpty);
      if (
        !emptyPiece ||
        !isAdjacent(
          clickedPiece.currentPosition,
          emptyPiece.currentPosition,
          gridSize
        )
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
    } else {
      // Regular puzzle mode - swap any two pieces
      if (selectedPiece === null) {
        setSelectedPiece(clickedPiece);
      } else {
        const newPieces = gameState.pieces.map((piece) => {
          if (piece.id === clickedPiece.id) {
            return { ...piece, currentPosition: selectedPiece.currentPosition };
          }
          if (piece.id === selectedPiece.id) {
            return { ...piece, currentPosition: clickedPiece.currentPosition };
          }
          return piece;
        });

        const isComplete = isPuzzleComplete(newPieces);
        setGameState({ ...gameState, pieces: newPieces, isComplete });
        setSelectedPiece(null);
      }
    }
  };

  return (
    <div
      className={`relative aspect-square w-[min(80vw,80vh)] mx-auto rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 ${
        isDarkMode ? "shadow-lg shadow-purple-500/20" : "shadow-xl"
      }`}
    >
      {gameState.pieces.map((piece) => {
        if (piece.isEmpty && mode === "sliding") return null;

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
              ${
                selectedPiece?.id === piece.id
                  ? "ring-2 ring-purple-500 z-20"
                  : ""
              }
              hover:shadow-lg`}
            style={{
              position: "absolute",
              left: `${(piece.currentPosition % gridSize) * (100 / gridSize)}%`,
              top: `${
                Math.floor(piece.currentPosition / gridSize) * (100 / gridSize)
              }%`,
              width: `${100 / gridSize}%`,
              height: `${100 / gridSize}%`,
              backgroundImage: `url(${gameState.imageUrl})`,
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
              backgroundPosition: `${
                (piece.originalPosition % gridSize) * (100 / (gridSize - 1))
              }% ${
                Math.floor(piece.originalPosition / gridSize) *
                (100 / (gridSize - 1))
              }%`,
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
