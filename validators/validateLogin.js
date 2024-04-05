'use strict';

(async () => {
    const yup = require('yup');

    const loginSchema = yup.object({
        body: yup.object({
            email: yup.string().email().required(),
            password: yup.string().min(8).required()
        })
    });

    module.exports = loginSchema;
})();