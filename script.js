// Month abbreviations for chart labels
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Initialize chart variable
let myChart = null;

// Function to validate username
function validateUsername(username) {
  const errors = [];

  // Check minimum length
  if (username.length < 5) {
    errors.push("Username must be at least 5 characters long");
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(username)) {
    errors.push("Username must contain at least 1 uppercase letter");
  }

  // Check for at least one number
  if (!/[0-9]/.test(username)) {
    errors.push("Username must contain at least 1 number");
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username)) {
    errors.push("Username must contain at least 1 special character");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

// Function to get all income data
function getIncomeData() {
  return months.map((month) => {
    const input = document.getElementById(`income-${month}`);
    return parseFloat(input.value) || 0;
  });
}

// Function to get all expense data
function getExpenseData() {
  return months.map((month) => {
    const input = document.getElementById(`expense-${month}`);
    return parseFloat(input.value) || 0;
  });
}

// Function to create or update the chart
function updateChart() {
  const incomeData = getIncomeData();
  const expenseData = getExpenseData();

  const ctx = document.getElementById("chartCanvas").getContext("2d");

  // Destroy existing chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  // Create new chart
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthLabels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += "$" + context.parsed.y.toLocaleString();
              return label;
            },
          },
        },
      },
    },
  });
}

// Event listener for when the page loads
window.onload = function () {
  // Initialize the chart with default values
  updateChart();

  // Add event listener to username form submit
  const usernameForm = document.getElementById("usernameForm");
  const usernameInput = document.getElementById("username");
  const usernameError = document.getElementById("usernameError");
  const usernameSuccess = document.getElementById("usernameSuccess");

  usernameForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = usernameInput.value.trim();
    const validation = validateUsername(username);

    if (validation.isValid) {
      usernameError.style.display = "none";
      usernameSuccess.style.display = "block";
      usernameSuccess.textContent = "✓ Username is valid!";
      console.log("Valid username:", username);
    } else {
      usernameSuccess.style.display = "none";
      usernameError.style.display = "block";
      usernameError.innerHTML = "✗ " + validation.errors.join("<br>✗ ");
    }
  });

  // Add event listener to the update button
  const updateButton = document.getElementById("updateChart");
  updateButton.addEventListener("click", function () {
    updateChart();
    // Switch to chart tab after updating
    const chartTab = new bootstrap.Tab(document.getElementById("chart-tab"));
    chartTab.show();
  });

  // Add event listeners to all inputs to update chart on Enter key
  const allInputs = document.querySelectorAll(".income-input, .expense-input");
  allInputs.forEach((input) => {
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        updateChart();
      }
    });
  });

  // Update chart when switching to chart tab
  const chartTabButton = document.getElementById("chart-tab");
  chartTabButton.addEventListener("click", function () {
    updateChart();
  });

  // Add event listener to download button
  const downloadButton = document.getElementById("downloadChart");
  downloadButton.addEventListener("click", function (event) {
    event.preventDefault();
    downloadChartAsImage();
  });
};

// Function to download chart as PNG
function downloadChartAsImage() {
  if (!myChart) {
    alert("Please generate a chart first!");
    return;
  }

  const canvas = document.getElementById("chartCanvas");
  const url = canvas.toDataURL("image/png");

  // Create a temporary link element
  const link = document.createElement("a");
  link.download = "income-expense-chart.png";
  link.href = url;

  // Trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
