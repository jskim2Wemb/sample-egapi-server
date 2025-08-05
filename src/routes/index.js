const express = require('express');
const router = express.Router();

const lineChartRoutes = require('./lineChart');
const barChartRoutes = require('./barChart');
const combinedChartRoutes = require('./combinedChart');
const pieChartRoutes = require('./pieChart');
const realtimeRoutes = require('./realtime');
const tabulatorTableRoutes = require('./tabulatorTable');

// Mount route handlers
router.use('/line-chart', lineChartRoutes);
router.use('/bar-chart', barChartRoutes);
router.use('/combined-chart', combinedChartRoutes);
router.use('/pie-chart', pieChartRoutes);
router.use('/realtime', realtimeRoutes);
router.use('/tabulator-table', tabulatorTableRoutes);

// Custom chart endpoint
router.post('/custom-chart', (req, res) => {
  const { chartType, dataPoints, seriesCount } = req.body;
  const { generateRandomData } = require('../utils/dataGenerator');
  
  if (!chartType || !dataPoints) {
    return res.status(400).json({ 
      error: 'chartType and dataPoints are required' 
    });
  }
  
  const series = [];
  const count = parseInt(seriesCount) || 1;
  
  for (let i = 0; i < count; i++) {
    series.push({
      name: `Dataset ${i + 1}`,
      type: chartType,
      data: generateRandomData(parseInt(dataPoints), 10, 100)
    });
  }
  
  res.json({
    series,
    categories: Array.from({ length: parseInt(dataPoints) }, (_, i) => `Point ${i + 1}`),
    metadata: {
      generated: new Date().toISOString(),
      requestedType: chartType,
      dataPoints: parseInt(dataPoints)
    }
  });
});

module.exports = router; 