export const auth = (req, res, next) => {
    console.log("Auth middleware");
    next();
    return;
};