"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { FaDice, FaImages } from "react-icons/fa";
import {
  DEFAULT_GRID_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
} from "@/utils/puzzleUtils";
import CustomSelect from "@/components/CustomSelect";
import ImageBrowserModal from "@/components/ImageBrowserModal";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Footer from "@/components/Footer";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRnzZU_IBmGoYCNB6pdQB3T2Z-t0-nXq0uIs2w-rs6uV8SAxwCt5LRgwmDk1vF6KKDKbl_cTnHEscdO2g10oYIQ9g"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridSize, setGridSize] = useState(DEFAULT_GRID_SIZE);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [gameMode, setGameMode] = useState("sliding");
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      const params = new URLSearchParams({
        imageUrl: imageUrl.trim(),
        gridSize: gridSize.toString(),
        mode: gameMode,
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
    <main className="min-h-screen flex flex-col items-center justify-center p-8 pb-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {isDarkMode ? "🌞" : "🌙"}
      </button>

      <div className="w-full max-w-md md:max-w-4xl space-y-8 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Sliding Puzzle
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your game mode and customize your puzzle
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium block">Game Mode</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGameMode("sliding")}
                  className={`flex-1 p-2 text-sm rounded-lg border transition-colors flex flex-col items-center gap-1 ${
                    gameMode === "sliding"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">🎯</span>
                  <span>Sliding Tiles</span>
                  <span className="text-[10px] opacity-80">
                    Move tiles to empty space
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setGameMode("puzzle")}
                  className={`flex-1 p-2 text-sm rounded-lg border transition-colors flex flex-col items-center gap-1 ${
                    gameMode === "puzzle"
                      ? "bg-purple-600 text-white border-purple-600"
                      : "dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">🧩</span>
                  <span>Regular Puzzle</span>
                  <span className="text-[10px] opacity-80">
                    Swap any two pieces
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium block">Grid Size</label>
              <CustomSelect
                value={gridSize}
                onChange={setGridSize}
                options={gridSizeOptions}
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium block">Choose Image</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL..."
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setImageUrl(
                      `https://picsum.photos/800/800?random=${Math.random()}`
                    )
                  }
                  className="flex-1 p-2 text-sm rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FaDice className="text-lg" /> Random
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 p-2 text-sm rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FaImages className="text-lg" /> Browse
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {imageUrl && (
              <div className="relative aspect-square w-full rounded-lg overflow-hidden border dark:border-gray-700">
                {isImageLoading && (
                  <div className="absolute inset-0 z-10">
                    <Skeleton
                      className="h-full w-full"
                      baseColor={isDarkMode ? "#374151" : "#f3f4f6"}
                      highlightColor={isDarkMode ? "#4b5563" : "#e5e7eb"}
                    />
                  </div>
                )}
                <Image
                  src={imageUrl}
                  alt="Selected puzzle image"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
                  priority
                  unoptimized
                  onLoadingComplete={() => setIsImageLoading(false)}
                  onLoad={() => setIsImageLoading(false)}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    setTimeout(() => {
                      img.style.display = "block";
                      setIsImageLoading(false);
                    }, 100);
                  }}
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium text-lg"
            >
              Start Game
            </button>
          </div>
        </form>
      </div>

      <Footer />

      <ImageBrowserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setImageUrl}
      />
    </main>
  );
}
