const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const { contactAddSchema } = require("../../schemas/contact");

const updateById = async (req, res) => {
    const { error } = contactAddSchema.validate(req.body)
        if (error) {
            throw RequestError({ status: 400, message: 'missing fields' })
        }
        const { contactId } = req.params
        const result = await contacts.updateContact(contactId, req.body)
            if (!result) throw RequestError({ status: 404 })
        res.json(result)
};

module.exports = updateById;