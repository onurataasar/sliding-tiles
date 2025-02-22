"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import { DEFAULT_GRID_SIZE } from "@/utils/puzzleUtils";
import Footer from "@/components/Footer";
import { Suspense } from "react";

function GameContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const imageUrl =
    searchParams.get("imageUrl") ||
    "https://source.unsplash.com/random/800x800";
  const gridSize = Number(searchParams.get("gridSize")) || DEFAULT_GRID_SIZE;
  const mode = (searchParams.get("mode") || "sliding") as "sliding" | "puzzle";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
        >
          ← Back to Setup
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      <SlidingPuzzle imageUrl={imageUrl} gridSize={gridSize} mode={mode} />
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
