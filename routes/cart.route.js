const express = require("express");
const controller = require("../controllers/cart.controller");
const authToken = require("../middleware/auth-token");

const router = express.Router();

router.get("/", authToken, controller.all);
router.post("/create", authToken, controller.create);
router.put("/update/:id", authToken, controller.update);
router.delete("/delete/:id", authToken, controller.delete);

module.exports = router;
