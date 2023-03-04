const express = require("express")
const frndReq = require("../model/frndReq")
const uuid = require("uuid")

exports.sendFrndReq = async(req , res) =>{
    try{
        let {id} = req.params
        let {frndId} = req.body
        let timeStamp = new Date()
    
        let createFrndReq = await frndReq.create({
            _id : uuid.v4(), 
            to : frndId , 
            from : id , 
            status :"pending" 
        })
    
        if(createFrndReq){
            res.status(200).send({status : 200 , message : "frnd req send succesfully"})
        }else {
            res.status(400).send({status : 400 , message : "something went wrong"})
        }
    }catch(err){
        console.log("error in sendFrndReq api " , err)
        res.status(500).send({status : 500 , message : "something went wrong "})
    }
}

exports.fetchAllUser = async ( req , res ) => {
    console.log("fetchAllUser")
}

exports.fetchFrndsforUser = async (req , res) => {
    console.log("fetchFrndReq")
}