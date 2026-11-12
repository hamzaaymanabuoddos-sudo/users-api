const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

// يحول JSON القادم في body الطلب إلى كائن JavaScript داخل req.body
app.use(express.json());

// كل مسار يبدأ بـ /users يذهب إلى userRoutes
app.use('/users', userRoutes);

module.exports = app;
