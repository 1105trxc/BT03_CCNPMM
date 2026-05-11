require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

// Register
const createUserService = async (name, email, password) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return null;
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "User"
        });
        return result;
    } catch (error) {
        console.error("createUserService error:", error);
        return null;
    }
};

// Login
const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return { EC: 1, EM: "Email không tồn tại" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { EC: 2, EM: "Mật khẩu không đúng" };
        }

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        return {
            EC: 0,
            EM: "Đăng nhập thành công",
            token: token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        };
    } catch (error) {
        console.error("loginService error:", error);
        return null;
    }
};

// Get all users
const getUserService = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role'],
        });
        return users;
    } catch (error) {
        console.error("getUserService error:", error);
        return null;
    }
};

// Forgot Password
const forgotPasswordService = async (email, newPassword) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return { EC: 1, EM: "Email không tồn tại" };

        const hashPassword = await bcrypt.hash(newPassword, saltRounds);
        await User.update({ password: hashPassword }, { where: { email } });
        return { EC: 0, EM: "Cập nhật mật khẩu thành công" };
    } catch (error) {
        console.error("forgotPasswordService error:", error);
        return null;
    }
};

module.exports = {
    createUserService,
    loginService,
    getUserService,
    forgotPasswordService
};
