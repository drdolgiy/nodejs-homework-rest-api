const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("./contacts");

const {
  register,
  login,
  logout,
  currentUser,
  confirm,
  resend,
} = require("./auth");

module.exports = {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  register,
  login,
  logout,
  currentUser,
  confirm,
  resend,
};
