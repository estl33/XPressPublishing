const express = require('express');
const apiRouter = express.Router();
import artistRouter from './api/artists.js';



app.use(artistRouter, '/artists');
app.use(apiRouter, '/api');






module.exports = apiRouter;