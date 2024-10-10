const express = require("express");
const router = express.Router();

const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/categoriesCRUD.js");
const validator = require("../middlewares/validator.js");
const bodyData = require("../validations/categories.js");
const authenticateToken = require("../middlewares/auth.js");

router.use(authenticateToken);

//Rotte
router.get("/", index);
router.post("/", validator(bodyData), store);
router.get("/:id", show);
router.put("/:id", validator(bodyData), update);
router.delete("/:id", destroy);

module.exports = router;
