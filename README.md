# Front Backend Test

This purpose of this test is to build a TCP server implementing a simple protocol very loosely inspired by LOGO. When a client connects, it will be able to send simple commands to the server to draw on a canvas. It will also call ask the server to render the current canvas.

## Author

Roy Lee

## Application Dependencies

- Node.js >= 14.16

- TypeScript

## Directory Structure

- `server`

  - `client`: Client class to handle commands
    - `actions.ts`: define actions for commands
    - `client.ts`: save cursor, canvas, drawMode status and socket connection with client to send response and handle commands from clients
    - `commands.ts`: define commands
    - `index.ts`: export client class
    - `types.ts`: define types for client

  `index.ts`

## How to run

- First, install node.js in your local environment.

- Second, to install node modules for this server, run `npm install` command in this directory.

- After installing all node modules, you can start server by running `npm run dev` command.

  If you successfully started a server, you can see this sentence.

  `Server listening for connection requests on socket localhost:8124`

- To test a tcp server, you can run `npm test` command while hosting a server on 8124 port.

## How to build

- Install node.js in your local environment.

- Run `npm run build` command in this directory.

- Run `npm start` after building.

## Commands

- `steps <n>`: move the cursor n steps in the current direction.

- `left <n>`, `right <n>`: change the direction (see “Directions” below).

- `hover`, `draw`, `eraser`: set the brush mode (see “Drawing” below).

- `coord`: print the current coordinates of the cursor with the format (x,y).

- `render`: print the current canvas.

- `clear`: erase the current canvas, while keeping the current cursor and direction.

- `quit`: closes the current connection.

## Approach

I used TypeScript and Node.js to build a TCP server to draw on canvas with commands. I integrated Client class in purpose to handle commands. With a maintainable project structure, it is easy and simple to understand, extend and maintain.

## Note

Please stop server or service which was hosted on 8124 port before running this server.

THANK YOU
