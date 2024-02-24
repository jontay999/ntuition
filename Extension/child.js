const SERVER = "http://localhost:3000";
const MONITOR_DETAILS = {
    blacklisted_sites: ["instagram.com", "youtube.com", "tiktok.com"],
    duration: 30,
};

const socket_child = io(SERVER);

// I tell server to generate 6 digit code for me
const send_monitor_request = () => {
    socket_child.emit("child_monitor_request");
};

// Server sends me back code to share with parent
socket_child.on("child_code", (data) => {
    console.log("received code:", data);
});

// show child that server is waiting for you to confirm
socket_child.on("child_complete_handshake", (parent_id) => {
    console.log(
        "parent accepted request, i am being monitored by ",
        parent_id
    );
    document.getElementById("resp1").innerHTML = parent_id;
});

// tell server i okay with the panopticon
const send_confirmation = () => {
    const parent_id = document.getElementById("resp1").innerHTML;
    console.log("confirming ", parent_id, "as my parent");
    socket_child.emit("child_confirm_handshake", parent_id);
};

// tell server that i am bad boy
const send_i_am_bad_boy = () => {
    console.log("tell server i am bad boy");
    const bad_site = "https://tiktok.com/youtube.com/instagram.com";
    socket_child.emit("child_is_bad_boy", bad_site);
};

// kenna scolded alreday
socket_child.on("child_kenna_scolded", (scolding) => {
    alert("kenna scolded already haiyo:" + scolding);
});