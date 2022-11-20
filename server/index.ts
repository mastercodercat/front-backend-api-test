import net from "net";

import Client from "./client";

const server = net.createServer();
const port = 8124;

server.listen(port, () => {
  console.log(
    `Server listening for connection requests on socket localhost:${port}`
  );
});

server.on("connection", (socket: net.Socket) => {
  console.log("A new connection has been established.");

  const client = new Client(socket);

  socket.write("hello\r\n");

  socket.on("data", (chunk) => {
    client.process(chunk.toString());
  });

  socket.on("end", () => {
    console.log("Closing connection with the client.");
  });

  socket.on("error", (err: Error) => {
    console.log(`Error: ${err}`);
  });
});
