const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    agenda: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Agenda'
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note