const db = require("../models");
const Op = db.Sequelize.Op

const Ticket = db.Ticket
const State = db.State
const Department = db.Department

exports.create = (req, res) => {
    console.log("inside ticket.controller.js create")

    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        id_department: req.body.id_department,
        created_by: req.user.id,
        updated_by: req.user.id,
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

    Ticket.findByPk(id)
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

    const { id_department, admin, text, states, page = 1, limit = 2 } = req.body; // Filters and pagination

    try {
        let conditions = {};

        if (!admin) {
            // Non-admin users can only see tickets from their department
            console.log("here")
            conditions.id_department = id_department;
        }

        // Filter by states if provided
        if (states && states.length > 0) {
            conditions.id_state = states; // Assumes states is an array of IDs
        }

        // Text search on title or description
        if (text) {
            conditions[Op.or] = [
                { title: { [Op.like]: `%${text}%` } },
                { description: { [Op.like]: `%${text}%` } }
            ];
        }

        const options = {
            where: conditions,
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
                res.send({
                    tickets: data,
                    pagination: { page, limit }
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Some error occurred while retrieving all tickets." });
            });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
};