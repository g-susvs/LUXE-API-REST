const {Router} = require('express');
const { 
    getContainers, 
    getContainer, 
    createContainer, 
    updateContainer, 
    deleteContainer 
} = require('../controllers/container');

const router = Router();

router.get('/', getContainers);
router.get('/:id', getContainer);
router.post('/', createContainer);
router.put('/:id', updateContainer);
router.delete('/:id', deleteContainer);

module.exports = router
