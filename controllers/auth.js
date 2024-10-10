const { PrismaClient } = require("@prisma/client");
const generateToken = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/password");
const createError = require("../utils/createError.js");
const errorHandler = require("../middlewares/errorHandler");
const prisma = new PrismaClient();

const register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
            },
        });

        const data = {
            id: user.id,
            email,
            name,
        };

        const token = generateToken({ data });

        res.json({ token, data });
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

        const data = {
            id: user.id,
            email: user.email,
            name: user.name,
        };

        const token = generateToken({ data });

        res.json({ token, data });
    } catch (error) {
        errorHandler(error, req, res);
    }
};

module.exports = {
    register,
    login,
};
