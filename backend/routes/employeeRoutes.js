const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, searchEmployees } = require('../controllers/employeeController');

// Search route must be above /:id if we had one, but good practice
router.get('/search', searchEmployees);

router.route('/')
    .get(getEmployees)
    .post(addEmployee);

module.exports = router;
