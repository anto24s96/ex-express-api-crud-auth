const { PrismaClient } = require("@prisma/client");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/password");
const createError = require("../utils/createError.js");
const errorHandler = require("../middlewares/errorHandler");
const prisma = new PrismaClient();

const register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password),
        };

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name,
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw createError("Email o password errati", 400);
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw createError("Email o password errati", 400);
        }

        const token = generateToken({
            email: user.email,
            name: user.name,
        });

        delete user.id;
        delete user.password;

        res.json({ token, data: user });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

module.exports = {
    register,
    login,
};
