const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FrndsSchema = new Schema({
    _id: String,
    members: Array,
    msges: Array
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Frnds', FrndsSchema, 'Frnds');
