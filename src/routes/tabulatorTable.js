const express = require('express');
const router = express.Router();
const { generateRandomData, generateTimeSeriesData } = require('../utils/dataGenerator');

// Generate table data for Tabulator
const generateTableData = (rows = 50, columns = 5) => {
  const data = [];
  const columnNames = ['ID', 'Name', 'Age', 'Department', 'Salary', 'Email', 'Status', 'JoinDate'];
  
  for (let i = 1; i <= rows; i++) {
    const row = {
      id: i,
      name: `Employee ${i}`,
      age: Math.floor(Math.random() * 40) + 22,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
      salary: Math.floor(Math.random() * 80000) + 30000,
      email: `employee${i}@company.com`,
      status: Math.random() > 0.2 ? 'Active' : 'Inactive',
      joinDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 5).toISOString().split('T')[0]
    };
    
    // Add additional columns if requested
    if (columns > 8) {
      for (let j = 8; j < columns; j++) {
        row[`column${j}`] = `Value ${Math.floor(Math.random() * 1000)}`;
      }
    }
    
    data.push(row);
  }
  
  return data;
};

// GET /api/tabulator-table - Get table data
router.get('/', (req, res) => {
  const { rows = 50, columns = 5 } = req.query;
  
  try {
    const tableData = generateTableData(parseInt(rows), parseInt(columns));
    
    res.json({
      data: tableData,
      totalRows: tableData.length,
      columns: Object.keys(tableData[0] || {}),
      metadata: {
        generated: new Date().toISOString(),
        requestedRows: parseInt(rows),
        requestedColumns: parseInt(columns)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate table data',
      message: error.message 
    });
  }
});

// GET /api/tabulator-table/sample - Get sample table data with predefined structure
router.get('/sample', (req, res) => {
  const sampleData = [
    { id: 1, name: 'John Doe', age: 30, department: 'Engineering', salary: 75000, email: 'john@company.com', status: 'Active', joinDate: '2020-01-15' },
    { id: 2, name: 'Jane Smith', age: 28, department: 'Marketing', salary: 65000, email: 'jane@company.com', status: 'Active', joinDate: '2019-08-22' },
    { id: 3, name: 'Bob Johnson', age: 35, department: 'Sales', salary: 70000, email: 'bob@company.com', status: 'Inactive', joinDate: '2018-03-10' },
    { id: 4, name: 'Alice Brown', age: 26, department: 'HR', salary: 55000, email: 'alice@company.com', status: 'Active', joinDate: '2021-06-05' },
    { id: 5, name: 'Charlie Wilson', age: 32, department: 'Finance', salary: 80000, email: 'charlie@company.com', status: 'Active', joinDate: '2017-11-18' }
  ];
  
  res.json({
    data: sampleData,
    totalRows: sampleData.length,
    columns: Object.keys(sampleData[0]),
    metadata: {
      generated: new Date().toISOString(),
      type: 'sample'
    }
  });
});

// GET /api/tabulator-table/large - Get large dataset for performance testing
router.get('/large', (req, res) => {
  const { rows = 1000 } = req.query;
  
  try {
    const tableData = generateTableData(parseInt(rows), 8);
    
    res.json({
      data: tableData,
      totalRows: tableData.length,
      columns: Object.keys(tableData[0] || {}),
      metadata: {
        generated: new Date().toISOString(),
        requestedRows: parseInt(rows),
        type: 'large-dataset'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate large table data',
      message: error.message 
    });
  }
});

// POST /api/tabulator-table/custom - Generate custom table data
router.post('/custom', (req, res) => {
  const { 
    rows = 50, 
    columns = 5, 
    includeId = true, 
    includeName = true,
    includeAge = true,
    includeDepartment = true,
    includeSalary = true,
    includeEmail = true,
    includeStatus = true,
    includeJoinDate = true
  } = req.body;
  
  try {
    const data = [];
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'Support'];
    
    for (let i = 1; i <= parseInt(rows); i++) {
      const row = {};
      
      if (includeId) row.id = i;
      if (includeName) row.name = `Employee ${i}`;
      if (includeAge) row.age = Math.floor(Math.random() * 40) + 22;
      if (includeDepartment) row.department = departments[Math.floor(Math.random() * departments.length)];
      if (includeSalary) row.salary = Math.floor(Math.random() * 80000) + 30000;
      if (includeEmail) row.email = `employee${i}@company.com`;
      if (includeStatus) row.status = Math.random() > 0.2 ? 'Active' : 'Inactive';
      if (includeJoinDate) row.joinDate = new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 5).toISOString().split('T')[0];
      
      // Add additional custom columns
      const currentColumns = Object.keys(row).length;
      if (parseInt(columns) > currentColumns) {
        for (let j = currentColumns; j < parseInt(columns); j++) {
          row[`custom${j}`] = `Custom Value ${Math.floor(Math.random() * 1000)}`;
        }
      }
      
      data.push(row);
    }
    
    res.json({
      data,
      totalRows: data.length,
      columns: Object.keys(data[0] || {}),
      metadata: {
        generated: new Date().toISOString(),
        requestedRows: parseInt(rows),
        requestedColumns: parseInt(columns),
        configuration: {
          includeId,
          includeName,
          includeAge,
          includeDepartment,
          includeSalary,
          includeEmail,
          includeStatus,
          includeJoinDate
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate custom table data',
      message: error.message 
    });
  }
});

module.exports = router; 