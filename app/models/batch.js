const mongoose = require('mongoose')
const Schema = mongoose.Schema

const batchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isOngoing: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Batch = mongoose.model('Batch', batchSchema)

module.exports = Batch