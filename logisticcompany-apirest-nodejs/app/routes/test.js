const express = require('express');
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/test');

router.get(      '/', getItems);
router.get(   '/:id', getItem)
router.get('/:Rfrnc', getItem);

router.post('/', createItem);

router.patch(   '/:id', updateItem);
router.patch('/:Rfrnc', updateItem);

router.delete(   '/:id', deleteItem);
router.delete('/:Rfrnc', deleteItem);

module.exports = router;