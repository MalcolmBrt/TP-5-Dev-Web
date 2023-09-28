import http from "node:http";

const host = "localhost";
const port = 8000;

import fs from "node:fs/promises";

// function requestListener(_request, response) {
//	 fs.readFile("index.html", "utf8")
//		 .then((contents) => {
//			 response.setHeader("Content-Type", "text/html");
//			 response.writeHead(200);
//			 return response.end(contents);
//		 })
//		 .catch((error) => {
//			 console.error(error);
//			 response.writeHead(500);
//			 return response.end("<html><h1>Erreur 500<h1></html>");
//		 });
// }

// async function requestListener(_request, response) {
//	 try {
//		 const contents = await fs.readFile("index.html", "utf8");
//		 response.setHeader("Content-Type", "text/html");
//		 response.writeHead(200);
//		 return response.end(contents);
//	 } catch (error) {
//		 console.error(error);
//		 response.writeHead(500);
//		 return response.end("<html><h1>Erreur 500<h1></html>");
//	 }
// }

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  const splittedUrl = request.url.split("/");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    switch (splittedUrl[1]) {
      case "index.html":
        response.writeHead(200);
        return response.end(contents);
      case "random.html":
        response.writeHead(200);
        return response.end(
          `<html><p>${Math.floor(100 * Math.random())}</p></html>`,
        );
      case "random":
        let nRandom = "";
        for (let i = 0; i < splittedUrl[2]; i++) {
          nRandom += `${Math.floor(100 * Math.random())}<br>`;
        }
        response.writeHead(200);
        return response.end(nRandom);
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
console.log("NODE_ENV =", process.env.NODE_ENV);
