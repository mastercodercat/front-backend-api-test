"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EVENTS = __importStar(require("./events"));
const actions = __importStar(require("./actions"));
class Client {
    constructor(client) {
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
            let row = [];
            for (let j = 0; j < 30; j++) {
                row.push(0);
            }
            this.canvas.push(row);
        }
    }
    handleCommand(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = command.split(" ")[0].trim();
            switch (name) {
                case EVENTS.COORD:
                    yield actions.coord(this.client, this.pos);
                    break;
                case EVENTS.RENDER:
                    yield actions.render(this.client, this.canvas);
                    break;
                case EVENTS.STEPS:
                    const { pos, canvas } = yield actions.move(command, this.canvas, this.pos, this.direction, this.drawMode);
                    this.pos = pos;
                    this.canvas = canvas;
                    break;
                case EVENTS.LEFT:
                    this.direction = yield actions.rotate(command, this.direction, true);
                    break;
                case EVENTS.RIGHT:
                    this.direction = yield actions.rotate(command, this.direction, false);
                    break;
                case EVENTS.HOVER:
                    this.drawMode = 0;
                    break;
                case EVENTS.DRAW:
                    this.drawMode = 1;
                    break;
                case EVENTS.ERASER:
                    this.drawMode = 2;
                    break;
                case EVENTS.CLEAR:
                    this.canvas = yield actions.clear(this.canvas);
                    break;
                case EVENTS.QUIT:
                    yield actions.quit(this.client);
                    break;
                default:
                    break;
            }
        });
    }
    process(commandLine) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = commandLine.split("\r\n").map((cmd) => cmd.trim());
            for (let i = 0; i < commands.length; i++) {
                yield this.handleCommand(commands[i]);
            }
        });
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map