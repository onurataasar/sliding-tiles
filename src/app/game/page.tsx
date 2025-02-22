"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import { DEFAULT_GRID_SIZE } from "@/utils/puzzleUtils";
import Footer from "@/components/Footer";
import { Suspense, useState, useEffect } from "react";
import EndGameModal from "@/components/EndGameModal";
import LoadingScreen from "@/components/LoadingScreen";
import { FaChevronLeft } from "react-icons/fa6";

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
  const [moves, setMoves] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

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
            setIsSuccess(false);
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
    setIsSuccess(true);
  };

  const handleMoveCount = (count: number) => {
    setMoves(count);
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleRandomRestart = () => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "imageUrl",
      `https://picsum.photos/800/800?random=${Math.random()}`
    );
    router.push(`/game?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition-all duration-200 hover:scale-105"
        >
          <FaChevronLeft
            size={14}
            className="transform transition-transform group-hover:-translate-x-1 text-purple-600 dark:text-purple-400 text-base mt-[1px]"
          />
          <span className="text-purple-600 dark:text-purple-400">
            Back to Setup
          </span>
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
        onMoveCount={handleMoveCount}
      />

      <EndGameModal
        isOpen={isGameOver}
        onRestart={handleRestart}
        onRandomRestart={handleRandomRestart}
        onBackToSetup={() => router.push("/")}
        time={time}
        moves={moves}
        isSuccess={isSuccess}
      />
    </div>
  );
}

export default function Game() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <main className="min-h-screen p-8 pb-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <GameContent />
        <Footer />
      </main>
    </Suspense>
  );
}
