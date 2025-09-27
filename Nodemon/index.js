const http=require("http");
const server=http.createServer((req,res)=>{
    if(req.url==='/')
    {
        res.end(`
            <h1>Hello I am Sumit</h1>
            <h2>I am a Sharpennerians</h2>
            <h3>I Love Coding</h3>
            </h4>I want to be a good SDE</h4>`)
    }
})

server.listen(3000,()=>{
    console.log("Server is running")
})