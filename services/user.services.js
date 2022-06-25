const { User } = require("../models/user")

const updateUser = async (id, data) => {
return User.findByIdAndUpdate(id, data)
}

module.exports = {
    updateUser
}