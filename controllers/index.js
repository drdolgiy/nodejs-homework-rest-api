const {getAll, getContactById, addContact, removeContact,  updateContact, updateStatusContact} = require('./contacts')
const { register, login, logout, currentUser } = require('./auth')

module.exports = {
    getAll, getContactById, addContact, removeContact,  updateContact, updateStatusContact, register, login, logout, currentUser
}