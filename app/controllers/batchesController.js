const Batch = require('../../app/models/batch')
const Agenda = require('../../app/models/agenda')

module.exports.list = (req,res) => {
    Batch.find()
        .then(batches => {
            res.json(batches)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.listAgendas = (req, res) => {
    const id = req.params.id
    Agenda.find({'batch':id})
        .then(agendas => {
            if (agendas) {
                res.json(agendas)
            } else {
                res.json({notice: "No matching agendas or no such batch"})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Batch.findById(id)
        .then(batch => {
            res.json(batch)
        })
        .catch(err => {
            res.json(err)
        })
}
module.exports.create = (req,res) => {
    const body = req.body
    const batch = new Batch(body)
    batch.save()
        .then(batch => {
            res.json(batch)
        })
        .catch(err => {
            res.json(err)
        })
}
module.exports.update = (req,res) => {
    const body = req.body
    const id = req.params.id
    Batch.findByIdAndUpdate(id,body,{new: true, runValidators: true})
        .then(batch => {
            res.json(batch)
        })
        .catch(err => {
            res.json(err)
        })
}
module.exports.destroy = (req,res) => {
    const id = req.params.id
    Batch.findById(id)
        .then(batch => {
            batch.remove()
                .then(batch => {
                    res.json(batch)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            res.json(err)
        })
}