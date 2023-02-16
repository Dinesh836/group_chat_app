const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    _id : String , 
    name : String , 
    email:String , 
    mobile :String , 
    password :String ,
    frnds : Array , 
    lastLoggedinTime : Date

}, {versionKey:false, timestamps:true})

module.exports = mongoose.model('User',UserSchema,'User');
