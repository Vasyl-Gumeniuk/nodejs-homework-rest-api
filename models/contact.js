const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require('joi');

const contactSchema = new Schema({
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
}, { versionKey: false, timestamps: true });


const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().required()
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const schemas = {
  contactAddSchema,
  updateFavoriteSchema,
};


contactSchema.post("save", handleSaveErrors);


const Contact = model("contacts", contactSchema);

module.exports = {
    Contact,
    schemas,
};