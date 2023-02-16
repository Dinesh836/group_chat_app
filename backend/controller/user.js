const express = require("express")
const User = require("../model/User")
let UUID = require("uuid")

exports.signup = async(req , res ) => {

    try{
        let {name , password , email , mobile} = req.body
    
        //check 
        if(!name && !email && !password ){
            res.status(400).send({status : 400 , message : "name or email or password missing"})
        }

        //validate email
        // code to write here for validate email

        const addUser = await User.create({
            _id : UUID.v4() , 
            name , 
            email , 
            password , 
            mobile
        })
    
        if(addUser){
            res.status(200).send({status : 200 , message : "successfully added user to our app "})
        }else {
            res.status(500).send({status : 500 , message : "something went wrong during saving user in db "})
        }
    }catch(err){
        console.log()
        res.status(500).send({status : 500 , message : "something went wrong "})
    }
}

exports.login = async(req , res ) => {
    try{
        let {email , password } = req.body
        if(!email && !password){
            res.status(500).send({status : 500 , message : "plz provide eamil or password"})
        }
        let userExist = await User.findOne({
            email : email
        } , 
        {
            password : 1
        }).lean()


        if(userExist && userExist.password){
            if(userExist.password === password){
                let lastLoggedinTime = await User.updateOne({
                    email : email
                } , 
                {
                    lastLoggedinTime : new Date()
                })

                if(lastLoggedinTime.matchedCount === 1 && lastLoggedinTime.modifiedCount == 1){
                    res.status(200).send({status : 200 , message : "successfully loged in  "})
                }
            }else {
                res.status(401).send({status : 401 , message : "wrong password"})
            }
        } else {
            res.status(500).send({status : 500 , message : "plz provide correct email address"})
        }
    }catch(err){
        console.log("err in login api " , err)
        res.status(500).send({status : 500 , message : "something went wrong"})
    }
}

exports.fetchAllUser = async (req , res ) => {
    try{
        let allUser = await User.find({} , {name : 1 , email: 1 , mobile : 1 }).lean()
        if(!allUser.length){
            res.status(200).send({status : 200 , message :"no user to show "})
        }else{
            res.status(200).send({status : 200 , data : allUser})
        }
    }catch(err) {
        console.log("error in fetchAllUser" , err)
    }
    console.log("fetchAllUser")
}