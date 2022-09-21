import {
    getAllEmployees,
    addEmployee,
    fireEmployee,
    deleteEmployee,
} from "./controllers/server.js";
import express from "express";

const route = express.Router();

route.get("/employees", getAllEmployees);

route.post("/employees", addEmployee);

route.put("/employees/:id", fireEmployee);

route.delete("/employees/:id", deleteEmployee);

export default route;
