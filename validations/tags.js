const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il tag non può essere vuoto",
            bail: true,
        },
        isString: {
            errorMessage: "Il tag deve essere una stringa",
            bail: true,
        },
        isLength: {
            errorMessage: "Il tag deve avere almeno 4 caratteri",
            options: { min: 4 },
        },
    },
};

module.exports = bodyData;
