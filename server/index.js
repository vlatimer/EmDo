import express from "express";
import path from "path";
import serverRoutes from "./routes.js";
// import { requestTime, logger } from "./middlewears.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

let __dirname = path.resolve();

// app.set("view engine", "server");
// app.set("views", path.resolve(__dirname, "server"));
app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.json());
app.use(serverRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}...`);
});
