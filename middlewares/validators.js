'use strict';

(async () => {
    const responseFormatter = require('../utils/responseFormatter');

    const validator = (schema) => async (req, res, next) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params
            });
            return next();
        } catch (err) {
            return res.status(400).json(responseFormatter.responseFormatter({ type: err.name, message: err.message }, err.message, 'Bad request.', 400));
        }
    };

    module.exports = validator;
})();