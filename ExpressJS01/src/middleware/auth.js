const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const whiteList = ['/', '/v1/api/register', '/v1/api/login', '/v1/api/forgot-password', '/v1/api/reset-password'];

    if (whiteList.includes(req.originalUrl)) {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Chưa cung cấp token xác thực",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            code: 401,
            message: "Token không hợp lệ hoặc đã hết hạn",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }
};

module.exports = auth;
