import { FaArrowRotateLeft, FaDiceFive, FaHouse } from "react-icons/fa6";
import { FaCopy, FaWhatsapp, FaXTwitter, FaFacebook } from "react-icons/fa6";

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

  const getShareUrl = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (!params.has("imageUrl")) {
      params.set("imageUrl", window.location.href.split("?")[0]);
    }
    return `https://sliding-tiles-eight.vercel.app${
      url.pathname
    }?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      alert("Link copied to clipboard! Share it with your friends!");
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const shareText = `I just ${
    isSuccess ? "solved" : "played"
  } this puzzle in ${formatTime(time)} with ${moves} moves! Can you beat me?`;

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${getShareUrl()}`
    )}`;
    window.open(url, "_blank");
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank");
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getShareUrl()
    )}`;
    window.open(url, "_blank");
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
            className="h-12 flex items-center justify-center gap-2 p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <FaArrowRotateLeft className="text-xl" /> Try Again
          </button>
          <button
            onClick={onRandomRestart}
            className="h-12 flex items-center justify-center gap-2 p-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
          >
            <FaDiceFive className="text-xl" /> Random Image
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share your result:
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="text-xl" />
            </button>
            <button
              onClick={handleTwitterShare}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-black text-white hover:bg-gray-900 transition-colors"
              title="Share on X (Twitter)"
            >
              <FaXTwitter className="text-2xl" />
            </button>
            <button
              onClick={handleFacebookShare}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Share on Facebook"
            >
              <FaFacebook className="text-xl" />
            </button>
            <button
              onClick={handleCopyLink}
              className="w-12 h-12 flex items-center justify-center rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              title="Copy Link"
            >
              <FaCopy className="text-xl" />
            </button>
          </div>
        </div>

        <button
          onClick={onBackToSetup}
          className="h-12 w-full flex items-center justify-center gap-2 p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FaHouse className="text-xl" /> Back to Setup
        </button>
      </div>
    </div>
  );
}
