const express = require("express");
const router = express.Router();

const {
    index,
    store,
    show,
    update,
    destroy,
} = require("../controllers/postsCRUD.js");
const validator = require("../middlewares/validator.js");
const paramSlug = require("../validations/generic.js");
const bodyData = require("../validations/posts.js");
const authenticateToken = require("../middlewares/auth.js");

router.use(authenticateToken);

//Rotte
router.get("/", index);
router.post("/", validator(bodyData), store);

router.use("/:slug", validator(paramSlug));

router.get("/:slug", show);
router.put("/:slug", validator(bodyData), update);
router.delete("/:slug", destroy);

module.exports = router;
