const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('>>> MySQL connected successfully');
        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('>>> All models synced');
    } catch (error) {
        console.error('>>> Error connecting to MySQL:', error.message);
    }
};

module.exports = { sequelize, connectDB };
