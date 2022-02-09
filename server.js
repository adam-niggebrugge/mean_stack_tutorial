//Default package that exist within NodeJS.
// Does not require a separate install.
const debug = require("debug")("node-angular");
const http = require('http');
const app = require("./server/app");

/**
 * Check that received port through Process variable is valid
 * @param {*} val either process environment variable or develop mode 3000
 * @returns 
 */
const normalizePort = val => {
    let port = parseInt(val, 10);

    if (isNaN(port)){
        //Named piped
        return val;
    }

    if (port >= 0) {
       //Port number found.
       return port; 
    }

    return false;
};

/**
 * Simply check what error if any received and exit gracefully
 * @param {*} error 
 */
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    
    const bind = typeof addr === "string" ? "pipe "+addr : "port "+PORT;

    switch(error.code){
        case "EACCES":
            console.error(bind+" requires elevated priviledges!!!!!!");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind+" is already in use!!!!!!!!!!");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

/**
 * Simple arrow function that outputs when the port is listening and the value
 */
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe "+addr : "port "+PORT;
    debug(`Listening on ${bind}`);
}

const PORT = normalizePort(process.env.PORT || "3000");

app.set("port", PORT);

const server = http.createServer(app);
//Register listens for errors
server.on("error", onError);
//Register listening log
server.on("listening", onListening);
server.listen(PORT, () => {
    //Output during development check
    console.log(`Backend server is listening on port ${PORT}!!!!`);
});
