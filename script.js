document.addEventListener("DOMContentLoaded", function () {

    //Buttons 
    const todayBtn = document.querySelector(".nav-btn.active");
    const weekBtn = document.querySelector(".date-btn");
    const monthBt = document.querySelector(".date-btn");
    const accidentList = document.querySelector(".nav-btn");
    const heatMapBtn = document.querySelector(".nav-btn");
    const statBtn = document.querySelector(".nav-btn");
    const reportBtn = document.querySelector(".nav-btn");
    const abtBtn = document.querySelector(".nav-btn");

    //Button functions
    if (todayBtn) {
        todayBtn.addEventListener("click", function () {
            alert("Today button clicked!");
        });
    }
    //About button tells us about the developers of this program
    if (weekBtn) {
        nav-btn.addEventListener("click", function () {
            alert("Sudev: Aspiring Pilot\n");
         });
    }


});