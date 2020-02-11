const Note = require('../../app/models/note')
const {io, webSocket} = require('../../config/socket')
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
    // console.log(io)
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
    console.log('create note')
    const body = req.body
    const note = new Note(body)
    
    note.save()
        .then(note => {
            // console.log(note.title)
            // Subscriber.find()
            // .then(subscribers=>{
            //     const payload = JSON.stringify({
            //         title: 'New note added!',
            //         body: note.title
            //       })
            //     subscribers.forEach(subscriber=>
            //         {
            //               webpush.sendNotification(subscriber, payload)
            //                 .then(result => console.log('NOTIFI',result))
            //                 .catch(e => console.log(e.stack)) 
            //         }
            //     )
            // })
            // .catch(err=>console.log('Subscriber',err))
            // const io = require('../../socket')
            const agendaSpace = io.of(`/agendas/${note.agenda}`)
            agendaSpace.emit('message', note)
            
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
