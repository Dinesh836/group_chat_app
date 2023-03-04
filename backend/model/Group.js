const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GroupSchema = new Schema({
    _id : String , 
    name : String , 
    admin: Array , 
    members : Array , 

}, {versionKey:false, timestamps:true})

module.exports = mongoose.model('Group',GroupSchema,'Group');
