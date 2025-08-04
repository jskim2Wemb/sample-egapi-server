const express = require('express');
const router = express.Router();
const { generateRandomData, generateCategories } = require('../utils/dataGenerator');

router.get('/', (req, res) => {
  const { months = 12 } = req.query;
  
  const categories = generateCategories('months', parseInt(months));
  
  res.json({
    categories,
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        data: generateRandomData(parseInt(months), 1000, 5000)
      },
      {
        name: 'Profit',
        type: 'bar',
        data: generateRandomData(parseInt(months), 200, 1000)
      },
      {
        name: 'Growth Rate',
        type: 'line',
        yAxisIndex: 1,
        data: generateRandomData(parseInt(months), -10, 30)
      }
    ],
    metadata: {
      generated: new Date().toISOString(),
      months: parseInt(months)
    }
  });
});

module.exports = router; 