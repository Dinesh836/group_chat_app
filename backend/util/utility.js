const User =  require("../model/User")
const Group =  require("../model/Group")
const Frnds =  require("../model/frnds")
const FrndReq =  require("../model/frndReq")



exports.checkAdmin = async ( grpId, userId) => {
    try{
        let checkAdmin = await Group.findOne({_id : grpId , admin : userId })
        if(checkAdmin) return true
        else return false 
    } catch(err){
        console.log("err in checkAdmin function" , err)
    }
}