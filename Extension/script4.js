var endTime = 1708789039;
var nowTime = Math.floor(Date.now()/1000);

console.log(endTime);
console.log(nowTime);

var duration = endTime - nowTime;
var minDuration = Math.max(Math.floor(duration/60), 0)

console.log(minDuration)

if (minDuration <= 0) {
    document.getElementById("tracking-message").classList.add("hidden")
    document.getElementById("over-message").classList.remove("hidden")
    document.getElementById("end-button").classList.add("hidden")
    document.getElementById("new-button").classList.remove("hidden")
}

document.getElementById("duration").innerHTML = minDuration;