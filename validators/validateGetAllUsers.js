'use strict';

(async () => {
    const yup = require('yup');

    const getAllUsersSchema = yup.object({
        query: yup.object({
            skip: yup.number().required(),
            limit: yup.number().required()
        })
    });

    module.exports = getAllUsersSchema;
})();