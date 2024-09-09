var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // console.error(err.message);
    // throw err;
  } else {
    console.log("Connected to the SQLite database.");
    // db.exec(
    //   `CREATE TABLE users (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name text,
    //         username text UNIQUE, 
    //         email text UNIQUE, 
    //         password text,
    //         CONSTRAINT email_unique UNIQUE (email),
    //         CONSTRAINT username_unique UNIQUE (username)
    //     );`,
    //   (err) => {
    //     if (err) {
    //       console.error(err);
    //     }
    //   }
    // );

    // db.exec(
    //   `CREATE TABLE admins (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     adminId INTEGER,
    //     FOREIGN KEY(adminId) REFERENCES users(id)
    //     );`,
    //   (err) => {
    //     if (err) {
    //         console.error(err);
    //     }
    //   }
    // );
  }
});

module.exports = db;
