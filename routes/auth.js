const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares');

const router = Router();

router.post('/',[
    check('email','El email es obligatorio').notEmpty(),
    check('email','El email es no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validateFields
],login);

module.exports = router