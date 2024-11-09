//calculate age function
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

// Function to display the Gender Distribution Chart
function displayGenderChart() {
    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    const genderCounts = { Male: 0, Female: 0, Other: 0 }; //keeps count of each users gender
  
    //loops through each user
    users.forEach(user => {
      if (user.gender in genderCounts) {
        genderCounts[user.gender]++; //updates counter
      }
    });
  
    //create bar chart
    const ctx = document.getElementById("genderChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Male", "Female", "Other"],
        datasets: [{
          label: "Gender Distribution",
          data: [genderCounts.Male, genderCounts.Female, genderCounts.Other],
          backgroundColor: ["lightblue", "pink", "purple"],
          borderColor: ["lightblue", "pink", "purple"],
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  }
  
  // Function to display the Age Group Distribution Chart
  function displayAgeGroupChart() {
    const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    //array to store counters for each age bracket
    const ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 }; 
  
    users.forEach(user => {
      const age = calculateAge(user.dob);
      if (age >= 18 && age <= 25) ageGroups["18-25"]++;
      else if (age >= 26 && age <= 35) ageGroups["26-35"]++;
      else if (age >= 36 && age <= 50) ageGroups["36-50"]++;
      else if (age > 50) ageGroups["50+"]++;
    });
    
    // create bar chart
    const ctx = document.getElementById("ageGroupChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["18-25", "26-35", "36-50", "50+"],
        datasets: [{
          label: "Age Group Distribution",
          data: [ageGroups["18-25"], ageGroups["26-35"], ageGroups["36-50"], ageGroups["50+"]],
          backgroundColor: ["#75ba75", "#ffce56", "#4bc0c0", "#9966ff"],
          borderColor: ["#75ba75", "#ffce56", "#4bc0c0", "#9966ff"],
          borderWidth: 1
        }]
      },
      options: {
        scales: { y: { beginAtZero: true } }
      }
    });
  }
  
  // Call functions to display the charts when the dashboard page loads
  document.addEventListener("DOMContentLoaded", () => {
    displayGenderChart();
    displayAgeGroupChart();
  });