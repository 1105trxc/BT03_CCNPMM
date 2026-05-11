const express = require('express');
const { createUser, handleLogin, getUser, getAccount, handleForgotPassword, handleResetPassword } = require('../controllers/userController');
const routerAPI = express.Router();

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.post("/forgot-password", handleForgotPassword);
routerAPI.post("/reset-password", handleResetPassword);
routerAPI.get("/user", getUser);
routerAPI.get("/account", getAccount);

module.exports = routerAPI;
