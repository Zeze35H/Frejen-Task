const db = require("../models");
const State = db.State

exports.findAll = (req, res) => {
    console.log("inside state.controller.js findAll")

    State.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving all states." });
        });
}