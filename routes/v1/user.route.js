const express = require('express');

const router = express.Router()

router.route('/user').get((req, res) => {
    res.send("Hello")
})

module.exports = router