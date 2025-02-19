"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import {
  DEFAULT_GRID_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
} from "@/utils/puzzleUtils";
import CustomSelect from "@/components/CustomSelect";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnzZU_IBmGoYCNB6pdQB3T2Z-t0-nXq0uIs2w-rs6uV8SAxwCt5LRgwmDk1vF6KKDKbl_cTnHEscdO2g10oYIQ9g"
  );
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      const params = new URLSearchParams({
        imageUrl: imageUrl.trim(),
        gridSize: gridSize.toString(),
      });
      router.push(`/game?${params.toString()}`);
    }
  };

  const gridSizeOptions = Array.from(
    { length: MAX_GRID_SIZE - MIN_GRID_SIZE + 1 },
    (_, i) => ({
      value: i + MIN_GRID_SIZE,
      label: `${i + MIN_GRID_SIZE}x${i + MIN_GRID_SIZE}`,
    })
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <div className="w-full max-w-md space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Sliding Puzzle
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your custom sliding puzzle
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium block">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL..."
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Grid Size</label>
            <CustomSelect
              value={gridSize}
              onChange={setGridSize}
              options={gridSizeOptions}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
          >
            Start Game
          </button>
        </form>
      </div>
    </main>
  );
}
