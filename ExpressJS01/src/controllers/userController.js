const { createUserService, loginService, getUserService, forgotPasswordService } = require("../services/userService");
const { sendResetPasswordEmail } = require('../services/emailService');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Register
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if email exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(422).json({
            success: false,
            code: 422,
            message: "Email đã tồn tại",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }

    const result = await createUserService(name, email, password);

    if (result) {
        return res.status(201).json({
            success: true,
            code: 201,
            message: "Đăng ký thành công",
            data: { id: result.id, name: result.name, email: result.email, role: result.role },
            timestamp: Math.floor(Date.now() / 1000),
        });
    }
    return res.status(500).json({
        success: false,
        code: 500,
        message: "Lỗi khi tạo tài khoản",
        data: null,
        timestamp: Math.floor(Date.now() / 1000),
    });
};

// Login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    if (data && data.EC === 0) {
        return res.status(200).json({
            success: true,
            code: 200,
            message: data.EM,
            data: { token: data.token, user: data.user },
            timestamp: Math.floor(Date.now() / 1000),
        });
    }
    return res.status(401).json({
        success: false,
        code: 401,
        message: data?.EM ?? "Đăng nhập thất bại",
        data: null,
        timestamp: Math.floor(Date.now() / 1000),
    });
};

// Get all users
const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json({
        success: true,
        code: 200,
        message: "Lấy danh sách user thành công",
        data: data,
        timestamp: Math.floor(Date.now() / 1000),
    });
};

// Get current account info from JWT
const getAccount = async (req, res) => {
    return res.status(200).json({
        success: true,
        code: 200,
        message: "Lấy thông tin tài khoản thành công",
        data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
        },
        timestamp: Math.floor(Date.now() / 1000),
    });
};

// Forgot Password - Gửi Link Đổi Mật Khẩu
const handleForgotPassword = async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            success: false,
            code: 404,
            message: "Email không tồn tại",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }

    try {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        await sendResetPasswordEmail(email, token);
        return res.status(200).json({
            success: true,
            code: 200,
            message: "Link đặt lại mật khẩu đã được gửi đến email của bạn",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    } catch (error) {
        console.error("handleForgotPassword error:", error);
        return res.status(500).json({
            success: false,
            code: 500,
            message: "Lỗi khi gửi email",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }
};

// Reset Password - Xác minh token và đổi mật khẩu
const handleResetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;
        
        const data = await forgotPasswordService(email, newPassword);

        if (data && data.EC === 0) {
            return res.status(200).json({
                success: true,
                code: 200,
                message: data.EM,
                data: null,
                timestamp: Math.floor(Date.now() / 1000),
            });
        }
        return res.status(422).json({
            success: false,
            code: 422,
            message: data?.EM ?? "Có lỗi xảy ra",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            code: 400,
            message: "Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn",
            data: null,
            timestamp: Math.floor(Date.now() / 1000),
        });
    }
};

module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount,
    handleForgotPassword,
    handleResetPassword
};
