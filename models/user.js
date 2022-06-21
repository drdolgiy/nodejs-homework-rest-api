const { Schema, model } = require("mongoose")
const Joi = require('joi')

const schema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}, {timestamps: true})

const schemaRegister = Joi.object({
  password: Joi.string().
    alphanum().
    min(8).
    required(),
  email: Joi.string().
    email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  subscription: Joi.string(),
})

const schemaLogin = Joi.object({
  password: Joi.string().
    alphanum().
    min(8).
    required(),
  email: Joi.string().
    email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

const User = model('user', schema)

module.exports = {
    User, schemaRegister, schemaLogin
}