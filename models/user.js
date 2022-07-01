const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const schema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: function () {
        return v4();
      },
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
  },
  { timestamps: true }
);

const schemaRegister = Joi.object({
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  password: Joi.string().alphanum().min(8).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

const User = model("user", schema);

module.exports = {
  User,
  schemaRegister,
  schemaLogin,
};
