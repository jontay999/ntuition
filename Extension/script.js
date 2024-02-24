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
  var duration = document.getElementById("duration").textContent.split(" ")[0];
  console.log(blacklistSites, duration);

  //set display none for start section
  startSessionSection.style.display = "none";
  codeSection.style.display = "block";

  //generate a random 6 digit number
  const randomCode = Math.floor(100000 + Math.random() * 900000);
  document.getElementById("code").textContent = randomCode;
  console.log("start timer")
  send_monitor_request();
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

var endTime = 1708789039;
var nowTime = Math.floor(Date.now() / 1000);

console.log(endTime);
console.log(nowTime);

var duration = endTime - nowTime;
var minDuration = Math.max(Math.floor(duration / 60), 0);

console.log(minDuration);

if (minDuration <= 0) {
  document.getElementById("tracking-message").classList.add("hidden");
  document.getElementById("over-message").classList.remove("hidden");
  document.getElementById("end-button").classList.add("hidden");
  document.getElementById("new-button").classList.remove("hidden");
}

document.getElementById("timer-duration").innerHTML = minDuration;

// // Child functions

// const socket_child = io('http://localhost:3000');
// console.log("child connect")

// // I tell server to generate 6 digit code for me
// const send_monitor_request = () => {
//     socket_child.emit("child_monitor_request");
//     console.log("sent monitor request");
// };

// // Server sends me back code to share with parent
// socket_child.on("child_code", (data) => {
//     console.log("received code:", data);
// });

// // show child that server is waiting for you to confirm
// socket_child.on("child_complete_handshake", (parent_id) => {
//     console.log(
//         "parent accepted request, i am being monitored by ",
//         parent_id
//     );
//     document.getElementById("resp1").innerHTML = parent_id;
// });

// // tell server i okay with the panopticon
// const send_confirmation = () => {
//     const parent_id = document.getElementById("resp1").innerHTML;
//     console.log("confirming ", parent_id, "as my parent");
//     socket_child.emit("child_confirm_handshake", parent_id);
// };

// // tell server that i am bad boy
// const send_i_am_bad_boy = () => {
//     console.log("tell server i am bad boy");
//     const bad_site = "https://tiktok.com/youtube.com/instagram.com";
//     socket_child.emit("child_is_bad_boy", bad_site);
// };

// // kenna scolded alreday
// socket_child.on("child_kenna_scolded", (scolding) => {
//     alert("kenna scolded already haiyo:" + scolding);
// });

// // Parent functions

// const socket_parent = io("http://localhost:3000");

// // tell server that i would love to stalk this person
// const send_accept_code = (code) => {
//   console.log("parent accepting request with code:", code);

//   socket_parent.emit("parent_accept_request", code);
// };

// // tell parent that big brother can start watching little brother

// socket_parent.on("parent_begin_monitoring", (child_id) => {
//   console.log("can begin monitoring my dear child:", child_id);
// });

// // kenna complain

// socket_parent.on("parent_kenna_complain", (site) => {
//   alert(`WALAO MY CHILD VISIT: ${site}!!!!`);
// });

// const call_police_on_child = (scolding) => {
//   console.log("need to scold child liao!");

//   socket_parent.emit("parent_call_police", scolding);
// };
