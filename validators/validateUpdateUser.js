'use strict';

(async () => {
    const yup = require('yup');

    const updateUserSchema = yup.object({
        body: yup.object({
            firstName: yup.string().optional(),
            lastName: yup.string().optional(),
            mobileNo: yup.string().optional().length(10),
            address: yup.string().optional(),
            email: yup.string().email().optional()
        })
    });

    module.exports = updateUserSchema;
})();