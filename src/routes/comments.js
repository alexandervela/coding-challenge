const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const validation = require("./validation");

router.get("/walls/:wallId/comments/new", commentController.new);
router.post("/walls/:wallId/comments/create", validation.validateComments, commentController.create);
router.get("/walls/:wallId/comments/:id", commentController.show);

module.exports = router;