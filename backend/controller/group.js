const express = require("express")
const Group =  require('../model/Group')
const UUID = require("uuid")
exports.editGroup = async (req , res ) => {

}

exports.createGroup = async (req , res ) => {
    // console.log("createGroup")
    try{
        let { name  , admin , members} = req.body
        if(members){
            members.push(...admin)
        }
        let createGroup = await Group.create({
            _id : UUID.v4(),
            name , 
            admin , 
            members
        })
        if(createGroup){
            res.status(200).send({status : 200 , message :" successfully created group "})
        }else {
            res.status(500).send({status : 500 , message :"error during creating group  "})   
        }
    }catch(err){
        console.log("error in greating group " , err)
        res.status(500).send({status : 500 , message :"internal server error "})
    }

}

exports.deleteGroup = async (req , res ) => {
    try{
        let {id} = req.params
        let deleteGroup
        if (id){
             deleteGroup = await Group.deleteOne({_id : id})
        }
        if(deleteGroup){
            res.status(200).send({status : 200 , message :" successfully deleted group "})
        }else {
            res.status(500).send({status : 500 , message :"error during deleteing group  "})   
        }
    }catch(err){
        console.log("error in deleteing group " , err)
        res.status(500).send({status : 500 , message :"internal server error "})
    }
}

exports.fetchGroupsforUser = async (req , res ) => {
    try{
        let { id } = req.params
        let fetchGroup = await Group.find({
            members : id 
        } , {
            name : 1 , admin : 1 , members : 1
        })
        if(fetchGroup){
            res.status(200).send({status : 200 , data : fetchGroup})
        }else{
            res.status(500).send({status : 500 , message :"error during fetching groups "})   
        }
    }catch(err){
        console.log("error in deleteing group " , err)
        res.status(500).send({status : 500 , message :"internal server error "})
    }

}