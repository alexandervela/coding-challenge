const express = require("express");
const router = express.Router();
const wallController = require("../controllers/wallController")

router.get("/walls", wallController.index);
router.get("/walls/new", wallController.new);
router.post("/walls/create", wallController.create);
router.get("/walls/:id", wallController.show);

module.exports = router;