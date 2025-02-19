"use client";

import { useState } from "react";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import { useTheme } from "@/context/ThemeContext";
import {
  DEFAULT_GRID_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
} from "@/utils/puzzleUtils";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/random/800x800"
  );
  const [inputUrl, setInputUrl] = useState("");
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      setImageUrl(inputUrl.trim());
      setInputUrl("");
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sliding Puzzle
          </h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <form onSubmit={handleSubmit} className="flex-1 flex gap-4">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Load Image
            </button>
          </form>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Grid Size:</label>
            <select
              value={gridSize}
              onChange={(e) => setGridSize(Number(e.target.value))}
              className="px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Array.from(
                { length: MAX_GRID_SIZE - MIN_GRID_SIZE + 1 },
                (_, i) => i + MIN_GRID_SIZE
              ).map((size) => (
                <option key={size} value={size}>
                  {size}x{size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <SlidingPuzzle imageUrl={imageUrl} gridSize={gridSize} />
      </div>
    </main>
  );
}
