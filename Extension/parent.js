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