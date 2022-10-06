const { Router } = require('express');
const { check } = require('express-validator');

const { isValidCollection, validFormDataFile, validateFields } = require('../middlewares');
const {updateImageCloudinary, showImage} = require('../controllers/upload');

const router = Router();

router.put("/:collection/:id",[
    validFormDataFile,
    check("id","No es mongo ID").isMongoId(),
    check("collection").custom(isValidCollection),
    validateFields
],updateImageCloudinary);

router.get("/:collection/:id",[
    check("id","No es mongo ID").isMongoId(),
    check("collection").custom(isValidCollection),
    validateFields
], showImage);

module.exports = router
