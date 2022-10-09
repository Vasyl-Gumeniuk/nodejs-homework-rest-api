const contacts = require('../../models/contacts');
const { RequestError } = require('../../helpers');



const getById = async (req, res) => {
    const { contactId } = req.params
    const result = await contacts.getContactById(contactId)
        if (!result) throw RequestError({ status: 404 })
        return res.json(result)
};

module.exports = getById;