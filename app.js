const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const postsRouter = require("./routers/postsRouter.js");
const categoriesRouter = require("./routers/categoriesRouter.js");
const tagsRouter = require("./routers/tagsRouter.js");
const authRouter = require("./routers/authRouter.js");
const notFoundHandler = require("./middlewares/notFoundHandle.js");
const errorHandler = require("./middlewares/errorHandler.js");

//middlewares generici
app.use(express.json());

app.use("/auth", authRouter);

//Rotte
app.get("/", (req, res) => {
    res.send("<h1>Benvenuto nel blog!</h1>");
});

app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);

//middlewares per la gestione degli errori
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
