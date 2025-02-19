"use client";

import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <span>© {new Date().getFullYear()} Onur Ata Asar</span>
        <span>•</span>
        <span>
          Images by{" "}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 dark:text-purple-400 hover:underline"
          >
            Picsum
          </a>
        </span>
        <span>•</span>
        <a
          href="https://github.com/onurataasar/sliding-tiles"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline"
        >
          <FaGithub className="text-lg" />
          GitHub
        </a>
      </div>
    </footer>
  );
}
