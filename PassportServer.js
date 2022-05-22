const express=require("express");
const app=express();
require("./configLocal/connect");
const User=require("./configLocal/database");
const session=require("express-session");
const passport = require("passport");
const MongoDBSession=require("connect-mongodb-session")(session);


const demo="mongodb://arbazkhan:arbaz@cluster0-shard-00-00.zzhzk.mongodb.net:27017,cluster0-shard-00-01.zzhzk.mongodb.net:27017,cluster0-shard-00-02.zzhzk.mongodb.net:27017/Database?ssl=true&replicaSet=atlas-tzihjk-shard-0&authSource=admin&retryWrites=true&w=majority";


const store=new MongoDBSession({
    uri:demo,
    collection:"mysessionnode"
})

app.use(session({
    secret:"Key that will sign the cookie",
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        maxAge:24*60*60
    }
    
    }))


require("./configLocal/passport")
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}))

app.get("/login",(req,res)=>{
    res.render("login");
})


app.get("/register",(req,res)=>{

    res.render("register")
})


app.post("/register",async (req,res)=>{
    let {username,password}=req.body;
   console.log(req.body) 
    
    let user=new User({
username,
password
    })

   let result= await user.save();

   console.log(result);

   res.send("PAssport Post register")

})

app.post("/login",passport.authenticate('local',{successRedirect:'protected',failureRedirect: '/failure'}))

app.get("/failure",(req,res)=>{
    res.send("Failue page")
})


app.get("/check",(req,res)=>{
    console.log("checking")
    console.log(req.session);
    console.log(req.user);
    console.log(req.isAuthenticated()) //it tell whether user is login or not
    res.send("check")
})
app.get("/login",(req,res)=>{
    res.send("PAssport")
})

app.get("/protected",(req,res)=>{
    res.send("PAssport Protected")
})

app.get("/logout",(req,res)=>{
  req.logOut();
    res.send("PAssport Logout")
})

app.listen(4000,(req,res)=>{
    console.log("Server runnin at port 4000")
})