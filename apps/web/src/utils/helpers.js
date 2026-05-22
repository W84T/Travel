
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

export const filterAndSearch = (plans, { search, destination, minPrice, maxPrice, minDuration, maxDuration }) => {
  return plans.filter(plan => {
    const matchSearch = search ? plan.title.toLowerCase().includes(search.toLowerCase()) || plan.destination.toLowerCase().includes(search.toLowerCase()) : true;
    const matchDest = destination ? plan.destination.toLowerCase() === destination.toLowerCase() : true;
    const matchPrice = plan.price >= (minPrice || 0) && plan.price <= (maxPrice || Infinity);
    const matchDuration = plan.duration >= (minDuration || 0) && plan.duration <= (maxDuration || Infinity);
    
    return matchSearch && matchDest && matchPrice && matchDuration;
  });
};
