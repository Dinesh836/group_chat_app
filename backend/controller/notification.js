const express = require("express")
const frndReq = require("../model/frndReq")
const User = require("../model/User")
const Frnds = require("../model/frnds")
const uuid = require("uuid")

exports.fetchNotification = async (req , res) => {
    try{
        let {id} = req.params

        let fetchReq = await frndReq.aggregate([
            {
                $match : {to : id , status : "pending"}
            } ,
            {
                $lookup :{
                    from : "User" , 
                    foreignField : "_id" , 
                    localField : "from" , 
                    as : "userdetail"
                }
            } ,
            {
                $project : {
                    from : { $arrayElemAt: [ "$userdetail.name", 0 ] }
                }
            } 
        ])

        if(fetchReq){
            res.status(200).send({status : 200 , data : fetchReq})
        }

    }catch(err){
        console.log("err in fetchNotification api " , err)
        res.status(500).send({status : 500 , message : "something went wrong"})
    }    
}

exports.replyToFrndReqNotification = async (req , res) => {
    try {
        let { id } = req.params
        let { status } = req.body     
        let resAt = new Date()

        let {to , from } = await frndReq.findOneAndUpdate({_id : id} , {$set : {status , resAt , response : true}} , {new : true})
        if(to && from ){
            if(status === "accepted"){
                await User.findOneAndUpdate({_id : to } , {$addToSet :{frnds : from }} , {new : true})
                await User.findOneAndUpdate({_id : from } , {$addToSet :{frnds : to }} , {new : true})

                // create chatId 
                const chatId = await createChatId(to , from )
                if(chatId){
                   return res.status(200).send({status : 200 , message : "succefully updated with status  " + status})
                }
            }
            res.status(200).send({status : 200 , message : "succefully updated with status " + status})
        }
        else {
           res.status(500).send({status : 500 , message : "can not send responce now"})
        }    
    }catch(err){
        console.log("error in replyToFrndReqNotification " , err)
        res.status(500).send({status : 500 , message : "something went wrong"})
    }
    
}

const createChatId = async (to , from ) =>{
    try{
        let membersArray = [ to , from ] 
        const chatThread = await Frnds.create({
            _id : uuid.v4() , 
            members : membersArray
        })
        return chatThread._id
    } catch(err){
        console.log("error in creating chat id" , err.message)
    }
}

