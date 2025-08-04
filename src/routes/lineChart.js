const express = require('express');
const router = express.Router();
const { generateRandomData, generateCategories } = require('../utils/dataGenerator');

router.get('/', (req, res) => {
  const { days = 30, series = 2 } = req.query;
  
  const categories = generateCategories('days', parseInt(days));
  const seriesData = [];
  
  // Generate series data
  for (let i = 0; i < parseInt(series); i++) {
    seriesData.push({
      name: `Series ${i + 1}`,
      data: generateRandomData(parseInt(days), 100, 500)
    });
  }
  
  res.json({
    categories,
    series: seriesData,
    metadata: {
      generated: new Date().toISOString(),
      days: parseInt(days),
      seriesCount: parseInt(series)
    }
  });
});

module.exports = router; 