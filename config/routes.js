const express = require('express')
const router = express.Router()
const confirmAccess = require('../app/middlewares/confirmAccess')
const conditionalAccess = require('../app/middlewares/conditionalAccess')

module.exports = router

const batchesController = require('../app/controllers/batchesController')
const agendasController = require('../app/controllers/agendasController')
const notesController = require('../app/controllers/notesController')
const tagsController = require('../app/controllers/tagsController')
const adminController = require('../app/controllers/adminController')

// batches
router.get('api/batches', confirmAccess, batchesController.list)
router.get('api/batches/:id', confirmAccess, batchesController.show)
router.get('api/batches/:id/agendas', confirmAccess, 
batchesController.listAgendas)

// for getting agendas by batch
router.post('api/batches', confirmAccess,batchesController.create)
router.put('api/batches/:id', confirmAccess, batchesController.update)
router.delete('api/batches/:id', confirmAccess,batchesController.destroy)

//agendas
router.get('api/agendas', conditionalAccess,agendasController.list)
router.get('api/agendas/:id/notes', conditionalAccess, agendasController.listNotes)
router.get('api/agendas/:id', confirmAccess,agendasController.show)
router.post('api/agendas', confirmAccess,agendasController.create)
router.put('api/agendas/:id', confirmAccess,agendasController.update)
router.delete('api/agendas/:id', confirmAccess,agendasController.destroy)

// notes
router.get('api/notes', confirmAccess,notesController.list)
router.get('api/notes/:id', confirmAccess,notesController.show)
router.post('api/notes', confirmAccess,notesController.create)
router.put('api/notes/:id', notesController.update)
router.delete('api/notes/:id', confirmAccess,notesController.destroy)

//tags
router.get('api/tags', confirmAccess,tagsController.list)
router.get('api/tags/:id', confirmAccess,tagsController.show)
router.post('api/tags', confirmAccess,tagsController.create)
router.put('api/tags/:id', confirmAccess,tagsController.update)
router.delete('api/tags/:id', confirmAccess, tagsController.destroy)

// tokens
router.post('api/admin/login', adminController.getAccess)
router.post('api/admin/check-login', confirmAccess, adminController.checkAccess)

module.exports = router