const express = require("express")
const Frnds = require("../model/frnds")
const Group = require("../model/Group")
const uuid = require("uuid")

exports.sendSMS = async (req , res) => {
    try{
      let { id } =  req.params  
      let {chatId , to , msgBody , msgType , source} = req.body

      let msgDetails = {
        msgId : uuid.v4() , 
        msgBody , 
        sender : id , 
        receiver : to ,
        msgType , 
        timeStamp : new Date()
      }

      let sourceCollection = source.toLowerCase() === "group" ?  Group : Frnds

      if(chatId){
        let saveMsg = await sourceCollection.updateOne({_id : chatId} , {$push :{msges : msgDetails}})

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

exports.deleteMsg = async (req , res ) => {
  try{
    let {id} = req.params
    let { chatId , userId , source } = req.body

    let collectionName = source.toLowerCase() === "personal" ? Frnds : Group

    let msgObject = await collectionName.aggregate([
      {
        $match :{_id : chatId}
      },
      {
        $unwind : "$msges"
      } ,
      {
        $match :{"msges.msgId":id}
      },
      {
        $project :{
          _id : 0 , 
          timeStamp : new Date() ,
          msges: 1
        }
      }
    ])

    if(msgObject[0].msges.sender !== userId) {
      res.status(400).send({status: 400 , message : `you can not delete this message `})
    } else {
      let deleteMsg  =  await collectionName.updateOne({_id : chatId} , {$pull : {msges : {msgId : id}} , $push : {msgDeleteHistory : {$each : msgObject} }})

      if(deleteMsg && deleteMsg.matchedCount === 1){
        res.status(200).send({status : 200 , message : "message deleted successfully "})
      }
    }
  } catch(err){
    console.log("error in deleteMsg api" , err)
    res.status(500).send({status:500 , message : err.message })
  }
}

