const express = require("express");

const app = express();

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