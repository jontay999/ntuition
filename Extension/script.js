let startSessionSection = document.getElementById("start-session-section");
let codeSection = document.getElementById("code-section");
let trackAnotherSection = document.getElementById("track-another-section");
let trackingSection = document.getElementById("tracking-section");
let timerSection = document.getElementById("timer-section");

let durationDisplay = document.getElementById("duration");
let reduceDurationButton = document.getElementById("reduce-duration");
let increaseDurationButton = document.getElementById("increase-duration");
let trackAnotherButton = document.getElementById("track-another");
let addWebsiteButton = document.getElementById("add-website");
let blacklistSection = document.getElementById("blacklist-section");
let addNewWebsiteButton = document.getElementById("add-new-website-button");
let generateCodeButton = document.getElementById("generate-code-button");
let startTrackingButton = document.getElementById("start-tracking-button");
let startSessionButton = document.getElementById("start-session-button");
let newSessionButton = document.getElementById("new-button");

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

function addWebsite() {
  // Get the input value
  var newWebsiteInput = document.getElementById("newWebsite");
  var newWebsite = newWebsiteInput.value.trim();

  // Check if the input is not empty
  if (newWebsite !== "") {
    // Create a new checkbox and label
    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.id = newWebsite.toLowerCase();
    newCheckbox.name = newWebsite.toLowerCase();
    newCheckbox.checked = true;

    var newLabel = document.createElement("label");
    newLabel.htmlFor = newWebsite.toLowerCase();
    newLabel.textContent = newWebsite;

    // Create a new div for the entry
    var newEntry = document.createElement("div");
    newEntry.className = "flex items-center gap-3 ml-4 my-1";
    newEntry.appendChild(newCheckbox);
    newEntry.appendChild(newLabel);

    // Append the new entry to the blacklist section
    var blacklistSection = document.getElementById("blacklist-section");
    blacklistSection.insertBefore(
      newEntry,
      document.getElementById("add-website")
    );

    // Clear the input field
    newWebsiteInput.value = "";
  }
}

addNewWebsiteButton.addEventListener("click", addWebsite);

// index2.html script

document.getElementById("copy").addEventListener("click", function () {
  // Select the text field
  var codeToCopy = document.getElementById("code");

  // Copy the text inside the text field
  navigator.clipboard
    .writeText(codeToCopy.textContent)
    .then(() => {
      // Alert the user that the text was copied
      alert("Code copied to clipboard");
    })
    .catch((err) => {
      // If the user denies clipboard permissions or another error occurs
      console.error("Error in copying code: ", err);
    });
});

// index3.html script
document.getElementById("codeInput").addEventListener("input", function (e) {
  // Allow only digits by replacing non-digit characters
  this.value = this.value.replace(/\D/g, "");
});

function generateCode() {
  var blacklistSites = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      blacklistSites.push(checkbox.name);
    }
  });

  // Get the input value
  var duration = +document.getElementById("duration").textContent.split(" ")[0];
  console.log(blacklistSites, duration);
  var nowTime = Math.floor(Date.now() / 1000);
  endTime = nowTime + duration * 60;
  localStorage.setItem("endTime", endTime);

  //set display none for start section
  startSessionSection.style.display = "none";
  codeSection.style.display = "block";

  //generate a random 6 digit number
  const randomCode = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("code").textContent = randomCode;
  console.log("code generated");
}

function trackAnother() {
  //set display none for start section
  trackAnotherSection.style.display = "block";
  startSessionSection.style.display = "none";
}

function startTracking() {
  //set display none for start section
  trackingSection.style.display = "block";
  trackAnotherSection.style.display = "none";
  console.log("start tracking");
}

function startTimer() {
  //set display none for start section
  timerSection.style.display = "block";
  codeSection.style.display = "none";
}

function newSession() {
  timerSection.style.display = "none";
  startSessionSection.style.display = "block";
}

trackAnotherButton.addEventListener("click", trackAnother);
generateCodeButton.addEventListener("click", generateCode);
addNewWebsiteButton.addEventListener("click", addWebsite);
startTrackingButton.addEventListener("click", startTracking);
startSessionButton.addEventListener("click", startTimer);
newSessionButton.addEventListener("click", newSession);

setInterval(() => {
  var nowTime = Math.floor(Date.now() / 1000);
  var endTime = localStorage.getItem("endTime");
  var duration = endTime - nowTime;
  var minDuration = Math.max(Math.floor(duration / 60), 0);

  if (minDuration <= 0) {
    document.getElementById("tracking-message").classList.add("hidden");
    document.getElementById("over-message").classList.remove("hidden");
    document.getElementById("end-button").classList.add("hidden");
    document.getElementById("new-button").classList.remove("hidden");
  }

  document.getElementById("timer-duration").innerHTML = minDuration;
}, 1000);
