const salesService = require('../services/salesService');

const getSales = async (req, res) => {
    try {
        const result = await salesService.getSales(req.query);
        res.json(result);
    } catch (error) {
        console.error('Error in getSales:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = {
    getSales,
};
