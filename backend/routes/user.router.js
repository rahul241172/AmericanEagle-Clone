const express=require("express")
const {UserModel}=require("../models/User.model")
const users=express.Router()

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


users.get("/",async(req,res)=>{
    let q=req.headers.authorization
    jwt.verify(q,process.env.jwtsecret,async(err, decoded)=>{
        if(decoded){
            try{
                let data=await UserModel.find()
                res.send(data)
               }catch(err){
                console.log(err)
               }
            }
            else{
                res.send("Please Login")
            }
      })
})
users.post("/register",async(req,res)=>{
const {email,password,name}=req.body
try{
    const data=await UserModel.find({email})
        if(data.length>0){
    res.send("Already registered")
        }
    else{
    bcrypt.hash(password, 5,async(err, hash)=>{
        const user=new UserModel({email,password:hash,name})
    await user.save()
    res.send("registered")
    });
    }
}catch(err){
    console.log(err)
}
})

users.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const data=await UserModel.find({email})
        
        if(data.length>0){
            bcrypt.compare(password,data[0].password,(err, result)=> {
                if(result){
                    var token= jwt.sign({userID:data[0]._id},"masai", {
                        expiresIn: '1h',
                     });
                     res.send({ msg: "Login Successful", token: token })
                    
                }
             });
        }
        else{
            res.send("wrong credentials")  
        }
    }catch(err){
        console.log(err)
    }
    })

module.exports={
    users
}