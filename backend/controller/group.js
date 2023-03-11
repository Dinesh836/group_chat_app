const Group =  require('../model/Group')
const utility = require("../util/utility")
const UUID = require("uuid")

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
             deleteGroup = await Group.deleteOne({_id : id}).lean()
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

exports.fetchMembersOfGroup = async ( req , res ) => {
    try {
        let { id } = req.params

        let grpMembers = await Group.aggregate([
            {
                $match :{_id : id}
            } , 
            {
                $unwind : "$members"
            } ,
            {
                $lookup :{
                    from :"User" , 
                    foreignField :"_id" ,
                    localField : "members" ,
                    as :"userData"
                }
            } , 
            {
                $unwind : "$userData"
            } , 
            {
                $project :{
                    _id :0 ,
                    memberId : "$userData._id" , 
                    name : "$userData.name",
                    lastLogin :"$userData.lastLoggedinTime"
                    //profilePhotoUrl : "$userData.profileUrl"
                }
            }
        ])

        if(grpMembers && grpMembers.length) {
            res.status(200).send({status : 200 , data :grpMembers })
        }

    } catch(err) {
        console.log("Error in fetchMembersOfGroup api" , err)
        res.status(500).send({status : 500 , message : err.message})
    }



}

exports.addAdmin = async (req , res) => {
    try {
        let { id } = req.params
        let { admin } =  req.body
        let addAdmin = await Group.updateOne({ _id :id } , {$push :{admin : {$each : admin}}})

        if(addAdmin && addAdmin.matchedCount === 1){
            res.status(200).send({status : 200 , message :"admin added successfully"})
        }
    } catch (err){
        console.log("error in make Admin" , err)
        res.status(500).send({status : 500 , message : err.message})
    }
}

exports.removeMembers = async (req , res) => {
    try {
        let { id } = req.params
        let { admin , members } =  req.body

        let checkAdmin = await Group.findOne({_id : id , admin : {$in :admin }}).lean()

        if(!checkAdmin){
            res.status(400).send({status : 400 , message : `user is not admin of this group`})
        }
        if(checkAdmin){
            let updateMembers = await Group.updateOne({_id :id} , { $pull :{members :{$in : members}}})

            if(updateMembers && updateMembers.matchedCount === 1){
                res.status(200).send({status : 200 , message :"members removed successfully"})
            }
        }
    } catch (err){
        console.log("error in removeMembers " , err)
        res.status(500).send({status : 500 , message : err.message})
    }
}

exports.addMembers = async (req , res) => {
    try {
        let { id } = req.params
        let { admin , members } =  req.body

        let checkAdmin = await Group.findOne({_id : id , admin : {$in :admin }}).lean()

        if(!checkAdmin){
            res.status(400).send({status : 400 , message : `user is not admin of this group`})
        }
        if(checkAdmin){
            let updateMembers = await Group.updateOne({_id :id} , { $push :{members :{$each : members}}})

            if(updateMembers && updateMembers.matchedCount === 1){
                res.status(200).send({status : 200 , message :"members added successfully"})
            }
        }
    } catch (err){
        console.log("error in addMembers " , err)
        res.status(500).send({status : 500 , message : err.message})
    }
}

exports.editGroup = async (req , res ) => {
    try{
        let { id } = req.params
        let { userId , description , name  } = req.body

        let checkAdmin = await utility.checkAdmin( id , userId)
        console.log(checkAdmin)

        if(!checkAdmin){
            return res.status(400).send({status : 400 , message :"user is not admin of this group"})
        }
        let updateObj = {}
        if(name) updateObj["name"] = name
        if(description) updateObj["description"] = description

        let updateGroup = await Group.updateOne({_id : id } , updateObj)

        console.log(updateGroup)

        if(updateGroup && updateGroup.matchedCount === 1){
            res.status(200).send({status : 200 , message : "successfully upadte group information "})
        }
    }catch(err){
        console.log("error in aditGroup api" , err)
        res.status(500).send({status : 500 , message : err.message})
    }
}
