const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Authentication Invalid",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            user_id: payload.user_id,
            role_id: payload.role_id,
            email: payload.email,
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication Invalid",
            error: error,
        });
    }
}

module.exports = checkAuth
