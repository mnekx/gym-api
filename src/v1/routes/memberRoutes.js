const express = require('express');
const memberController = require('../../controllers/memberController');

const router = express.Router();

router.get('/', memberController.getAllMembers);
router.put('/:memberID', memberController.updateOneMember);

module.exports = router;
