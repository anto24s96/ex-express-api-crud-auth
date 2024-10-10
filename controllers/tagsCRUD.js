const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const index = async (req, res, next) => {
    try {
        const tags = await prisma.tag.findMany();

        if (!tags.length === 0) {
            return res.status(404).json({ message: "Nessun tag trovato" });
        }

        res.status(200).json({
            message: `Tags trovati: ${tags.length}`,
            tags,
        });
    } catch (error) {
        next(error);
    }
};

const show = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tag = await prisma.tag.findUnique({
            where: { id: Number(id) },
        });

        if (!tag) {
            return res.status(404).json({
                message: `Nessun tag trovato con questo ID: ${id}`,
            });
        }

        res.status(200).json({ message: "Tag trovato", tag });
    } catch (error) {
        next(error);
    }
};

const store = async (req, res, next) => {
    const { name } = req.body;

    try {
        const tag = await prisma.tag.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            message: "Tag creato correttamente",
            tag,
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const tag = await prisma.tag.findUnique({
            where: { id: Number(id) },
        });

        if (!tag) {
            return res.status(404).json({ message: "Tag non trovato" });
        }

        const updateData = {};

        if (name) {
            updateData.name = name;
        }

        const updatedTag = await prisma.tag.update({
            where: { id: Number(id) },
            data: updateData,
        });
        res.status(200).json({
            message: "Tag aggiornato correttamente",
            tag: updatedTag,
        });
    } catch (error) {
        next(error);
    }
};

const destroy = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tag = await prisma.tag.findUnique({
            where: { id: Number(id) },
        });

        if (!tag) {
            return res.status(404).json({ message: "Nessun tag trovato" });
        }

        await prisma.tag.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({
            message: "Tag eliminato correttamente",
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
