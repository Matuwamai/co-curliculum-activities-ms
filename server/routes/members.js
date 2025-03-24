const express = require('express');
const {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require('../controllers/members.js');

const router = express.Router();

router.post('/', createMember);
router.get('/', getAllMembers);
router.get('/:id', getMemberById);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

module.exports = router;
