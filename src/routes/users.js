const express = require('express');

const {
    addUser,
    getUser,
    deleteUser
} = require("../controllers/users");

const router = express.Router();

router.get('/', getUser);
router.post('/', addUser);
router.delete('/', deleteUser);

module.exports = router;