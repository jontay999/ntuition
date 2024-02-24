let durationDisplay = document.getElementById("duration");
let reduceDurationButton = document.getElementById("reduce-duration");
let increaseDurationButton = document.getElementById("increase-duration");
let trackAnotherButton = document.getElementById("track-another");
let addWebsiteButton = document.getElementById("add-website");
let blacklistSection = document.getElementById("blacklist-section");
let addNewWebsiteButton = document.getElementById("add-new-website-button");

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
