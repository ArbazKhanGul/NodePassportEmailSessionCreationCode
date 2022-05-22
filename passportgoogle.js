const express=require("express");
const app=express();
require("./configLocal/connect");
const User=require("./configGoogle/database");
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


require("./configGoogle/passport");
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}))

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/callback', 
  passport.authenticate('google', { failureRedirect: '/login',successRedirect :"/protected" }),
  );

app.get("/check",(req,res)=>{
    // console.log("checking")
    console.log(req.session);
    console.log(req.user);
    console.log(req.isAuthenticated()) //it tell whether user is login or not
    res.send("check")
})

app.get("/protected",(req,res)=>{
    res.send("PAssport Protected")
})

app.get("/logout",(req,res)=>{
  req.logOut();
//   req.session.destroy((err)=>{
//     console.log(err)
// });
    res.send("PAssport Logout")
})

app.listen(5000,(req,res)=>{
    console.log("Server runnin at port 5000")
})