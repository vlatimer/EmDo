const e = require("express");
const express = require("express");
const fs = require("fs");

const route = express.Router();

route.get("/employees", (req, res, next) => {
    const EMPLOYEES = require("./data/employees.json");
    res.status(200).json(EMPLOYEES);

    next();
});

route.post("/employees", (req, res, next) => {
    const EMPLOYEES = require("./data/employees.json");
    const newEmployee = {
        id: new Date().getTime() - getRandomNumber(1, 10000),
        ...req.body,
    };
    EMPLOYEES.employees.push(newEmployee);

    fs.writeFileSync(
        __dirname + "/data/employees.json",
        JSON.stringify(EMPLOYEES, null, 2)
    );
    res.status(201).json(newEmployee);

    next();
});

route.put("/employees/:id", (req, res, next) => {
    const EMPLOYEES = require("./data/employees.json");
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;

    let item;

    for (var i = 0; i < EMPLOYEES.employees.length; i++) {
        if (EMPLOYEES.employees[i].id === id) {
            for (var key in updateData) {
                EMPLOYEES.employees[i][key] = updateData[key];
            }
            item = EMPLOYEES.employees[i];
            break;
        }
    }

    res.status(200).json(item);
    next();
});

route.delete("/employees/:id", (req, res, next) => {
    let EMPLOYEES = require("./data/employees.json");
    const id = parseInt(req.params.id, 10);

    EMPLOYEES.employees = EMPLOYEES.employees.filter((item) => {
        if (item.id !== id) {
            return true;
        }
        return false;
    });

    fs.writeFileSync(
        __dirname + "/data/employees.json",
        JSON.stringify(EMPLOYEES, null, 2)
    );

    res.status(204);
    next();
});

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = route;
