const express = require("express")
const Frnds = require("../model/frnds")
const Group = require("../model/Group")
const uuid = require("uuid")

exports.sendSMS = async (req , res) => {
    try{
      let { id } =  req.params  
      let {chatId , to , msgBody , msgType } = req.body

      let msgDetails = {
        msgBody , 
        sender : id , 
        receiver : to ,
        msgType , 
        timeStamp : new Date()
      }

      if(chatId){
        let saveMsg = await Frnds.updateOne({_id : chatId} , {$push :{msges : msgDetails}})

        if(saveMsg.modifiedCount === 1){
            res.status(200).send({status : 200 , message : "msg send successfully"})
        }
      }else {
        res.status(500).send({status : 500 , message : "chatId is missing"})
      }
   
    }catch(err){
        console.log("error in sending sms" , err)
        res.status(500).send({status : 500 , message : "internal server error"})
    }
}

exports.fetchSMS = async (req , res) => {
    // console.log("fetchSMS")
    try{
        let { id } = req.params
        let { source } = req.body
        let sourceCollection = source.toLowerCase() === "group" ?  Group : Frnds
        let smses = await sourceCollection.find({_id : id} , { _id : 0 , msges : 1}).lean()

        if(smses){
            res.send(200).send({status : 200 , data : smses , message : "success"})
        }
    }catch(err){
        console.log("error in fetch sms api " , err)
        res.status(500).send({status : 500 , message :"internal server error"})
    }
}

