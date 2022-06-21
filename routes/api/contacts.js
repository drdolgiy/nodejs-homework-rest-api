const express = require('express')
const router = express.Router()
const {schemaCreate, schemaPatch} = require('../../models/contacts')
const {validateRequest} = require('../../middlewares/validateRequest')
const {auth} = require('../../middlewares/auth')
const {getAll, getContactById, addContact, removeContact,  updateContact, updateStatusContact} = require('../../controllers/contacts')

router.get('/',auth, getAll)

router.get('/:id', getContactById)

router.post('/', validateRequest(schemaCreate), auth, addContact )

router.delete('/:id', removeContact)

router.put('/:id', updateContact)

router.patch('/:id', 
    validateRequest(schemaPatch)
, updateStatusContact)

module.exports = router