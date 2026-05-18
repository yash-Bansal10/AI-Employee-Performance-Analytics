const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, searchEmployees, deleteEmployee, updateEmployeeScore } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Search route must be above /:id
router.get('/search', protect, searchEmployees);

router.route('/')
    .get(protect, getEmployees)
    .post(protect, addEmployee);

router.route('/:id')
    .delete(protect, deleteEmployee);

router.put('/:id/score', protect, updateEmployeeScore);

module.exports = router;
