const mongoose=require("mongoose");

const demo="mongodb://arbazkhan:arbaz@cluster0-shard-00-00.zzhzk.mongodb.net:27017,cluster0-shard-00-01.zzhzk.mongodb.net:27017,cluster0-shard-00-02.zzhzk.mongodb.net:27017/Google?ssl=true&replicaSet=atlas-tzihjk-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(demo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Monogdb connected")
})
