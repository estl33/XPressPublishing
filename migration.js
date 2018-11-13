const sqlite = require('sqlite3');
const db = sqlite.Database('database.sqlite');

db.run('CREATE TABLE Artist(id int required, name text required, date_of_birth text required, biography text required, is_currently_employed int 1)');
