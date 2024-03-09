const { Server } = require("sm-express-server");

const port = 4001;
const server = new Server(port, "/");

server.addControllers([]);
server.app.get("/", (req, res) => {
    res.send("<h1>Hola mundo de MAGICAL HANDS</h1>")
})
server.start(() => {
    console.log(`server is up on port ${port}`);
});