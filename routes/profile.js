const { Router } = require('express');
const { userProfile } = require('../controllers/profile');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.get('/', [
    validateJWT,
    validateFields
],userProfile)

module.exports = router;