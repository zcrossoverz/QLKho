const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const app = express();


const setupObjectRoutes = require("./app/routes/object.route");
const setupUnitRoutes = require("./app/routes/unit.route");
const setupCategoryRoutes = require("./app/routes/category.route");
const setupProviderRoutes = require("./app/routes/provider.route");
const setupCustomerRoutes = require("./app/routes/customer.route");

app.use(cors()); 

app.use(express.json());


setupUnitRoutes(app);
setupObjectRoutes(app);
setupCategoryRoutes(app);
setupProviderRoutes(app);
setupCustomerRoutes(app);

app.get("/", (req, res) => {
    res.send({ message: "hello world"});
});

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});
