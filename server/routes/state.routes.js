module.exports = app => {
    const states = require("../controllers/state.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.get("/", states.findAll);


    app.use('/api/states', router);
};