const db = require("../models");
const Department = db.Department

exports.findAll = (req, res) => {
    console.log("inside department.controller.js findAll")

    Department.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving all departments." });
        });
}