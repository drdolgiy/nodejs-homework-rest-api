const { contacts } = require('../services')

const getAll = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts)
  } catch (error) {
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params
    const data = await contacts.getContactById(id)
    data ? res.json( data ) : res.status(404).json({ message: 'Not found!' })
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body)
    res.json(newContact)
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contacts.removeContact(id)
    contact ? res.status(200).json( { message: 'Contact deleted' } ) : res.status(404).json({ message: 'Not found!' })   
  } catch (error) {
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params
    const updateContactById = await contacts.updateContact(id, req.body)
    updateContactById ? res.status(200).json(updateContactById) : res.status(404).json({ message: 'Not found!' })
  } catch (error) {
    next(error)
  }
}

const updateStatusContact = async (req, res, next) => {
  try { 
    const { id } = req.params
    const updateContactById = await contacts.updateContact(id, req.body)
    updateContactById ? res.status(200).json(updateContactById) : res.status(404).json({ message: 'Not found!' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
getAll, getContactById, addContact, removeContact,  updateContact, updateStatusContact
}