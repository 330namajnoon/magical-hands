const { Server } = require("sm-express-server");
const magicalHandsControllers = require("./Controllers");

const port = 4001;
const server = new Server(port, "/dist");

server.addControllers(magicalHandsControllers);

server.start(() => {
    console.log(`server is up on port ${port}`);
});