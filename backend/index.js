const express=require("express");
const app=express();
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello from backend");
})
app.get("/about",(req,res)=>{
    res.send("Hello from about page");
})

app.post("/signup",(req,res)=>{
    console.log(req.body);
    res.send("Signup data received")
})








app.listen(8000,()=>{
    //server started
    console.log("server is running on port 8000");
});