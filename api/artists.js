const express = require('express');
const artistRouter = express.Router();
const sqlite = require('sqlite3');
const db = process.env.TEST_DATABASE || sqlite.Database('database.sqlite');

artistRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM db WHERE is_currently_employed = 1)', (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.body = rows;
            res.send(200);
        }
    });
});


module.exports = artistRouter;