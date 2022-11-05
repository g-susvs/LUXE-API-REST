const { Router } = require('express');
const { check } = require('express-validator');
const { accountStatus, createAccount } = require('../controllers/account');
const { validateFields } = require('../middlewares');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/',[
    // validateJWT,
    validateFields
], accountStatus);

router.post('/:id', [
    check("registration_date","El valor no es valido").isString(),
    validateFields
], createAccount);



module.exports = router