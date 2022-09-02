const express = require('express');
const userController = require('../../controller/user.controller')
const router = express.Router()

router.route('/all').get(userController.getAllUsers)
router.route('/random').get(userController.getRandomUser)
router.route('/save').post(userController.saveAUser)
router.route('/update/:id').patch(userController.updateAUser)

module.exports = router