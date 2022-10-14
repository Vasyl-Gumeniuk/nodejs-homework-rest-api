const express = require('express');
const router = express.Router();

const ctrl = require("../../controllers/auth");
const {validateBody} = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));


module.exports = router;