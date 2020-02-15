const mongoose = require('mongoose')
const Agenda = require('./agenda')
const Note = require('./note')
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

batchSchema.pre('remove', function(next) {
    const batch = this
    Agenda.find({batch: batch._id})
        .then(agendas => {
            if(Object.keys(agendas).length > 0) {
                agendas.forEach(agendaObj=> {
                    Note.remove({agenda: agendaObj._id})
                        .then(note => {
                            console.log(note)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
            }
            return agendas
        })
        .then(agendas=> {
            Agenda.remove({batch:batch._id})
                .then(() => {
                    next()
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })

})

const Batch = mongoose.model('Batch', batchSchema)

module.exports = Batch