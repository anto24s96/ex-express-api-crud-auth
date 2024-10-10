const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il titolo non può essere vuoto",
            bail: true,
        },
        isString: {
            errorMessage: "Il titolo deve essere una stringa",
            bail: true,
        },
        isLength: {
            errorMessage: "Il titolo deve avere almeno 4 caratteri",
            options: { min: 4 },
        },
    },
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il contenuto è obbligatorio",
            bail: true,
        },
        isString: {
            errorMessage: "Il contenuto deve essere una stringa",
        },
    },
    published: {
        in: ["body"],
        isBoolean: {
            errorMessage: "Deve essere un valore booleano",
        },
    },
    categoryId: {
        in: ["body"],
        isInt: {
            errorMessage: "La categoria deve essere un numero intero",
            bail: true,
        },
        custom: {
            options: async (value) => {
                const categoryId = parseInt(value);
                const category = await prisma.category.findUnique({
                    where: { id: categoryId },
                });
                if (!category) {
                    throw new Error(`Nessuna categoria con id: ${categoryId}`);
                }
                return true;
            },
        },
    },
    tags: {
        in: ["body"],
        isArray: {
            errorMessage: "Tags deve essere un array",
            bail: true,
        },
        custom: {
            options: async (ids) => {
                if (ids.length === 0) {
                    throw new Error("Il post deve avere almeno un tag");
                }
                const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
                if (notIntegerId) {
                    throw new Error("Uno o più ID non sono numeri numerici");
                }

                const tags = await prisma.tag.findMany({
                    where: { id: { in: ids } },
                });
                if (tags.length !== ids.length) {
                    throw new Error("Uno o piu tag specificati non esistono");
                }
                return true;
            },
        },
    },
};
module.exports = bodyData;
