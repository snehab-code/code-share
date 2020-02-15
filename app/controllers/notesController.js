const Note = require('../../app/models/note')
// const webpush = require('web-push')
// const Subscriber = require('../models/subscriber')


module.exports.list = (req, res) => {

        Note.find().populate('tags', ['_id', 'name']).populate('agenda', ['_id', 'batch']).sort({createdAt: -1})
        .then((notes) => {
            
            res.json(notes)

        })
        .catch((err) => {
            res.json(err)
        })
    // }
   
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findById(id).populate('tags', ['_id', 'name']).populate('agenda', ['_id', 'batch'])
        .then(note => {
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}


module.exports.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.save()
        .then(note => {
            const io = require('../../config/socket')
            io.sockets.in(`${note.agenda}`).emit('message', note)
            res.json(note)
        })
        .catch(err => {
            res.json(err)
        })
         
}


module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(note => {
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then(note => {
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}
