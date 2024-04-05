'use strict';

(async () => {
    const yup = require('yup');

    const registrationSchema = yup.object({
        body: yup.object({
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            mobileNo: yup.string().required().length(10),
            address: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(8).required()
        })
    });

    module.exports = registrationSchema;
})();