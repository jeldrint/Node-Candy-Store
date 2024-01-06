const express = require('express');
const router = express.Router();

const category_controller = require('../controllers/categoryController')
const item_controller = require('../controllers/itemController')


// CANDY ROUTES //
router.get('/', category_controller)


module.exports = router;