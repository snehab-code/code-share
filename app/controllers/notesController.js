const Note = require('../../app/models/note');
const Tag = require('../../app/models/tag');
// const webpush = require('web-push')
// const Subscriber = require('../models/subscriber')

module.exports.list = (req, res) => {
	Note.find()
		.populate('tags', [ '_id', 'name' ])
		.populate('agenda', [ '_id', 'batch' ])
		.sort({ createdAt: -1 })
		.then((notes) => {
			res.json(notes);
		})
		.catch((err) => {
			res.json(err);
		});
	// }
};

module.exports.show = (req, res) => {
	const id = req.params.id;
	Note.findById(id)
		.populate('tags', [ '_id', 'name' ])
		.populate('agenda', [ '_id', 'batch' ])
		.then((note) => {
			if (note) {
				res.json(note);
			} else {
				res.json({});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};

module.exports.create = (req, res) => {
	const body = req.body;
	const note = new Note(body);
	note.save()
		.then((note) => {
			const noteMessage = { ...note._doc };
			let newTags = [];
			let count = 0;
			noteMessage.tags.forEach((tagId) => {
				Tag.findOne({ _id: tagId }).then((tag) => {
					const tagObject = {
						_id: tag._id,
						name: tag.name
					};
					newTags.push(tagObject);
					count++;
					if (count == noteMessage.tags.length) {
						noteMessage.tags = newTags;
						const io = require('../../config/socket');
						io.sockets.in(`${note.agenda}`).emit('added', noteMessage);
					}
				});
			});
			if (noteMessage.tags.length == 0) {
				const io = require('../../config/socket');
				io.sockets.in(`${note.agenda}`).emit('added', noteMessage);
			}
			res.json(note);
		})
		.catch((err) => {
			res.json(err);
		});
};

module.exports.update = (req, res) => {
	const id = req.params.id;
	const body = req.body;
	Note.findByIdAndUpdate(id, body, { new: true, runValidators: true }).populate('tags', [ '_id', 'name' ]).populate('agenda', [ '_id', 'batch' ])
		.then((note) => {
			if (note) {
				const io = require('../../config/socket')
				io.sockets.in(`${note.agenda._id}`).emit('edited', note)
				res.json(note)
			} else {
				res.json({});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};

module.exports.destroy = (req, res) => {
	const id = req.params.id;
	Note.findByIdAndDelete(id)
		.then((note) => {
			if (note) {
				const io = require('../../config/socket');
				io.sockets.in(`${note.agenda}`).emit('deleted', note._id);
				res.json(note);
			} else {
				res.json({});
			}
		})
		.catch((err) => {
			res.json(err);
		});
};
