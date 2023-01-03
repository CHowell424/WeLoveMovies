const router = require("express").Router({ mergeParams: true });
const controller=require("./reviews.contoller")
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports= router;