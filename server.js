const body-parser = require('body-parser');
const cors = require('cors');
const errorhandler = require('errorhandler');
const morgan = require('morgan');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

import apiRouter from './api';
app.use(apiRouter, '/api');

//** /api/artists **
//GET   - Returns a 200 response containing all saved currently 
//      - employed artists(`is_currently_employed` is equal to`1`) on the`artists` property of the response body
//POST  - Creates a new artist with the information from the`artist` property of the request body and saves it to the database.Returns a 201 response with the newly 
//      - created artist on the`artist` property of the response body
//      - If any required fields are missing, returns a 400 response

apiRouter.get('/artists', (req, res, next) => {
    try {
        res.body.artists = db.all('SELECT * FROM Artist WHERE is_currently_employed = 1');
        res.send(200);
    } catch (err) {
        next(err);
    }
});

apiRouter.post('/artists', (req, res, next) => {
    try {
        const newArtist = req.body.artist;
        db.run('INSERT INTO Artist(id int, name text, date_of_birth text, biography text, is_currently_employed int) VALUES ($newArtist.id, $newArtist.name, $newArtist.date_of_birth, $newArtist.biography, $newArtist.is_currently_employed)',
            {
                $id: newArtist.id,
                $name: newArtist.name,
                $date_of_birth: newArtist.date_of_birth,
                $biography: newArtist.biography,
                $is_currently_employed: newArtist.is_currently_employed
            });

        res.body.artist = newArtist;
        if (newArtist && newArtist.id && newArtist.name && newArtist.)
        res.send(200);
    } catch (err) {
        next(err);
    }
});

//** /api/artists /: artistId **
//GET   -Returns a 200 response containing the artist with the supplied artist ID on the`artist` property of the response body
//      - If an artist with the supplied artist ID doesn't exist, returns a 404 response
//PUT   - Updates the artist with the specified artist ID using the information from the`artist` property of the request body and saves it to the database.Returns a 200 response with the updated artist on the`artist` property of the response body
//      - If any required fields are missing, returns a 400 response
//      - If an artist with the supplied artist ID doesn't exist, returns a 404 response
//DELETE- Updates the artist with the specified artist ID to be unemployed(`is_currently_employed` equal to`0`).Returns a 200 response.
//      - If an artist with the supplied artist ID doesn't exist, returns a 404 response

app.get('/api/artists/:artistId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.get('SELECT * FROM Artist WHERE id = $id', { $id: req.params.id }, (err, row) => {
            if (err) {
                responseCode = 404;
            };
            res.body.artists = row;
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.put('/api/artists/:artistId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.run('UPDATE Artist SET id = $id', { $id: req.params.id }, (err, row) => {
            if (err) {
                responseCode = 404;
            };
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/api/artists/:artistId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.run('UPDATE Artist SET is_currently employed = 0', (err, row) => {
            if (err) {
                responseCode = 404;
            } else if (!row.id || !row.name || !row.date_of_birth || !row.biography || !is_currently_employed) {
                responesCode = 400;
            };
            res.body.artists = row;
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});


//** /api/series **
//GET    - Returns a 200 response containing all saved series on the`series` property of the response body
//POST   - Creates a new series with the information from the`series` property of the request body and saves it to the database.Returns a 201 response with the newly 
//       - created series on the`series` property of the response body
//       - If any required fields are missing, returns a 400 response

app.get('/api/series', (req, res, next) => {
    let responseCode = 200;
    try {
        db.all('SELECT * FROM Series', (err, rows) => {
            if (err) {
                responseCode = 404;
            };
            res.body.series = row;
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.post('/api/series', (req, res, next) => {
    let responseCode = 201;
    try {
        db.run('INSERT INTO Series(id, name, description) VALUES ($id, $name, $description)',
            {
                $id: req.body.series.id,
                $name: req.body.series.name,
                $description: req.body.series.description
            });
        if (!req.body.series.id || !req.body.series.name || !req.body.series.description) {
            responseCode = 400;
        }
        res.body.series = req.body.series;
        res.send(responseCode);
    } catch (err) {
        next(err);
    }
});

//** /api/series /: seriesId **
//GET    - Returns a 200 response containing the series with the supplied series ID on the`series` property of the response body
//       - If a series with the supplied series ID doesn't exist, returns a 404 response
//PUT    - Updates the series with the specified series ID using the information from the`series` property of the request body and saves it to the database.Returns a 200 response with the updated series on the`series` property of the response body
//       - If any required fields are missing, returns a 400 response
//       - If a series with the supplied series ID doesn't exist, returns a 404 response
//DELETE - Deletes the series with the supplied series ID from the database if that series has no related issues.Returns a 204 response.
//       - If the series with the supplied series ID has related issues, returns a 400 response.
//       - If a series with the supplied series ID doesn't exist, returns a 404 response

app.get('/api/series/:seriesId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.get('SELECT * FROM Series WHERE id = $id', { $id: req.params.id }, (err, row) => {
            if (err) {
                responseCode = 404;
            };
            res.body.artists = row;
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.put('/api/series/:seriesId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.run('UPDATE Series SET name = $name, description = $description WHERE id = $id', { $id: req.params.id, $name: req.body.series.name, $description: req.body.series.description }, (err, row) => {
            if (err) {
                responseCode = 404;
            };
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/api/artists/:artistId', (req, res, next) => {
    let responseCode = 204;
    try {
        if (/*no related issues*/){
            db.run('DELETE FROM Series WHERE id = $id', { $id: req.params.id }, (err, row) => {
            if (err) {
                responseCode = 404;
            });
        } else {
            responseCode = 400;
        }
        res.send(responseCode);
    } catch (err) {
        next(err);
    }
});

//** /api/series /: seriesId / issues **
//GET    - Returns a 200 response containing all saved issues related to the series with the supplied series ID on the`issues` property of the response body
//       - If a series with the supplied series ID doesn't exist, returns a 404 response
//POST   - Creates a new issue, related to the series with the supplied series ID, with the information from the`issue` property of the request body and saves it to the database.Returns a 201 response with the newly - created issue on the`issue` property of the response body
//       - If any required fields are missing or an artist with the supplied artist ID doesn't exist, returns a 400 response
//       - If a series with the supplied series ID doesn't exist, returns a 404 response

app.get('/api/series', (req, res, next) => {
    let responseCode = 200;
    try {
        db.all('SELECT * FROM Series', (err, rows) => {
            if (err) {
                responseCode = 404;
            };
            res.body.series = row;
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.post('/api/series', (req, res, next) => {
    let responseCode = 201;
    try {
        db.run('INSERT INTO Series(id, name, description) VALUES ($id, $name, $description)',
            {
                $id: req.body.series.id,
                $name: req.body.series.name,
                $description: req.body.series.description
            });
        if (!req.body.series.id || !req.body.series.name || !req.body.series.description) {
            responseCode = 400;
        }
        res.body.series = req.body.series;
        res.send(responseCode);
    } catch (err) {
        next(err);
    }
});

//** /api/series /: seriesId / issues /: issueId **
//PUT    - Updates the issue with the specified issue ID using the information from the`issue` property of the request body and saves it to the database.Returns a 200 response with the updated issue on the`issue` property of the response body
//       - If any required fields are missing, returns a 400 response
//       - If a series with the supplied series ID doesn't exist, returns a 404 response
//       - If an issue with the supplied issue ID doesn't exist, returns a 404 response
//DELETE - Deletes the issue with the supplied issue ID from the database.Returns a 204 response.
//       - If a series with the supplied series ID doesn't exist, returns a 404 response
//       - If an issue with the supplied issue ID doesn't exist, returns a 404 response

app.put('/api/series/:seriesId/issues/:issueId', (req, res, next) => {
    let responseCode = 200;
    try {
        db.run('UPDATE Issue SET name = $name, issue_number = $issue_number, publication_date = $publication_date, artist_id = $artist_id, series_id = $series_id WHERE id = $id',
            {
                $id: req.params.id,
                $issue_number: req.body.issue.issue_number,
                $publication_date: req.body.issue.publication_date,
                $artist_id: req.body.issue.artist_id,
                $series_id: req.body.issue.series_id,
                
            }, (err, row) => {
            if (err) {
                responseCode = 404;
            };
            res.send(responseCode);
        });
    } catch (err) {
        next(err);
    }
});

app.delete('/api/series/:seriesId/issues/:issueId', (req, res, next) => {
    let responseCode = 204;
    try {
        db.run('DELETE FROM Issue WHERE id = $id', { $id: req.params.id }, (err, row) => {
            if (err) {
                responseCode = 404;
            }
        });
        res.send(responseCode);
    } catch (err) {
        next(err);
    }
});








app.listen(port);