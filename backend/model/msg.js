const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
    _id: String,
    sender: String,
    receiver: String,
    msg: Object, // {type :  "text/image/doc"  , body :   } 
    source: String,

}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Msg', MsgSchema, 'Msg');
