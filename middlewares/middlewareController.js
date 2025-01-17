const jwt = require("jsonwebtoken");

const middlewareController = {
    //verify token
    verifyToken:(req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You are not authenticated!");
        }
    },

    verifytokenAndAdinAuth:(req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin) {
                next();
            } else {
                return res.status(403).json("You are not allowed to delete this user!");
            }
        });
    },
}

module.exports = middlewareController