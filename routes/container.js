const {Router} = require('express');
const { check } = require('express-validator');
const { 
    getContainers, 
    getContainer, 
    createContainer, 
    updateContainer, 
    deleteContainer, 
    assignUser,
    getContainersAvaileble
} = require('../controllers/container');
const { existeContainerPorId } = require('../helpers/db_validator');
const { validateFields, validateJWT, containerIsBussy } = require('../middlewares');
const { cacheInit } = require('../middlewares/cache');

const router = Router();

router.get('/', cacheInit, getContainers);

router.get('/available', cacheInit, getContainersAvaileble)

router.get('/:id', [
    cacheInit,
    check('id','No es un id valido de mongo').isMongoId(),
    validateFields
],getContainer);

router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').notEmpty(),
    check('type_container', 'El tipo de contenedor es obligatorio').notEmpty(),
    check('rental','El precio de alquiler es requerido').isNumeric(),
    validateFields
], createContainer);

router.put('/:id',[
    validateJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeContainerPorId),
    check('name','El nombre es obligatorio').not().isEmpty(),
    validateFields
], updateContainer);

router.delete('/:id',[
    validateJWT,
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeContainerPorId),
    validateFields
], deleteContainer);

router.put('/assign/:id',[
    validateJWT,
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(containerIsBussy),
    check('name_by_user', 'El nombre es obligatorio').notEmpty(),
    validateFields
] ,assignUser );
module.exports = router
