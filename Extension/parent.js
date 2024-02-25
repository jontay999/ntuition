const socket_parent = io("http://localhost:3000");

// tell server that i would love to stalk this person
const send_accept_code = (code) => {
  console.log("parent accepting request with code:", code);

  socket_parent.emit("parent_accept_request", code);
};

// tell parent that big brother can start watching little brother

socket_parent.on("parent_begin_monitoring", (child_id) => {
  console.log("can begin monitoring my dear child:", child_id);
});

// kenna complain

socket_parent.on("parent_kenna_complain", (site) => {
  // alert(`OH NO!!!! The user visited : ${site}!!!!`);
  console.log("site", site);
  console.log(document.getElementById("blacklist-section"));

  //remove div with content You have no notifications yet!
  if (document.getElementById("no-notifications")) {
    document.getElementById("no-notifications").remove();
  }

  //check if site already exists in notifications-section
  if (
    document.getElementById("notifications-section").innerHTML.includes(site)
  ) {
    return;
  }

  document.getElementById("notifications-section").innerHTML += `<div
  class="flex flex-col text-sm border-gray-500 border text-center px-4 py-2 rounded-lg"
>
  <div class="font-semibold">${site} was visited</div>
  <div class="italic">${new Date().toLocaleTimeString()}</div>
</div>`;
});

const call_police_on_child = (scolding) => {
  console.log("need to scold child liao!");

  socket_parent.emit("parent_call_police", scolding);
};

document
  .getElementById("start-tracking-button")
  .addEventListener("click", () => send_accept_code(712382));
