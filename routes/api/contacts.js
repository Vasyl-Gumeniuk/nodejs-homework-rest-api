const express = require('express');
const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const { contactControllers } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/contact");


router.get('/', authenticate, ctrlWrapper(contactControllers.getAll));
router.get('/:contactId', authenticate, ctrlWrapper(contactControllers.getById));
router.post('/', authenticate, validateBody(schemas.contactAddSchema), ctrlWrapper(contactControllers.add));
router.delete('/:contactId', authenticate, ctrlWrapper(contactControllers.deleteById));
router.put('/:contactId', authenticate, validateBody(schemas.contactAddSchema), ctrlWrapper(contactControllers.updateById));
router.patch('/:contactId/favorite', authenticate, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(contactControllers.updateFavorite));

module.exports = router;
