const {Router} = require('express');
const {check, param} = require('express-validator');
const { 
    getItems, 
    getItem, 
    postItems, 
    putItems, 
    deleteItems } = require('../controllers/item');
const { existeContainerPorId, existeItemPorId } = require('../helpers/db_validator');
const { 
    cacheInit,
    validateJWT,
    validateFields,
    isValidContainer
} = require('../middlewares');


const router = Router();

router.get('/', cacheInit, getItems);

router.get('/:id',[
    cacheInit,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeItemPorId),
    validateFields
], 
getItem);

router.post('/', [
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('description','El nombre es obligatorio').not().isEmpty(),
    check('container','No es un id de mongo').isMongoId(),
    // isValidContainer,
    validateFields
],postItems);

router.put('/:id', [
    validateJWT,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeItemPorId),
    validateFields
],
putItems);

router.delete('/:id',[
    validateJWT,
    check('id','No es un Id Valido').isMongoId(),
    check('id').custom(existeItemPorId),
    validateFields
], deleteItems);

module.exports = router