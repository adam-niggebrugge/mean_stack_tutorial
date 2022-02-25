const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();
//This will return a valid Express middleware to parse JSON data
app.use(bodyParser.json());
//This will parse URL endcode date
app.use(bodyParser.urlencoded({extended: false}));

db.sync()
    .then(() => {
        console.log(`Synched with DB!`);
    })
    .catch(() =>{
        console.log(`Db failed to synch`);
    })

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

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    
    console.log(post);
    //201 stands for success and new resource was created
    //not required to send back data for post but doing so for demo
    res.status(201).json({
        message: "Post added successfully."
    });
});


app.get("/api/get", (req, res, next) => {
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
    //200 means everything is okay
    res.status(200).json({
        message: "Posts fetched successfully!",
       posts: posts
    });
});



module.exports = app;