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

const router = Router();

router.get('/', getContainers);

router.get('/:id', [
    check('id','No es un id valido de mongo').isMongoId(),
],getContainer);

router.post('/',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('type_container', 'El tipo de contenedor es obligatorio').not().isEmpty(),
    validateFields
], createContainer);

router.put('/:id',[
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeContainerPorId),
    validateFields
], updateContainer);

router.delete('/:id',[
    validateJWT,
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeContainerPorId),
    validateFields
], deleteContainer);

module.exports = router
