const healthVisualization = {
    batteryChart: null,
    temperatureChart: null,
    proximityChart: null,
    batteryData: [],
    temperatureData: [],
    chartInstance: null,
  
    init: function () {
      console.log("Initializing health visualization...");
      this.initBatteryChart();
      this.initTemperatureChart();
      this.initProximityChart();
  
      // Real-time updates
      setInterval(this.updateBatteryChart.bind(this), 2000);
      setInterval(this.updateTemperatureChart.bind(this), 2000);
      setInterval(this.updateProximityChart.bind(this), 2000);
  
      // Click event for chart selection
      $('.icon').on('click', (event) => {
        const chartType = $(event.target).data('chart');
        this.displayChart(chartType);
      });
  
      // Ensure the chart is loaded when the modal opens
      $('#chartModal').on('shown.bs.modal', (event) => {
        const chartType = $(event.relatedTarget).data('chart');
        this.displayChart(chartType);
      });
    },
  
    initBatteryChart: function () {
      this.batteryChart = {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Battery Level (%)',
            data: this.batteryData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          scales: {
            x: { display: true },
            y: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: { stepSize: 10 }
            },
          },
        },
      };
    },
  
    updateBatteryChart: function () {
      const newBatteryLevel = Math.max(0, Math.random() * 100);
      this.batteryData.push(newBatteryLevel);
      const timeLabel = new Date().toLocaleTimeString();
      this.batteryChart.data.labels.push(timeLabel);
  
      if (this.batteryData.length > 10) {
        this.batteryData.shift();
        this.batteryChart.data.labels.shift();
      }
      this.chartInstance.update();
    },
  
    initTemperatureChart: function () {
      this.temperatureChart = {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Temperature (°C)',
            data: this.temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          scales: {
            x: { display: true },
            y: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: { stepSize: 10 }
            },
          },
        },
      };
    },
  
    updateTemperatureChart: function () {
      const newTemperature = Math.min(100, Math.random() * 40 + 20);
      this.temperatureData.push(newTemperature);
      const timeLabel = new Date().toLocaleTimeString();
      this.temperatureChart.data.labels.push(timeLabel);
  
      if (this.temperatureData.length > 10) {
        this.temperatureData.shift();
        this.temperatureChart.data.labels.shift();
      }
      this.chartInstance.update();
    },
  
    initProximityChart: function () {
      this.proximityChart = {
        type: 'radar',
        data: {
          labels: ['Front', 'Back', 'Left', 'Right'],
          datasets: [{
            label: 'Proximity Sensors',
            data: [30, 40, 50, 60],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 20
              },
            },
          },
        },
      };
    },
  
    updateProximityChart: function () {
      const newProximityValues = Array(4).fill(0).map(() => Math.random() * 100);
      this.proximityChart.data.datasets[0].data = newProximityValues;
      this.chartInstance.update();
    },
  
    displayChart: function (chartType) {
      // Destroy the previous chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
  
      // Create a new chart based on the chartType
      let chartConfig = null;
      if (chartType === 'battery') {
        chartConfig = this.batteryChart;
      } else if (chartType === 'temperature') {
        chartConfig = this.temperatureChart;
      } else if (chartType === 'proximity') {
        chartConfig = this.proximityChart;
      }
  
      this.chartInstance = new Chart('chartCanvas', chartConfig);
  
      $('#chartModalLabel').text(chartType.charAt(0).toUpperCase() + chartType.slice(1) + " Chart");
    },
  };
  
  $(document).ready(function () {
    healthVisualization.init();
  });
  