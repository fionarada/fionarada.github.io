function createExperienceChart() {
  const ctx = document.getElementById('experienceChart');
  if (!ctx) return;

  const finalData = [1, 4, 5, 6, 7, 8, 10];
  
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Year 1', 'Years 2-4', 'Years 4-5', 'Years 5-6', 'Years 6-7', 'Year 8', 'Years 9-10'],
      datasets: [{
        label: 'Experience Growth',
        data: Array(7).fill(null),
        borderColor: '#FF1F8E',
        backgroundColor: 'rgba(255, 31, 142, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#FF1F8E',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 12,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              family: 'Geist',
              size: 11
            },
            maxTicksLimit: 6
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              family: 'Geist',
              size: 11
            },
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            family: 'Geist',
            size: 13
          },
          bodyFont: {
            family: 'Geist',
            size: 12
          },
          padding: 10,
          displayColors: false
        }
      }
    }
  });

  // Store chart instance
  window.experienceChart = chart;

  function animateChart() {
    chart.data.datasets[0].data = finalData;
    chart.update();
  }

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateChart();
        observer.disconnect(); // Only animate once
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of the chart is visible
  });

  // Start observing the chart
  observer.observe(ctx);

  // Handle resize
  window.addEventListener('resize', () => {
    if (window.experienceChart) {
      window.experienceChart.resize();
    }
  });
}

// Initialize chart when page loads
document.addEventListener('DOMContentLoaded', createExperienceChart);

// Handle slide changes
document.addEventListener('slideChanged', (event) => {
  if (event.detail.currentSlide === 1) {
    // Destroy existing chart if it exists
    if (window.experienceChart) {
      window.experienceChart.destroy();
    }
    // Create new chart
    createExperienceChart();
  }
}); 