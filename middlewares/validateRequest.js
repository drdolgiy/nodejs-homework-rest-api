const createErrors = require('http-errors');

const  validateRequest = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body)
if (error) {
          next(createErrors(400, 'error'))  
        }
        next()
    }
}

module.exports = {
    validateRequest
}