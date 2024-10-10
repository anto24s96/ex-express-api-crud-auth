const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il nome non può essere vuoto",
            bail: true,
        },
        isString: {
            errorMessage: "Il nome deve essere una stringa",
            bail: true,
        },
        isLength: {
            errorMessage: "Il nome deve avere almeno 4 caratteri",
            options: { min: 4 },
        },
    },
};

module.exports = bodyData;
