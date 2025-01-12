module.exports = app => {
    const ticket = require("../controllers/ticket.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/create", ticket.create);

    // Get a ticket
    router.get("/ticket/:id", ticket.findOne)

    // Get all tickets
    router.post("/findAll", ticket.getTickets);


    app.use('/api/tickets', router);
};