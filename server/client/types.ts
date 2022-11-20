export type Position = {
  x: number;
  y: number;
};

export type Direction = {
  dx: -1 | 0 | 1;
  dy: -1 | 0 | 1;
};

export type DrawMode = 0 | 1 | 2;

export type MoveResponse = {
  pos: Position;
  canvas: number[][];
};
