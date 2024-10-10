const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const index = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();

        if (!categories.length === 0) {
            return res
                .status(404)
                .json({ message: "Nessuna categoria trovata" });
        }

        res.status(200).json({
            message: `Categorie trovate: ${categories.length}`,
            categories,
        });
    } catch (error) {
        next(error);
    }
};

const show = async (req, res, next) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({
                message: `Nessuna categoria trovata con questo ID: ${id}`,
            });
        }

        res.status(200).json({ message: "Categoria trovata", category });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            message: "Categoria creata correttamente",
            category,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res.status(404).json({ message: "Categoria non trovata" });
        }

        const updateData = {};

        if (name) {
            updateData.name = name;
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: updateData,
        });
        res.status(200).json({
            message: "Categoria aggiornata correttamente",
            category: updatedCategory,
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return res
                .status(404)
                .json({ message: "Nessuna categoria trovata" });
        }

        await prisma.category.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            message: "Categoria eliminata correttamente",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
