const express = require("express")
const frndReq = require("../model/frndReq")
const User = require("../model/User")

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
                await User.findOneAndUpdate({_id : to } , {$push :{frnds : from }} , {new : true})
                await User.findOneAndUpdate({_id : from } , {$push :{frnds : to }} , {new : true})
            }
            res.status(200).send({status : 200 , message : "succefully updated "})
        }else {
            res.status(500).send({status : 500 , message : "can not send responce now"})
        }    
    }catch(err){
        console.log("error in replyToFrndReqNotification " , err)
        res.status(500).send({status : 500 , message : "something went wrong"})
    }
    
}

