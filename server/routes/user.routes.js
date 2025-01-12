module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Get a user
    router.get("/:id", users.findOne)

    // Update a user
    router.post("/update/:id", users.update)

    app.use('/api/users', router);
};