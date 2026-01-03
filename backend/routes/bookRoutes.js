const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookcontroller");

router.post("/", controller.createBook);
router.get("/", controller.getAllBooks);
router.get("/category/:category", controller.getBooksByCategory);
router.get("/after2015", controller.getBooksAfter2015);
router.put("/copies/:id", controller.updateCopies);
router.put("/category/:id", controller.changeCategory);
router.delete("/:id", controller.deleteIfZero);

module.exports = router;
