const express = require('express');
const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const { authControllers } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(authControllers.register));
// signin
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(authControllers.login));

router.get('/current', authenticate, ctrlWrapper(authControllers.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(authControllers.logout));


module.exports = router;