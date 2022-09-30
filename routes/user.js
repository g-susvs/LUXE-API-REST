const {Router} = require('express');
const {check, param} = require('express-validator');
const { 
    getUsers, 
    getUser, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/user');

const { 
    validateFields, 
    validateJWT, 
    emailExists, 
    customValidPassword,
    isAdminRole,
    isPhoneValid,
    isDNIValid,
    isRUCValid
} = require('../middlewares');
const { cacheInit } = require('../middlewares/cache');

const router = Router();

router.get('/', cacheInit ,getUsers);

router.get('/:id', [
    cacheInit,
    check('id','El id debe ser una id de mongo').isMongoId(),
    validateFields
],getUser);

router.post('/', [
    check('name','El nombre es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('email','El email no es valido').isEmail(),
    check('email').custom(emailExists),
    check('password','La contraseña es obligatoria').notEmpty(),
    check('password','La contraseña debe tener minimo 6 caracteres').isLength({min:6}),
    validateFields
],createUser);

router.put('/:id', [
    check('id','El id debe ser una id de mongo').isMongoId(),
    check('password').custom(customValidPassword),
    check('phone').custom(isPhoneValid),
    check('DNI').custom(isDNIValid),
    check('RUC').custom(isRUCValid),
    validateFields
],updateUser);

router.delete('/:id', [
    validateJWT,
    param('id','El id debe ser una id de mongo').isMongoId(),
    isAdminRole,
    validateFields
],deleteUser);

module.exports = router