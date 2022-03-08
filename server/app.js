const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");

const Post = require("./models/post");

const app = express();
//This will return a valid Express middleware to parse JSON data
app.use(bodyParser.json());
//This will parse URL endcode date
app.use(bodyParser.urlencoded({extended: false}));

db.sync()
    .then(() => {
        console.log(`Synched with DB!`);
    })
    .catch((err) =>{
        console.log(`Db failed to synch, the error is ${err}`);
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
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    
    post.save();
    //201 stands for success and new resource was created
    //not required to send back data for post but doing so for demo
    res.status(201).json({
        message: "Post added successfully."
    });
});


 app.get("/api/get", async (req, res, next) => {
     try{
         console.log(`Inside of app.get for blog posts`)
        const returnedPosts = await Post.findAll()
        
        if(returnedPosts === null){
            res.status(200).json({
                message: "No posts available!"
            })
        } else {
            //200 means everything is okay
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: returnedPosts
            });
        }
     } catch (err){
         console.log(err);
         res.status(500).json(err);
     }
   
});

app.delete("/api/posts/:id", async (req, res, next) => {
    try{
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        console.log("Oh dear god we just lost post id "+req.params.id);
        res.status(200).json({
            message: "Post Deleted"
        })
    } catch (err){
        console.log(err);
        res.status(500).json(err)
    }
});

module.exports = app;