// Once my HTML file is loaded the EvenListener starts working.
document.addEventListener("DOMContentLoaded", function () {

    //Buttons 
<<<<<<< Updated upstream
    const todayBtn = document.querySelector(".todayBtn");
    const weekBtn = document.querySelector(".weekBtn");
    const monthBt = document.querySelector(".monthBtn");
    const accidentList = document.querySelector(".accidentsListBtn");
    const heatMapBtn = document.querySelector(".heatMapBtn");
    const statBtn = document.querySelector(".statBtn");
    const reportBtn = document.querySelector(".reportBtn");
    const abtBtn = document.querySelector(".aboutBtn");
=======
    const todayBtn = document.querySelector(".nav-btn.active");
    const weekBtn = document.querySelector(".week-btn");
    const monthBt = document.querySelector(".month-btn");
    const accidentList = document.querySelector(".nav-btn");
    const heatMapBtn = document.querySelector(".nav-btn");
    const statBtn = document.querySelector(".nav-btn");
    const reportBtn = document.querySelector(".nav-btn");
    const abtBtn = document.querySelector(".about-btn");
>>>>>>> Stashed changes

    //Button functions
    if (todayBtn) {
        todayBtn.addEventListener("click", function () {
            alert("Today Accident Report\n10 accidents, no fatality");
        });
    }

    //About button tells us about the developers of this program
    if (abtBtn) {
        abtBtn.addEventListener("click", function () {
            window.location.href = "aboutUs.html";
            // alert("Sudev: Aspiring Pilot\nMeet: Aspiring Software Engineer\nRythem:Aspiring Software Developer\nTanveer:Aspiring Game Developer");
        });
    }

    //Month Chart
    if (monthBt) {
        monthBt.addEventListener("click", function () {
        window.location.href = "charts.html";
    });
    } 
    
    //Week Chart
    if (weekBtn) {
        weekBtn.addEventListener("click", function () {
        window.location.href = "charts.html";
    });
    } 

    if (reportBtn) {
        reportBtn.addEventListener("click", function () {
        window.prompt("Location: City");
        window.prompt("Severity: High, Medium or Low");
        window.prompt("Day time: Day or Night");
        window.prompt("Weather: Cold or Warm");
        });
    }

    document.querySelector(".toggle").forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
        });
    });
});
