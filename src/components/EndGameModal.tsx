import { FaRandom, FaShare, FaRedo, FaHome } from "react-icons/fa";

interface EndGameModalProps {
  isOpen: boolean;
  onRestart: () => void;
  onRandomRestart: () => void;
  onBackToSetup: () => void;
  time: number;
  moves: number;
  isSuccess: boolean;
}

export default function EndGameModal({
  isOpen,
  onRestart,
  onRandomRestart,
  onBackToSetup,
  time,
  moves,
  isSuccess,
}: EndGameModalProps) {
  if (!isOpen) return null;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleShare = async () => {
    try {
      // Get current URL and preserve all parameters
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);

      // Ensure all required parameters are present
      if (!params.has("imageUrl")) {
        params.set("imageUrl", window.location.href.split("?")[0]); // fallback to current URL
      }

      const shareUrl = `${window.location.origin}${
        window.location.pathname
      }?${params.toString()}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(
        "Link copied to clipboard! Share it with your friends to challenge them with the same puzzle!"
      );
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl text-center space-y-6 max-w-md w-full">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {isSuccess ? "Fuck yeah! 🎉" : "Time's up! ⏰"}
        </h2>

        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            {isSuccess
              ? "You solved it like a boss!"
              : "Better luck next time, dipshit!"}
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div>Time: {formatTime(time)}</div>
            <div>Moves: {moves}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <FaRedo /> Try Again
          </button>
          <button
            onClick={onRandomRestart}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <FaRandom /> Random Image
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaShare /> Share Link
          </button>
          <button
            onClick={onBackToSetup}
            className="flex items-center justify-center gap-2 p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <FaHome /> Back to Setup
          </button>
        </div>
      </div>
    </div>
  );
}
