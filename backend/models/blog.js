const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model("Blog",BlogSchema)