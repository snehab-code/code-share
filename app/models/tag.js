const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    taggedIn: {
        type: [Schema.Types.ObjectId]
    }
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag