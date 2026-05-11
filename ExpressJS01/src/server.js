require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const { connectDB } = require('./config/database');
const routerAPI = require('./routes/api');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 8080;

// Configure middleware
configViewEngine(app);

// Auth middleware
app.use(auth);

// API routes
app.use('/v1/api', routerAPI);

const { getHomepage } = require('./controllers/homeController');

// Home route
app.get('/', getHomepage);

// Connect to DB and start server
(async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`>>> Server is running on http://localhost:${port}`);
    });
})();
