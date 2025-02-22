export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="relative w-32 h-32 mb-8">
        {/* Grid of animated squares */}
        <div className="grid grid-cols-3 gap-1 absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-700 rounded-md animate-pulse"
              style={{
                animation: `pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) ${
                  i * 0.1
                }s infinite`,
              }}
            />
          ))}
          {/* Empty space */}
          <div className="bg-transparent" />
        </div>
      </div>

      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        Loading your puzzle...
      </h2>

      <div className="mt-4 flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-purple-600 animate-bounce"
            style={{
              animation: `bounce 1s cubic-bezier(0.4, 0, 0.6, 1) ${
                i * 0.2
              }s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
