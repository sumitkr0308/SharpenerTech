const http=require("http");
const fs=require("fs");
const server=http.createServer((req,res)=>{
    // url method
    const url=req.url;
    const method=req.method;
  
    if(url==='/')
    {
        res.setHeader("Content-Type","text/html");
        res.end(
           
        //    form
            `
            <form action="/message" method="POST">
            <label>Name: </label>
            <input type="text" name="username"></input>
            <button type="submit" >ADD</button>
            </form>
            `
        )
    }
    else{
        if(req.url=='/message' && method==="POST")
        {
            res.setHeader("Content-Type","text/html");
            let dataChunks=[];
            req.on("data",(chunks)=>{
                dataChunks.push(chunks);
            })
            req.on("end",()=>{
                const buffer = Buffer.concat(dataChunks);
                const formData = buffer.toString();  
                console.log("Raw form data:", formData);

                const formValue = formData.split("=")[1];
                console.log("Extracted username:", formValue);

                // Write to file
                fs.writeFile("message.txt", formValue,(err)=>{
                // Redirect back to "/"
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();

                });

               
            })
        }
    }
})
server.listen(3000,()=>{
    console.log("Server is running!");
})