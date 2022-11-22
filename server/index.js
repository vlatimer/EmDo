const express = require("express");
const path = require("path");
const serverRoutes = require("./routes.js");
const cors = require("cors");

const PORT = 3333;
const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.json());
app.use(serverRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}...`);
});
