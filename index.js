const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let blogs=[{
    id: uuidv4(),
    username: "Himanshu",
    content:" My first blog"
},
{   id: uuidv4(),
    username: "Anuj",
    content: "My first internship"
},
{   id: uuidv4(),
    username: "Himanshu Sharma",
    content: "My first Placement"
}
];
app.get("/blogs",(req,res)=>{
    res.render("index.ejs",{blogs});
});
app.get("/blogs/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/blogs",(req,res)=>{
    let {username,content}=req.body;
    let id= uuidv4();
    blogs.push({id,username,content});
    res.redirect("/blogs");
});
app.get("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let blog=blogs.find((b)=>id===b.id);
    res.render("show.ejs",{blog});
});
app.patch("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let blog=blogs.find((b)=>id===b.id);
    blog.content=newContent;
    res.redirect("/blogs");
});
app.get("/blogs/:id/edit",(req,res)=>{
    let {id}=req.params;
    let blog=blogs.find((b)=>id===b.id);
    res.render("edit.ejs",{blog});
});
app.delete("/blogs/:id",(req,res)=>{
    let {id}=req.params;
    blogs=blogs.filter((b)=>id!==b.id);
    res.redirect("/blogs");
});
app.listen(port,()=>{
    console.log("listening on port 8080");
});