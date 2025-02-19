"use client";

import { useState } from "react";
import SlidingPuzzle from "@/components/SlidingPuzzle";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/random/800x800"
  );
  const [inputUrl, setInputUrl] = useState("");
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

        <form onSubmit={handleSubmit} className="flex gap-4">
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

        <SlidingPuzzle imageUrl={imageUrl} />
      </div>
    </main>
  );
}
