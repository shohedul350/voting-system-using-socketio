const express = require("express");
const app = express();
const port = 5000;

// Host the front end
app.use(express.static("client"));

// Start the server and initialize socket.io
const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
const io = require("socket.io")(server);

// Initialize candidates
const candidates = {
    "0": { votes: 0, label: "JavaScript", color: "#8247F7" },
    "1": { votes: 0, label: "C#", color: "#FA6B8D"},
    "2": { votes: 0, label: "PHP", color: "#FF8245" },
    "3": { votes: 0, label: "Python", color: "#658AFF" },
    "4": { votes: 0, label: "Go", color: "#1F59FD" }
};

// On new client connection
io.on("connection", (socket) => {
    io.emit("update", candidates);

    // On new vote
    socket.on("vote", (index) => {

        // Increase the vote at index
        if (candidates[index]) {
            candidates[index].votes += 1;
        }
        // Show the candidates in the console for testing
        console.log(candidates);

        // Tell everybody else about the new vote
        io.emit("update", candidates);
    });
});
