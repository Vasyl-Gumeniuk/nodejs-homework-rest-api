const express = require('express');
const router = express.Router();

const { validateBody, authenticate, upload, resizeImage } = require("../../middlewares");

const { authControllers } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(authControllers.register));
// email verification
router.get('/verify/:verificationToken', ctrlWrapper(authControllers.verify));
// check verification
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(authControllers.resendEmail));

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(authControllers.login));

router.get('/current', authenticate, ctrlWrapper(authControllers.getCurrent));
router.get('/logout', authenticate, ctrlWrapper(authControllers.logout));

router.patch('/avatars', authenticate, upload.single('avatar'), resizeImage, ctrlWrapper(authControllers.updateAvatar));


module.exports = router;