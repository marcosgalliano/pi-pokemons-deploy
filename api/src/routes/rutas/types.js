const { Router } = require("express");
const getTypes = require("../../handlers/getTypes");

const typeRouter = Router();

// route de type
typeRouter.get("/", getTypes);

module.exports = typeRouter;
