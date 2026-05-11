const express = require('express');
const cors = require('cors');
const path = require('path');

const configViewEngine = (app) => {
    // Enable CORS
    app.use(cors());
    // Parse JSON body
    app.use(express.json());
    // Parse URL-encoded body
    app.use(express.urlencoded({ extended: true }));

    // config template engine
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');
    
    // config static files
    app.use(express.static(path.join('./src', 'public')));
};

module.exports = configViewEngine;
