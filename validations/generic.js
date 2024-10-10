const paramSlug = {
    slug: {
        in: ["params"],
        isString: {
            errorMessage: "Lo Slug deve essere una stringa.",
        },
        custom: {
            options: (value) => {
                if (/^\d+$/.test(value)) {
                    throw new Error("Lo Slug non può contenere solo numeri.");
                }
                return true;
            },
        },
    },
};

module.exports = paramSlug;
