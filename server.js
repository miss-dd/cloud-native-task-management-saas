require('dotenv').config();

const express = require('express');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'task-api',
        time: new Date()
    });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);


app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});