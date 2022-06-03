const express = require('express')
const contacts = require('../../models/contacts')
const router = express.Router()
const Joi = require("joi")

const schema = Joi.object({
  name: Joi.string().
    alphanum().
    min(2).
    max(40).
    required(),
  email: Joi.string().
    email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().
    min(10).required()
})

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await contacts.getContactById(id)
    data ? res.json( data ) : res.status(404).json({ message: 'Not found!' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  
  try {
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).json({message: error})
    }

    const { name, email, phone } = req.body
    const newContact = await contacts.addContact(name, email, phone)
    res.json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contacts.removeContact(id)
    contact ? res.status(200).json( { message: 'Contact deleted' } ) : res.status(404).json({ message: 'Not found!' })   
  } catch (error) {
    next(error)
  }
  })

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = schema.validate(req.body)
    if (error) {
      res.status(400).json({message: error})
    }

    const { name, email, phone } = req.body
    const { id } = req.params
    const updateContactById = await contacts.updateContact(id, name, email, phone)
    updateContactById ? res.status(200).json(updateContactById) : res.status(404).json({ message: 'Not found!' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
