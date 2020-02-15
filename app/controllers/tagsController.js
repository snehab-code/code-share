const Tag = require('../models/tag')

module.exports.list = (req, res) => {
    Tag.find()
        .then(tags => {
            res.json(tags)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Tag.findById(id)
        .then(tag => {
            if(tag) {
                res.json(tag)
            } else {
                res.json({})
            }
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    if (Array.isArray(req.body)) {
        Tag.insertMany(body)
        .then(tags => {
            res.json(tags)
        })
        .catch(err => {
            res.json(err)
        })
    } else {
        const tag = new Tag(body)
        tag.save()
            .then(tag => {
                res.json(tag)
            })
            .catch(err => {
                res.json(err)
            })
    }
}


module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Tag.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(tag => {
            if (tag) {
                res.json(tag)
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
    Tag.findByIdAndDelete(id)
        .then(tag => {
            if(tag) {
                res.json(tag)
            } else {
                res.json({})
            }
        })
        .catch(err => {
            res.json(err)
        })
}