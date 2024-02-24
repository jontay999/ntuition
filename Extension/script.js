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

// index2.html script

document.getElementById('copy').addEventListener('click', function() {
    
    // Select the text field
    var codeToCopy = document.getElementById("code");
    
    // Copy the text inside the text field
    navigator.clipboard.writeText(codeToCopy.textContent).then(() => {
      // Alert the user that the text was copied
      alert('Code copied to clipboard'); 
    }).catch(err => {
      // If the user denies clipboard permissions or another error occurs
      console.error('Error in copying code: ', err);
    });
});

// index3.html script
document.getElementById('codeInput').addEventListener('input', function(e) {
    // Allow only digits by replacing non-digit characters
    this.value = this.value.replace(/\D/g, '');
});

