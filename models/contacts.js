const fs = require('fs/promises');
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
   const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const data = contact.find(contact => contact.id === contactId);
  return data;
}
const removeContact = async (contactId) => {
     const newContacts = await listContacts();
    const index = newContacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null
    };
    const [removeContact] = newContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return removeContact;
}

const addContact = async (name, email, phone) => {
  const newContact = {
        id: v4(),
        name: name,
        email: email,
        phone: phone
    };
    const allContacts = await listContacts();
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));      
}

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
    if (index !== -1) {
      allContacts[index].name = name;
      allContacts[index].email = email;
      allContacts[index].phone = phone;

      await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
      return allContacts[index]
    } else {
      return null
    };  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
