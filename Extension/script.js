let durationDisplay = document.getElementById("duration");
let reduceDurationButton = document.getElementById("reduce-duration");
let increaseDurationButton = document.getElementById("increase-duration");
let trackAnotherButton = document.getElementById("track-another");

function increaseDuration() {
  durationDisplay.textContent =
    (parseInt(durationDisplay.textContent.split(" ")[0]) + 5).toString() +
    " mins";
}

function reduceDuration() {
  durationDisplay.textContent =
    (parseInt(durationDisplay.textContent.split(" ")[0]) - 5).toString() +
    " mins";
}

reduceDurationButton.addEventListener("click", reduceDuration);
increaseDurationButton.addEventListener("click", increaseDuration);
