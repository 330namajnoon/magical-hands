const { Server } = require("sm-express-server");

const server = new Server(4001, "/public");

server.start(() => {
    console.log("server is up on port 4001!");
})
