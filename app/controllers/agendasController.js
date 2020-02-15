const Agenda = require('../../app/models/agenda')
const Note = require('../../app/models/note')

module.exports.list = (req, res) => {
    const otp = req.query.otp
    if(otp) {
        Agenda.findOne({'otp': otp})
            .then(agenda => {
                if(agenda) {
                    agenda.validateOtp(otp)
                        .then(response => {
                            res.json(response)
                        })
                } else {
                    res.json({notice: "No such otp"})
                }
            })  
            .catch(err => {
                res.json(err)
            })
    } else {
        if (req.admin){
            Agenda.find()
            .then(agendas => {
                res.json(agendas)
            })
            .catch(err => {
                res.json(err)
            })
        } else {
            res.sendStatus('401')
        }
    }

}

module.exports.listNotes = (req,res) => {
    const id = req.params.id
    if (req.admin) {
        Note.find({'agenda': id}).populate('tags', ['_id', 'name']).populate('agenda', ['_id', 'batch']).sort({createdAt: -1})
            .then(notes => {
                res.json(notes)
            })
            .catch(err => {
                res.json(err)
            })
    } else {
    // validations
        Agenda.findById(id)
            .then(agenda => {
                const date = Date.now()
                // always available
                if (agenda.isAvailable) {
                    Note.find({'agenda': id}).populate('tags', ['_id', 'name']).populate('agenda', ['_id', 'batch']).sort({createdAt: -1})
                        .then(notes => {
                            res.json(notes)
                        })
                        .catch(err => {
                            res.json(err)
                        })
                // not marked available, then check further
                } else if(date < agenda.viewMinRange || date > agenda.viewMaxRange || !agenda.viewMaxRange || !agenda.viewMinRange) {
                    res.json({notice: "notes for this agenda are not available"})
                // all good
                } else {
                    Note.find({'agenda': id}).populate('tags', ['_id', 'name']).populate('agenda', ['_id', 'batch']).sort({createdAt: -1})
                        .then(notes => {
                            res.json(notes)
                        })
                        .catch(err => {
                            res.json(err)
                        })
                }
            })
            .catch(err => {
                res.json(err)
            })
    }
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Agenda.findById(id)
        .then(agenda => {
            if(agenda) {
                res.json(agenda)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })

}

module.exports.create = (req,res) => {
    const body = req.body
    const agenda = new Agenda(body)
    agenda.save()
        .then(agenda => {
            res.json(agenda)
        })
        .catch(err => {
            res.json(err)
        })
    
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const body = req.body
    Agenda.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(agenda => {
            if(agenda) {
                res.json(agenda)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    Agenda.findById(id)
        .then(agenda => {
            agenda.remove()
                .then(agenda => {
                    res.json(agenda)
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            res.json(err)
        })
}