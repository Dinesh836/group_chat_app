const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const FrndReqSchema = new Schema({
    _id : String ,  
    to : String , 
    from:String , 
    status : String , 
    response : {type : Boolean , default : false } , 
    resAt : Date

}, {versionKey:false, timestamps:true})

module.exports = mongoose.model('Frndreq',FrndReqSchema,'Frndreq');
