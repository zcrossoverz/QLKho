const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const app = express();


const setupObjectRoutes = require("./app/routes/object.route");

// app.use(cors({ origin: config.app.origin })); 

app.use(express.json());



setupObjectRoutes(app);

app.get("/", (req, res) => {
    res.send({ message: "hello world"});
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
