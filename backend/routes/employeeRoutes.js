const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, searchEmployees } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Search route must be above /:id if we had one, but good practice
router.get('/search', protect, searchEmployees);

router.route('/')
    .get(protect, getEmployees)
    .post(protect, addEmployee);

module.exports = router;
