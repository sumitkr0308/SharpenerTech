const http = require("http");
const routes=require("./routes");
// routes.taskCompleted();
routes.completion();

// const server = http.createServer(routes);
const server = http.createServer(routes.handler);
   

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
