const express = require("express");
const router = express.Router();

const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../controllers/tagsCRUD.js");
const validator = require("../middlewares/validator.js");
const bodyData = require("../validations/tags.js");

//Rotte
router.get("/", index);
router.post("/", validator(bodyData), store);
router.get("/:id", show);
router.put("/:id", validator(bodyData), update);
router.delete("/:id", destroy);

module.exports = router;
