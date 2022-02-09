const express = require("express");

const app = express();

/**
 * Set up middle ware to handle the header. No path filters specified so ALL requests to Express
 * will hit this function.
 */
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    response.setHeader("Access-Control-Allow-Methods", 
    "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();//all request should be allowed to continue to the next methods.
});

app.use("/api/posts", (req, res, next) => {
    //later will actually be from 
    const posts = [
        {
            id: "asdf168163",
            title: "First server-side post",
            content: "This is coming from the server."
        },
        {
            id: "avbef561sdf",
            title: "Second server-side post",
            content: "This is also coming from the server!"
        }
    ];

    res.status(200).json({
        message: "Posts fetched successfully!",
       posts: posts
    });
});

module.exports = app;