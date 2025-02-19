import { PuzzlePiece } from "@/types/puzzle";

export const DEFAULT_GRID_SIZE = 4;
export const MIN_GRID_SIZE = 2;
export const MAX_GRID_SIZE = 8;

export const createInitialPieces = (gridSize: number): PuzzlePiece[] => {
  const totalPieces = gridSize * gridSize;
  return Array.from({ length: totalPieces }, (_, index) => ({
    id: index,
    currentPosition: index,
    originalPosition: index,
    isEmpty: index === totalPieces - 1,
  }));
};

const isSolvable = (pieces: PuzzlePiece[], gridSize: number): boolean => {
  let inversions = 0;
  const values = pieces.filter((p) => !p.isEmpty).map((p) => p.currentPosition);

  for (let i = 0; i < values.length - 1; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] > values[j]) inversions++;
    }
  }

  const emptyRow = Math.floor(
    pieces.find((p) => p.isEmpty)!.currentPosition / gridSize
  );
  return gridSize % 2 === 0 && emptyRow % 2 === 0
    ? inversions % 2 === 0
    : inversions % 2 === 1;
};

export const shufflePieces = (
  pieces: PuzzlePiece[],
  gridSize: number
): PuzzlePiece[] => {
  let shuffled: PuzzlePiece[];
  do {
    shuffled = [...pieces];
    for (let i = shuffled.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (!shuffled[i].isEmpty && !shuffled[j].isEmpty) {
        [shuffled[i].currentPosition, shuffled[j].currentPosition] = [
          shuffled[j].currentPosition,
          shuffled[i].currentPosition,
        ];
      }
    }
  } while (!isSolvable(shuffled, gridSize) || isPuzzleComplete(shuffled));

  return shuffled;
};

export const isAdjacent = (
  pos1: number,
  pos2: number,
  gridSize: number
): boolean => {
  const row1 = Math.floor(pos1 / gridSize);
  const col1 = pos1 % gridSize;
  const row2 = Math.floor(pos2 / gridSize);
  const col2 = pos2 % gridSize;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
};

export const isPuzzleComplete = (pieces: PuzzlePiece[]): boolean => {
  return pieces.every(
    (piece) => piece.currentPosition === piece.originalPosition
  );
};

export const calculatePosition = (position: number) => {
  const row = Math.floor(position / DEFAULT_GRID_SIZE);
  const col = position % DEFAULT_GRID_SIZE;
  return {
    x: col * 100,
    y: row * 100,
  };
};
