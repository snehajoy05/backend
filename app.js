const http = require("http");
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.writeHead(200);
    res.end("Hello")
});

server.listen(4000,()=>{
    console.log("server is listening to 3000")
})