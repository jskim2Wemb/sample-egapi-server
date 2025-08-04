const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    value: Math.floor(Math.random() * 100) + 50,
    metrics: {
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 1000),
      disk: Math.floor(Math.random() * 100)
    }
  });
});

// Server-Sent Events endpoint for real-time streaming
router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const sendData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      value: Math.floor(Math.random() * 100) + 50,
      metrics: {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000)
      }
    };
    
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  
  // Send initial data
  sendData();
  
  // Send data every second
  const interval = setInterval(sendData, 1000);
  
  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
  });
});

module.exports = router; 