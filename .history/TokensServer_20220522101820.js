const express=require("express");
const app=express();
const mongoose=require("mongoose");
const session=require("express-session");
const cors=require("cors");


app.use(express.json());
app.use(express.urlencoded());
app.use(cors);

app.post("/register",(req,res)=)