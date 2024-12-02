export const validatorMiddleware = (schema) => {
    return(req, res, next) =>{
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({"validation Error": error.details[0].message})
        }
        next()
    }
}