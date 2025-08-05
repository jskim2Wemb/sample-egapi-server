const express = require('express');
const router = express.Router();

// 기본 파이 차트 데이터 생성
const generatePieData = (categories = 5, includeValue = true, customNames = null) => {
  const data = [];
  const defaultCategoryNames = ['Sales', 'Marketing', 'Engineering', 'Support', 'Finance', 'HR', 'Operations', 'Design', 'QA', 'DevOps', 'Product', 'Research'];
  const categoryNames = customNames || defaultCategoryNames;
  
  for (let i = 0; i < Math.min(categories, categoryNames.length); i++) {
    const value = Math.floor(Math.random() * 1000) + 100;
    const item = {
      name: categoryNames[i],
      value: value
    };
    
    if (includeValue) {
      item.percentage = ((value / (categories * 500)) * 100).toFixed(1);
    }
    
    data.push(item);
  }
  
  return data;
};

// 도넛 차트 데이터 생성 (중앙에 텍스트 포함)
const generateDonutData = (categories = 5) => {
  const data = generatePieData(categories);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return {
    data: data,
    total: total,
    centerText: {
      total: total.toLocaleString(),
      label: 'Total'
    }
  };
};

// 카테고리별 파이 차트 데이터 생성
const generateCategoryPieData = (categoryType = 'department', categories = 5) => {
  const categoryMap = {
    department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Support', 'Operations', 'Design', 'QA', 'DevOps'],
    region: ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Africa', 'Oceania', 'Central Asia'],
    product: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H'],
    status: ['Active', 'Inactive', 'Pending', 'Completed', 'Cancelled', 'On Hold', 'In Progress', 'Review'],
    priority: ['High', 'Medium', 'Low', 'Critical', 'Normal', 'Urgent', 'Minor', 'Major']
  };
  
  const availableCategories = categoryMap[categoryType] || categoryMap.department;
  const selectedCategories = availableCategories.slice(0, Math.min(categories, availableCategories.length));
  
  return generatePieData(selectedCategories.length, true, selectedCategories);
};

// 기본 파이 차트 API
router.get('/', (req, res) => {
  const { categories = 5, includeValue = true } = req.query;
  
  try {
    const pieData = generatePieData(parseInt(categories), includeValue === 'true');
    
    res.json({
      data: pieData,
      total: pieData.reduce((sum, item) => sum + item.value, 0),
      metadata: {
        generated: new Date().toISOString(),
        categories: parseInt(categories),
        includeValue: includeValue === 'true',
        type: 'pie-chart'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate pie chart data',
      message: error.message
    });
  }
});

// 도넛 차트 API
router.get('/donut', (req, res) => {
  const { categories = 5 } = req.query;
  
  try {
    const donutData = generateDonutData(parseInt(categories));
    
    res.json({
      data: donutData.data,
      total: donutData.total,
      centerText: donutData.centerText,
      metadata: {
        generated: new Date().toISOString(),
        categories: parseInt(categories),
        type: 'donut-chart'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate donut chart data',
      message: error.message
    });
  }
});

// 카테고리별 파이 차트 API
router.get('/category/:type', (req, res) => {
  const { type } = req.params;
  const { includeValue = true, categories = 5 } = req.query;
  
  try {
    const categoryData = generateCategoryPieData(type, parseInt(categories));
    
    res.json({
      data: categoryData,
      total: categoryData.reduce((sum, item) => sum + item.value, 0),
      categoryType: type,
      metadata: {
        generated: new Date().toISOString(),
        categoryType: type,
        categories: parseInt(categories),
        includeValue: includeValue === 'true',
        type: 'category-pie-chart'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate category pie chart data',
      message: error.message
    });
  }
});

// 샘플 파이 차트 데이터
router.get('/sample', (req, res) => {
  const { categories = 5 } = req.query;
  
  try {
    const sampleData = generatePieData(parseInt(categories), true);
    
    res.json({
      data: sampleData,
      total: sampleData.reduce((sum, item) => sum + item.value, 0),
      metadata: {
        generated: new Date().toISOString(),
        categories: parseInt(categories),
        type: 'sample-pie-chart'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate sample pie chart data',
      message: error.message
    });
  }
});

// 커스텀 파이 차트 데이터
router.post('/custom', (req, res) => {
  const {
    categories = 5,
    includeValue = true,
    minValue = 100,
    maxValue = 1000,
    categoryNames = []
  } = req.body;
  
  try {
    let data = [];
    const defaultNames = ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'];
    const names = categoryNames.length > 0 ? categoryNames : defaultNames;
    
    for (let i = 0; i < Math.min(categories, names.length); i++) {
      const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      const item = {
        name: names[i],
        value: value
      };
      
      if (includeValue) {
        const total = categories * ((minValue + maxValue) / 2);
        item.percentage = ((value / total) * 100).toFixed(1);
      }
      
      data.push(item);
    }
    
    res.json({
      data: data,
      total: data.reduce((sum, item) => sum + item.value, 0),
      metadata: {
        generated: new Date().toISOString(),
        categories: parseInt(categories),
        includeValue: includeValue,
        minValue: parseInt(minValue),
        maxValue: parseInt(maxValue),
        type: 'custom-pie-chart'
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate custom pie chart data',
      message: error.message
    });
  }
});

module.exports = router; 