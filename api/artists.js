const express = require('express');
const artistRouter = express.Router();
const sqlite = require('sqlite3');
const db = process.env.TEST_DATABASE || sqlite.Database('database.sqlite');

/*GET*/

artistRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM db WHERE is_currently_employed = 1)', (err, rows) => {
        if (err) {
            errorhandler(err);
        } else {
            res.body = rows;
            res.send(200);
        }
    });
});

artistRouter.get('/:artistId', (req, res, next) => {
    db.get('SELECT * FROM db WHERE id = $id)', { $id: req.params.id }, (err, rows) => {
        if (err) {
            next(err);
        } else if (row) {
            req.artist = row;
            next();
        }
        else {
            res.send(404);
        }
    });
});

artistRouter.get('/:artistId', (req, res, next) => {
    res.body = req.artist;
    res.send(200);
});

/*POST*/

artistRouter.post('/', (req, res, next) => {
    if (!(req.artist.name && req.artist.dateOfBirth && req.artist.biography)) {
        res.send(400);
    } else if (req.artist.is_currently_employed !== 1) {
        req.artist.is_currently_employed = 1;
    }
    db.run('INSERT INTO Artist VALUES ($name, $dateOfBirth, $biography)',
        {
            $name: req.artist.name,
            $dateOfBirth: req.artist.dateOfBirth,
            $biography: req.artist.biography
        }, (err, row) => {
            if (err) {
                errorhandler(err);
            } else {
                db.get('SELECT * FROM Artist WHERE id = $id', { $id = this.lastID }, (err, row) => {
                    res.send(row);
                    res.send(201);
                });
            }
        });
});









module.exports = artistRouter;