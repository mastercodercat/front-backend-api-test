import { Socket } from "net";
import _ from "underscore";

import type { Direction, MoveResponse, Position } from "./types";

export const move = (
  command: string,
  canvas: number[][],
  pos: Position,
  direction: Direction,
  drawMode: number
) =>
  new Promise<MoveResponse>((resolve, reject) => {
    const steps = parseInt(command.split(" ")[1].trim());
    let x = pos.x,
      y = pos.y;

    for (let i = 1; i <= steps; i++) {
      if (drawMode !== 0) {
        canvas[x][y] = drawMode;
      }
      if (
        x + direction.dx >= 0 &&
        x + direction.dx < 30 &&
        y + direction.dy >= 0 &&
        y + direction.dy < 30
      ) {
        x += direction.dx;
        y += direction.dy;
      }
    }

    resolve({
      pos: { x, y },
      canvas,
    });
  });

export const rotate = (
  command: string,
  direction: Direction,
  isLeft: boolean
) =>
  new Promise<Direction>((resolve, reject) => {
    let amount = 1;
    if (command.split(" ").length > 1) {
      amount = parseInt(command.split(" ")[1].trim());
    }

    const DIRECTIONS: Direction[] = [
      { dx: 0, dy: -1 },
      { dx: 1, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: -1, dy: -1 },
    ];
    const current = DIRECTIONS.findIndex(
      (dr) => dr.dx === direction.dx && dr.dy === direction.dy
    );

    resolve(DIRECTIONS[(current + amount * (isLeft ? -1 : 1) + 8) % 8]);
  });

export const coord = (client: Socket, pos: Position) =>
  new Promise<boolean>((resolve, reject) => {
    client.write(`(${pos.x},${pos.y})\r\n`);
    resolve(true);
  });

export const render = (client: Socket, canvas: number[][]) =>
  new Promise<boolean>((resolve, reject) => {
    client.write(`╔══════════════════════════════╗\r\n`);
    for (let i = 0; i < 30; i++) {
      let row = "║";
      for (let j = 0; j < 30; j++) {
        if (canvas[j][i] === 1) {
          row += "*";
        } else {
          row += " ";
        }
      }
      row += "║";
      client.write(`${row}\r\n`);
    }
    client.write(`╚══════════════════════════════╝\r\n\r\n`);
    resolve(true);
  });

export const clear = (canvas: number[][]) =>
  new Promise<number[][]>((resolve, reject) => {
    let clearedCanvas = canvas;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        clearedCanvas[i][j] = 0;
      }
    }

    resolve(clearedCanvas);
  });

export const quit = (client: Socket) =>
  new Promise<boolean>((resolve, reject) => {
    client.destroy();
    resolve(true);
  });
