const validateJWT = require('./validate_jwt');
const validateFields = require('./validate_fields');
const dbValidators = require('./db_validators');
const cache = require('./cache');

module.exports = {
    ...validateJWT,
    ...validateFields,
    ...dbValidators,
    ...cache
}