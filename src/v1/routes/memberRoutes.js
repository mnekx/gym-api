const express = require('express');
const memberController = require('../../controllers/memberController');

const router = express.Router();

router.get('/', memberController.getAllMembers);
router.get('/:memberID', memberController.getOneMember);
router.delete('/:memberID', memberController.deleteOneMember);
router.post('/', memberController.createNewMember);
router.put('/:memberID', memberController.updateOneMember);

module.exports = router;
