export const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        res.json({ status: "-1", message: "Bad Request" });
    }
};
