const mongoose = require('mongoose')
const Note = require('./note')
const Schema = mongoose.Schema

const agendaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    batch: {
        type: Schema.Types.ObjectId,
        required: true
    },
    otp: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6,
        unique: true
    },
    agendaDate: {
        type: Date,
        required: true
    }, 
    viewMinRange: {
        type: Date
    },
    viewMaxRange: {
        type: Date
    },
    isAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

agendaSchema.pre('remove', function(next) {
    const agenda = this
    Note.remove({agenda: agenda._id})
        .then(() => {
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

agendaSchema.methods.validateOtp = function(otp) {
    const agenda = this
    const date = Date.now()
    if (agenda.isAvailable) {
        return Promise.resolve(agenda)
    } else if(!agenda.viewMinRange || !agenda.viewMaxRange) {
        return Promise.resolve({notice: 'Agenda not made available'})
    } else if(date > agenda.viewMinRange && date < agenda.viewMaxRange) {
        return Promise.resolve(agenda)
    } else {
        return Promise.resolve({notice: 'OTP has expired'})
    }
}



const Agenda = mongoose.model('Agenda', agendaSchema)

module.exports = Agenda