// Sidebar active state toggle
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

// Date filter click
const dateFilter = document.querySelector('.date-filter');
if (dateFilter) {
  dateFilter.addEventListener('click', () => {
    alert('Date picker will be added here.');
  });
}

// Filter button click
const filterButton = document.querySelector('.filter-button');
if (filterButton) {
  filterButton.addEventListener('click', () => {
    alert('Filters applied!');
  });
}

// Period tab switch
document.querySelectorAll('.period-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const selected = tab.innerText.trim().toLowerCase();
    updateChart(selected);
  });
});

// Simulated data by time period
const revenueDataSets = {
  daily: [3000, 2000, 1500, 1000],
  weekly: [18000, 16000, 12000, 9000],
  monthly: [28000, 24000, 16500, 12000],
  yearly: [420000, 380000, 290000, 180000]
};

// Chart.js setup
let revenueChart;
function setupRevenueChart(data) {
  const ctx = document.getElementById('revenueChart').getContext('2d');
  if (revenueChart) {
    revenueChart.destroy();
  }
  revenueChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Dine-in', 'Delivery', 'Takeout', 'Catering'],
      datasets: [{
        data: data,
        backgroundColor: ['#4169e1', '#9370db', '#43a047', '#ff9800'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#1a2542',
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Kes ${context.parsed.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}

// Chart switch logic
function updateChart(period) {
  const values = revenueDataSets[period] || revenueDataSets['monthly'];
  setupRevenueChart(values);
}

// Simulate stat update
function simulateStatUpdates() {
  const stats = [
    { selector: '.quick-stats .stat-card:nth-child(2) .stat-value', value: 26 },
    { selector: '.quick-stats .stat-card:nth-child(3) .stat-value', value: 'Kes 92,000' },
    { selector: '.quick-stats .stat-card:nth-child(4) .stat-value', value: 'Kes 19,200' }
  ];
  
  stats.forEach(stat => {
    const el = document.querySelector(stat.selector);
    if (el) {
      setTimeout(() => {
        el.textContent = stat.value;
      }, 2500);
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  setupRevenueChart(revenueDataSets['monthly']);
  simulateStatUpdates();
});
