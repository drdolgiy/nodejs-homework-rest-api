const { Schema, model } = require("mongoose")
const Joi = require('joi')

const schema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    }
})

const schemaCreate = Joi.object({
  name: Joi.string().
    alphanum().
    min(2).
    max(40).
    required(),
  email: Joi.string().
    email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().
    min(10).required(),
  favorite: Joi.bool()
})

const schemaPatch = Joi.object({
  favorite: Joi.bool().required()
})

const Contact = model('contact', schema)

module.exports = {
    Contact, schemaCreate, schemaPatch
}