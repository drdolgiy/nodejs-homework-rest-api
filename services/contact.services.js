
const {Contact} = require('../models/contacts')

const listContacts = async () => {
    return Contact.find();
}

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
} 

const removeContact = async (contactId) => {
return Contact.findByIdAndDelete(contactId)
}

const addContact = async (body, id) => {
    return Contact.create({...body, owner: id});      
}

const updateContact = async (contactId, body) => {
return Contact.findByIdAndUpdate(contactId, body, {new: true})
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}