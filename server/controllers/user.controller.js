const db = require("../models");

const User = db.User
const Department = db.Department

const bcrypt = require('bcrypt');

// Find a single User with an id
exports.findOne = (req, res) => {
    console.log("inside user.controller.js findOne")
    const id = req.params.id;

    User.findByPk(id, {
        // include: [
        //     { model: Department, as: 'department', attributes: ['title'] },
        // ],
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving User with id=${id}. ${err}`,
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    let new_data = {
        name: req.body.name,
        password: req.body.password,
        id_department: req.body.department,
    };

    const updateUser = (updatedData) => {
        User.update(updatedData, {
            where: { id: id },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        success: true,
                        message: "User was updated successfully.",
                    });
                } else {
                    res.send({
                        success: false,
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    success: false,
                    message: `Error updating User with id=${id}. ${err}`,
                });
            });
    };

    if (new_data.password) {
        bcrypt.hash(new_data.password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while hashing the password.",
                });
            }
            new_data.password = hashedPassword;
            updateUser(new_data); // Call the update function after password is hashed
        });
    } else {
        delete new_data.password;
        updateUser(new_data);
    }
};
