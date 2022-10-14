const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require('joi');

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
//   token: String
}, { versionKey: false, timestamps: true });


userSchema.post("save", handleSaveErrors);


const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});


const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};