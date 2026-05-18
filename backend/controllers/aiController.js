const { generateRecommendations } = require('../services/aiService');

// @desc    Generate AI recommendations for an employee
// @route   POST /api/ai/recommend
// @access  Private
const getAiRecommendation = async (req, res) => {
    try {
        const { employeeData } = req.body;

        if (!employeeData || !employeeData.name || !employeeData.skills || employeeData.performanceScore === undefined) {
            return res.status(400).json({ message: 'Please provide valid employeeData object' });
        }

        const recommendation = await generateRecommendations(employeeData);
        res.status(200).json(recommendation);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAiRecommendation
};
