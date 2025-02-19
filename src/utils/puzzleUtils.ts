import { PuzzlePiece } from "@/types/puzzle";

export const GRID_SIZE = 4;
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

export const createInitialPieces = (): PuzzlePiece[] => {
  return Array.from({ length: TOTAL_PIECES }, (_, index) => ({
    id: index,
    currentPosition: index,
    originalPosition: index,
    isEmpty: index === TOTAL_PIECES - 1,
  }));
};

const isSolvable = (pieces: PuzzlePiece[]): boolean => {
  let inversions = 0;
  const values = pieces.filter((p) => !p.isEmpty).map((p) => p.currentPosition);

  for (let i = 0; i < values.length - 1; i++) {
    for (let j = i + 1; j < values.length; j++) {
      if (values[i] > values[j]) inversions++;
    }
  }

  const emptyRow = Math.floor(
    pieces.find((p) => p.isEmpty)!.currentPosition / GRID_SIZE
  );
  return GRID_SIZE % 2 === 0 && emptyRow % 2 === 0
    ? inversions % 2 === 0
    : inversions % 2 === 1;
};

export const shufflePieces = (pieces: PuzzlePiece[]): PuzzlePiece[] => {
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
  } while (!isSolvable(shuffled) || isPuzzleComplete(shuffled));

  return shuffled;
};

export const isAdjacent = (pos1: number, pos2: number): boolean => {
  const row1 = Math.floor(pos1 / GRID_SIZE);
  const col1 = pos1 % GRID_SIZE;
  const row2 = Math.floor(pos2 / GRID_SIZE);
  const col2 = pos2 % GRID_SIZE;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
};

export const isPuzzleComplete = (pieces: PuzzlePiece[]): boolean => {
  return pieces.every(
    (piece) => piece.currentPosition === piece.originalPosition
  );
};

export const calculatePosition = (position: number) => {
  const row = Math.floor(position / GRID_SIZE);
  const col = position % GRID_SIZE;
  return {
    x: col * 100,
    y: row * 100,
  };
};
