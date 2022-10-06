const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const { contactAddSchema } = require("../../schemas/contact");


const add = async (req, res) => {
        const { error } = contactAddSchema.validate(req.body)
        if (error) {
            throw RequestError({ status: 400, message: 'missing required name field' })
        }
        const result = await contacts.addContact(req.body)
        res.status(201).json(result)
};

module.exports = add;