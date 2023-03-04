const express = require("express")
const Msg = require("../model/msg")
const uuid = require("uuid")

exports.sendSMS = async (req , res) => {
    try{
      
   
    }catch(err){
        console.log("error in sending sms" , err)
        res.status(500).send({status : 500 , message : "internal server error"})
    }
}

exports.fetchSMS = async (req , res) => {
    // console.log("fetchSMS")
    try{
        
    }catch(err){
        console.log("error in fetch sms api " , err)
        res.status(500).send({status : 500 , message :"internal server error"})
    }
}

