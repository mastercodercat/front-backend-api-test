"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const client_1 = __importDefault(require("./client"));
const server = net_1.default.createServer();
const port = 8124;
server.listen(port, () => {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});
server.on("connection", (socket) => {
    console.log("A new connection has been established.");
    const client = new client_1.default(socket);
    socket.write("hello\r\n");
    socket.on("data", (chunk) => {
        client.process(chunk.toString());
    });
    socket.on("end", () => {
        console.log("Closing connection with the client.");
    });
    socket.on("error", (err) => {
        console.log(`Error: ${err}`);
    });
});
//# sourceMappingURL=index.js.map