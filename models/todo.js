const { Mongoose } = require("mongoose");
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: String,
    description: String

}, {
    timestamps: true
})
const todo = mongoose.model('todo', todoSchema)

module.exports = {
    todo
}