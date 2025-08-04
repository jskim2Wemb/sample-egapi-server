const express = require('express');
const router = express.Router();
const { generateRandomData } = require('../utils/dataGenerator');

router.get('/', (req, res) => {
  const { categories = 'Jan,Feb,Mar,Apr,May,Jun', series = 2 } = req.query;
  
  const categoryArray = categories.split(',');
  const seriesData = [];
  
  // Generate series data
  for (let i = 0; i < parseInt(series); i++) {
    seriesData.push({
      name: `Product ${String.fromCharCode(65 + i)}`,
      data: generateRandomData(categoryArray.length, 50, 300)
    });
  }
  
  res.json({
    categories: categoryArray,
    series: seriesData,
    metadata: {
      generated: new Date().toISOString(),
      categoryCount: categoryArray.length,
      seriesCount: parseInt(series)
    }
  });
});

module.exports = router; 