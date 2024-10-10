const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createError = require("../utils/createError.js");

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email è un campo obbligatorio",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email deve essere una mail valida",
            bail: true,
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value },
                });
                if (user) {
                    throw createError(
                        "User associato a questa email è già presente",
                        400
                    );
                }
                return true;
            },
        },
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name deve essere una stringa",
            bail: true,
        },
        isLength: {
            errorMessage: "Name deve avere almeno 3 caratteri",
            options: { min: 3 },
        },
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password è un campo obbligatorio",
            bail: true,
        },
        isString: {
            errorMessage: "Password deve essere una stringa",
            bail: true,
        },
        isLength: {
            errorMessage: "Password deve avere almeno 8 caratteri",
            options: { min: 8 },
        },
    },
};

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email è un campo obbligatorio",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email deve essere una mail valida",
        },
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password è un campo obbligatorio",
            bail: true,
        },
        isString: {
            errorMessage: "Password deve essere una stringa",
        },
    },
};

module.exports = {
    registerBody,
    loginBody,
};
