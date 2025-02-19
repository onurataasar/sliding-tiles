export interface PuzzlePiece {
  id: number;
  currentPosition: number;
  originalPosition: number;
  isEmpty: boolean;
}

export interface GameState {
  pieces: PuzzlePiece[];
  isComplete: boolean;
  imageUrl: string;
  gridSize: number;
}
