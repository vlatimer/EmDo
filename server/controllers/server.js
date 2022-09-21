import { getRandomNumber } from "./helpers.js";

let EMPLOYEES = [];

export const getAllEmployees = (req, res, next) => {
    res.status(200).json(EMPLOYEES);

    next();
};

export const addEmployee = (req, res, next) => {
    const newEmployee = {
        id: new Date().getTime() - getRandomNumber(1, 10000),
        ...req.body,
    };
    EMPLOYEES.push(newEmployee);
    res.status(201).json(newEmployee);

    next();
};

export const fireEmployee = (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const updateData = req.body;

    let item;

    for (var i = 0; i < EMPLOYEES.length; i++) {
        if (EMPLOYEES[i].id === id) {
            for (var key in updateData) {
                EMPLOYEES[i][key] = updateData[key];
            }
            item = EMPLOYEES[i];
            break;
        }
    }

    res.status(200).json(item);
    next();
};

export const deleteEmployee = (req, res, next) => {
    const id = parseInt(req.params.id, 10);

    EMPLOYEES = EMPLOYEES.filter((item) => {
        if (item.id !== id) {
            return true;
        }
        return false;
    });

    res.json({ message: "Employee has been removed." });
    next();
};
