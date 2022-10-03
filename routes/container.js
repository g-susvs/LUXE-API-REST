const {Router} = require('express');
const { check } = require('express-validator');
const { 
    getContainers, 
    getContainer, 
    createContainer, 
    updateContainer, 
    deleteContainer 
} = require('../controllers/container');
const { existeContainerPorId } = require('../helpers/db_validator');
const { validateFields, validateJWT } = require('../middlewares');
const { cacheInit } = require('../middlewares/cache');

const router = Router();

router.get('/', cacheInit, getContainers);

router.get('/:id', [
    cacheInit,
    check('id','No es un id valido de mongo').isMongoId(),
    validateFields
],getContainer);

router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('type_container', 'El tipo de contenedor es obligatorio').not().isEmpty(),
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

module.exports = router
