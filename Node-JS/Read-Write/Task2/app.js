const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // Home route -> Show messages + form
    if (url === "/" && method === "GET") {
        fs.readFile("messages.txt", "utf8", (err, data) => {
            let messages = "";

            if (!err && data) {
                // Split messages by newline & show newest first
                const messageArray = data.trim().split("\n").reverse();
                messages = messageArray.map(msg => `<p>${msg}</p>`).join("");
            }

            res.setHeader("Content-Type", "text/html");
            res.end(`
                <html>
                  <head><title>Message Board</title></head>
                  <body>
                    <h2>Recent Messages</h2>
                    ${messages || "<p>No messages yet!</p>"}
                    <hr />
                    <form action="/message" method="POST">
                        <label>Message: </label>
                        <input type="text" name="username" />
                        <button type="submit">Send</button>
                    </form>
                  </body>
                </html>
            `);
        });
    }

    // Handle POST /message
    else if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });

        req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split("=")[1].replace(/\+/g, " "); // handle spaces

            // Append new message to file
            fs.appendFile("messages.txt", name + "\n", (err) => {
                if (err) console.error(err);

                // Redirect back to "/"
                res.statusCode = 302;
                res.setHeader("Location", "/");
                res.end();
            });
        });
    }

    // 404 fallback
    else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 - Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
