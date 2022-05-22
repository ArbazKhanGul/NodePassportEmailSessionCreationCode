const express=require("express");
const app=express();
const mongoose=require("mongoose");
const session=require("express-session");

const MongoDBSession=require("connect-mongodb-session")(session);

const demo="mongodb://arbazkhan:arbaz@cluster0-shard-00-00.zzhzk.mongodb.net:27017,cluster0-shard-00-01.zzhzk.mongodb.net:27017,cluster0-shard-00-02.zzhzk.mongodb.net:27017/Database?ssl=true&replicaSet=atlas-tzihjk-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(demo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Monogdb connected")
})


const store=new MongoDBSession({
    uri:demo,
    collection:"mysessionnode"
})


app.use(session({
secret:"Key that will sign the cookie",
resave:false,
saveUninitialized:false,
store:store,

}))


// use req.session=null for logout

app.get("/",(req,res)=>{
    console.log(req.ip);
    req.session.newid="new id save";

    // it set the time for cookie so that on closing browser session not close
    // var hour = 3600000;
    // req.session.cookie.maxAge = 14 * 24 * hour;

    req.session.isAuth=true;
//   console.log(req.session.id)
    res.send("Hello Sessions lll tut");

})
app.get("/about",(req,res)=>{
    console.log(req.session.id)
    console.log(req.session.newid)
//    it tell whether person is login or not
    // if(req.session.isAuth)
    // {
    //     login
    // }
    // res.cookie("hello","welcome ot pakisatan");
      res.send("Hello about page");
  
  })
app.get("/logout",(req,res)=>{

    req.session.destroy((err)=>{
        console.log(err)
    });
      // console.log(req.session.id)
      // console.log(req.session.newid)
      // res.cookie("hello","welcome ot pakisatan");
        res.send("Hello about page");
    
    })

app.listen(5000,()=>{
    console.log("Server runnin at port 5000")
})