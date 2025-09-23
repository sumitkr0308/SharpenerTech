const http=require('http');


const server=http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type': 'text/plain'})
    if(req.url==='/')
    {
        res.end("Hello World");
    }
    else if(req.url==='/pizza')
    {
        res.end("This is your pizza")
    }
    else if(req.url==='/home')
    {
        res.end("Welcome to About Us")
    }
    else if(req.url==='/node')
    {
        res.end("Welcome to my Node JS project")
    }
    else{
        res.statusCode=404;
        res.end("Page not found")
    }
})
let port=3000;
server.listen(port,()=>{
    console.log("Serevr is running")
})