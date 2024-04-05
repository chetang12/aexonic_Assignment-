'use strict';

(async () => {
    const yup = require('yup');

    const searchUsersSchema = yup.object({
        query: yup.object({
            searchText: yup.string().required(),
            skip: yup.number().required(),
            limit: yup.number().required()
        })
    });

    module.exports = searchUsersSchema;
})();