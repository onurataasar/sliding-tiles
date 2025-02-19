import { useState, useRef, useCallback, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function ImageBrowserModal({
  isOpen,
  onClose,
  onSelect,
}: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const observer = useRef<IntersectionObserver | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useTheme();

  const loadImages = () => {
    const newImages = Array.from({ length: 24 }, (_, index) => {
      const timestamp = Date.now() + index;
      const seed = Math.floor(Math.random() * 1000);
      return `https://picsum.photos/seed/${seed}_${timestamp}/800/800`;
    });

    const newLoadingStates = newImages.reduce((acc, url) => {
      acc[url] = true;
      return acc;
    }, {} as { [key: string]: boolean });
    setLoadingStates((prev) => ({ ...prev, ...newLoadingStates }));
    return newImages;
  };

  useEffect(() => {
    if (isOpen && images.length === 0) {
      setImages(loadImages());
    }
  }, [isOpen, images.length]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoading(true);
          setImages((prev) => [...prev, ...loadImages()]);
          setLoading(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-xl w-[90vw] max-w-4xl h-[90vh] p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold mb-4">Choose an Image</h2>

        <div className="h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
            {images.map((url, index) => (
              <div key={url + index} className="relative pt-[100%]">
                <button
                  onClick={() => {
                    onSelect(url);
                    onClose();
                  }}
                  className="absolute inset-0 rounded-lg overflow-hidden hover:ring-2 ring-purple-500 transition-all hover:scale-[1.02]"
                >
                  {loadingStates[url] && (
                    <div className="absolute inset-0 z-10">
                      <Skeleton
                        className="h-full w-full"
                        baseColor={isDarkMode ? "#374151" : "#f3f4f6"}
                        highlightColor={isDarkMode ? "#4b5563" : "#e5e7eb"}
                      />
                    </div>
                  )}
                  <Image
                    src={url}
                    alt={`Random ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    priority={index < 8}
                    onLoadingComplete={() => {
                      setLoadingStates((prev) => ({ ...prev, [url]: false }));
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
          {!loading && <div ref={loadMoreRef} className="h-4" />}
        </div>
      </div>
    </div>
  );
}
