const ctxTop5 = document.getElementById(`grafTop5`)
const ctxProp = document.getElementById(`grafProp`)

new Chart(ctxTop5, {
  data: {
    labels: `sadfs`,
    datasets: [{
      type: 'bar',
      label: [1, 2, 3, 4, 5],
      data: [5, 2, 8, 16, 28],
      backgroundColor: '#A63F03'
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        ticks: {
          color: 'white',
          font: {
            size: 18,
            weight: 'bold'
          }
        },
        grid: {
          color: 'white'
        },
        title: {
          display: true,
          text: 'Quantidade de rumores',
          color: 'white',
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      },
      y: {
        ticks: {
          color: 'white',
          font: {
            size: 22,
            weight: 'bold'
          }
        },
        title: {
          display: true,
          text: '',
          color: 'white',
          font: {
            size: 22,
            weight: 'bold'
          }
        },
        beginAtZero: true
      }
    }
  }
});


new Chart(ctxProp, {
  type: "pie",
  data: {
    labels: ["Folclore", "Mistério", "Horror", "Aventura", "Terror psicológico", "Romance", "Fantasia"],
    datasets: [{
      data: [14, 12, 15, 9, 12, 18, 20],
      backgroundColor: [
        "#6a4c7a",
        "#4a3557",
        "#2c122c",
        "#3e1d2f",
        "#8b3e04",
        "#ff7a18",
        "#c45a00"
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#ffffff",
          usePointStyle: true,
          font: {
            size: 18,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: "rgba(25, 10, 25, 0.9)",
        borderColor: "#ff7a18",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#fff"
      }
    }
  }
});