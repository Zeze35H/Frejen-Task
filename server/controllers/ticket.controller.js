const db = require("../models");
const Op = db.Sequelize.Op

const Ticket = db.Ticket
const User = db.User
const State = db.State
const Department = db.Department

exports.create = (req, res) => {
    console.log("inside ticket.controller.js create")

    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        id_department: req.body.department,
        created_by: req.body.id,
        updated_by: req.body.id,
        id_state: 1, // Default to "Pending"
        created_at: new Date(),
        updated_at: new Date(),
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating a ticket." });
        });
}

// Find a single User with an id
exports.findOne = (req, res) => {
    console.log("inside ticket.controller.js findOne")
    const id = req.params.id;

    Ticket.findByPk(id, {
        include: [
            { model: User, as: 'creator', attributes: ['name'] },
            { model: User, as: 'updater', attributes: ['name'] },
            { model: State, as: 'state', attributes: ['title'] },
            { model: Department, as: 'department', attributes: ['title'] },
        ],
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Ticket with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Ticket with id=${id}. ${err}`,
            });
        });
};

// exports.findAll = (req, res) => {
//     console.log("inside ticket.controller.js find")

//     Ticket.findAll({
//         include: [
//             { model: State, as: 'state', attributes: ['title'] },
//             { model: Department, as: 'department', attributes: ['title'] },
//         ],
//         order: [['updated_at', 'DESC']],
//     })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message || "Some error occurred while retrieving all tickets." });
//         });
// }

exports.getTickets = (req, res) => {
    console.log("inside ticket.controller.js getTickets")

    const { id_user, id_department, admin, text, states, page = 1, limit = 2 } = req.body; // Filters and pagination

    try {
        const conditions = [];

        // Add department and creator filter for non-admin users
        if (!admin) {
            conditions.push({
                [Op.or]: [
                    { id_department: id_department },
                    { created_by: id_user },
                ],
            });
        }

        // Add text search filter
        if (text) {
            conditions.push({
                [Op.or]: [
                    { title: { [Op.like]: `%${text}%` } },
                    { description: { [Op.like]: `%${text}%` } },
                ],
            });
        }

        // Add state filter if provided
        if (states && states.length > 0) {
            conditions.push({
                id_state: states,
            });
        }

        const options = {
            where: { [Op.and]: conditions },
            include: [
                { model: State, as: 'state', attributes: ['title'] },
                { model: Department, as: 'department', attributes: ['title'] },
            ],
            order: [['updated_at', 'DESC']],
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        };

        Ticket.findAll(options)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving all tickets." });
            });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
};

exports.update = (req, res) => {
    const id = req.params.id;

    Ticket.findByPk(id)
        .then(data => {
            if (data) {
                if ([2, 4].includes(data.id_state)) {
                    res.send({
                        success: false,
                        message: `Cannot update Ticket with id ${id}. It is already rejected or completed.`,
                    });
                }
                else {

                    let new_data = {
                        id_state: req.body.id_state,
                        updated_at: new Date(),
                        updated_by: req.body.id_user,
                        observations: req.body.observations
                    };

                    Ticket.update(new_data, {
                        where: { id: id },
                    })
                        .then((num) => {
                            if (num == 1) {
                                res.send({
                                    success: true,
                                    message: "Ticket was updated successfully!",
                                });
                            } else {
                                res.send({
                                    success: false,
                                    message: `Cannot update Ticket with id ${id}.`,
                                });
                            }
                        })
                        .catch((err) => {
                            res.status(500).send({
                                success: false,
                                message: `Error updating Ticket with id ${id}. ${err}`,
                            });
                        });
                }
            }
            else {
                res.status(404).send({
                    message: `Cannot find Ticket with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Ticket with id=${id}. ${err}`,
            });
        });

};