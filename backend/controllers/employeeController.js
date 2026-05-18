const Employee = require('../models/Employee');

// @desc    Add new employee
// @route   POST /api/employees
// @access  Public (will be protected later)
const addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;

        // Basic validation
        if (!name || !email || !department || !skills || performanceScore === undefined || experience === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if employee exists
        const employeeExists = await Employee.findOne({ email });
        if (employeeExists) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const employee = await Employee.create({
            name,
            email,
            department,
            skills,
            performanceScore,
            experience
        });

        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public (will be protected later)
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search employee by department
// @route   GET /api/employees/search
// @access  Public (will be protected later)
const searchEmployees = async (req, res) => {
    try {
        const { department } = req.query;

        if (!department) {
            return res.status(400).json({ message: 'Please provide a department query parameter' });
        }

        // Case-insensitive search using regex
        const employees = await Employee.find({
            department: { $regex: new RegExp(department, 'i') }
        });

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Protected
const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.deleteOne();
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update employee performance score
// @route   PUT /api/employees/:id/score
// @access  Protected
const updateEmployeeScore = async (req, res) => {
    try {
        const { performanceScore } = req.body;
        const employee = await Employee.findById(req.params.id);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (performanceScore === undefined || performanceScore < 0 || performanceScore > 100) {
            return res.status(400).json({ message: 'Provide a valid performance score between 0 and 100' });
        }

        employee.performanceScore = performanceScore;
        const updatedEmployee = await employee.save();
        
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    searchEmployees,
    deleteEmployee,
    updateEmployeeScore
};
