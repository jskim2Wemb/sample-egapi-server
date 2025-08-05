const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static files from client directory
app.use('/client', express.static(path.join(__dirname, 'client')));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ECharts API Server is running on http://localhost:${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET  /health');
  console.log('  GET  /api/line-chart');
  console.log('  GET  /api/bar-chart');
  console.log('  GET  /api/combined-chart');
  console.log('  GET  /api/pie-chart');
  console.log('  GET  /api/pie-chart/donut');
  console.log('  GET  /api/pie-chart/category/:type');
  console.log('  GET  /api/pie-chart/sample');
  console.log('  POST /api/pie-chart/custom');
  console.log('  GET  /api/realtime');
  console.log('  POST /api/custom-chart');
  console.log('  GET  /api/tabulator-table');
  console.log('  GET  /api/tabulator-table/sample');
  console.log('  GET  /api/tabulator-table/large');
  console.log('  POST /api/tabulator-table/custom');
  console.log('\nExample client: http://localhost:' + PORT + '/client/example.html');
});