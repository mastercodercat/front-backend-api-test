import { Socket } from "net";

import * as COMMANDS from "./commands";
import * as actions from "./actions";
import type { Position, Direction, DrawMode } from "./types";

class Client {
  client: Socket;
  pos: Position;
  direction: Direction;
  drawMode: DrawMode;
  canvas: number[][];

  constructor(client: Socket) {
    this.client = client;
    this.pos = {
      x: 15,
      y: 15,
    };
    this.direction = {
      dx: 0,
      dy: -1,
    };
    this.drawMode = 1;
    this.canvas = [];
    for (let i = 0; i < 30; i++) {
      let row: number[] = [];
      for (let j = 0; j < 30; j++) {
        row.push(0);
      }
      this.canvas.push(row);
    }
  }

  async handleCommand(command: string) {
    const name = command.split(" ")[0].trim();

    switch (name) {
      case COMMANDS.COORD:
        await actions.coord(this.client, this.pos);
        break;

      case COMMANDS.RENDER:
        await actions.render(this.client, this.canvas);
        break;

      case COMMANDS.STEPS:
        const { pos, canvas } = await actions.move(
          command,
          this.canvas,
          this.pos,
          this.direction,
          this.drawMode
        );
        this.pos = pos;
        this.canvas = canvas;
        break;

      case COMMANDS.LEFT:
        this.direction = await actions.rotate(command, this.direction, true);
        break;

      case COMMANDS.RIGHT:
        this.direction = await actions.rotate(command, this.direction, false);
        break;

      case COMMANDS.HOVER:
        this.drawMode = 0;
        break;

      case COMMANDS.DRAW:
        this.drawMode = 1;
        break;

      case COMMANDS.ERASER:
        this.drawMode = 2;
        break;

      case COMMANDS.CLEAR:
        this.canvas = await actions.clear(this.canvas);
        break;

      case COMMANDS.QUIT:
        await actions.quit(this.client);
        break;

      default:
        break;
    }
  }

  async process(commandLine: string) {
    const commands = commandLine.split("\r\n").map((cmd) => cmd.trim());

    for (let i = 0; i < commands.length; i++) {
      await this.handleCommand(commands[i]);
    }
  }
}

export default Client;
