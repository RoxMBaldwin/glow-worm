const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./glow-worm-data.db');

db.run('CREATE TABLE crawls(domain text, username text, usesViewTool boolean, company text)');

db.close();