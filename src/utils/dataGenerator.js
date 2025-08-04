const generateRandomData = (count, min, max) => {
  return Array.from({ length: count }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

const generateTimeSeriesData = (days) => {
  const data = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 100) + 50
    });
  }
  
  return data;
};

const generateCategories = (type, count) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  if (type === 'months') {
    const currentMonth = new Date().getMonth();
    const categories = [];
    
    for (let i = count - 1; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      categories.push(monthNames[monthIndex]);
    }
    
    return categories;
  } else if (type === 'days') {
    const categories = [];
    const now = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      categories.push(date.toISOString().split('T')[0]);
    }
    
    return categories;
  }
  
  return Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
};

module.exports = {
  generateRandomData,
  generateTimeSeriesData,
  generateCategories
}; 