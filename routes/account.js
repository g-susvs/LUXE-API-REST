const { Router } = require('express');
const { check, header } = require('express-validator');
const { accountStatus, createAccount } = require('../controllers/account');
const { validateFields, isPlanValid } = require('../middlewares');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = Router();

router.get('/',[
    validateJWT,
    validateFields
], accountStatus);

router.post('/', [
    validateJWT,
    check("registration_date","El valor no es valido").isNumeric(),
    check("plan", "El plan es requerido").notEmpty(),
    check("plan").custom(isPlanValid),
    check("rental_price","El valor es incorrecto").isNumeric(),
    validateFields
], createAccount);



module.exports = router