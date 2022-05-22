const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const userSchema=mongoose.Schema({
    username:{
        type:String
    },
    password :{
        type:String
    }
})


userSchema.pre("save", async function (next) {
    console.log("Running pre funciton");
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  });

  const userModel=mongoose.model('UserPassport',userSchema);

module.exports =userModel;


