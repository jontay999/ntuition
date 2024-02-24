io.on("connection", (socket) => {
    const ipAddress = socket.handshake.address;

    console.log(ipAddress); // prints something like "203.0.113.195" (IPv4) or "2001:db8:85a3:8d3:1319:8a2e:370:7348" (IPv6)
});