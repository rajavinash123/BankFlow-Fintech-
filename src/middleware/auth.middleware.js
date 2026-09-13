const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
    try {
        // 1. Cookie se token nikalo
        // 2. Agar cookie me token nahi hai,
        //    to Authorization header se token nikalo

        const token =
            req.cookies.token ||
            req.headers.authorization?.split(" ")[1];

        // Token nahi mila
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user. Token is required for accessing protected data"
            });
        }

        // JWT verify karo
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // JWT se user ID nikalo
        const userId = decode.id;

        // Database se current user find karo
        const user = await userModel.findById(userId);

        // User database me exist nahi karta
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // User ko request object me attach karo
        req.user = user;

        // Request ko next middleware/controller ke paas bhejo
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;