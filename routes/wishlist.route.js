const express = require("express");
const controller = require("../controllers/wishlist.controller");
const authToken = require("../middleware/auth-token");
const router = express.Router();

router.get("/", authToken, controller.all);
router.get("/view/:bookId", authToken, controller.view);
router.post("/create", authToken, controller.create);
router.delete("/delete/:id", authToken, controller.delete);

module.exports = router;
