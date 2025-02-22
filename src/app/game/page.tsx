"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import { DEFAULT_GRID_SIZE } from "@/utils/puzzleUtils";
import Footer from "@/components/Footer";
import { Suspense, useState, useEffect } from "react";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const imageUrl =
    searchParams.get("imageUrl") ||
    "https://source.unsplash.com/random/800x800";
  const gridSize = Number(searchParams.get("gridSize")) || DEFAULT_GRID_SIZE;
  const mode = (searchParams.get("mode") || "sliding") as "sliding" | "puzzle";
  const timeLimit = Number(searchParams.get("timeLimit")) || null;

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      if (timeLimit) {
        setTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= timeLimit) {
            setIsGameOver(true);
            return timeLimit;
          }
          return newTime;
        });
      } else {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLimit, isGameOver]);

  const handleGameComplete = () => {
    setIsGameOver(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
        >
          ← Back to Setup
        </button>
        <div className="flex items-center gap-4">
          <div
            className={`text-xl font-mono font-bold ${
              timeLimit && time >= timeLimit ? "text-red-500" : ""
            }`}
          >
            {timeLimit ? formatTime(timeLimit - time) : formatTime(time)}
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>

      <SlidingPuzzle
        imageUrl={imageUrl}
        gridSize={gridSize}
        mode={mode}
        onComplete={handleGameComplete}
      />

      {isGameOver && timeLimit && time >= timeLimit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center space-y-4">
            <h2 className="text-2xl font-bold">Time&apos;s Up!</h2>
            <p>You ran out of time. Want to try again?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Back to Setup
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Game() {
  return (
    <main className="min-h-screen p-8 pb-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={<div>Loading...</div>}>
        <GameContent />
      </Suspense>
      <Footer />
    </main>
  );
}
