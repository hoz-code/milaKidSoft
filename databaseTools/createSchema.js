import sqlite3 from 'sqlite3';

const foreignKeyOn = (db) => {
    db.run(`PRAGMA foreign_keys = ON;`, (err, row) => {
        if (!err) {
            console.log('Foreign Key is Enable');
        }
        else {
            console.error('Foreign Key is disable');
        }
    });
}

const createSchema = {
    createDataBase: () => {
        sqlite3.verbose();
        const db = new sqlite3.Database('tally.db');
        foreignKeyOn(db);
        console.log('Create Data base successfully')
        return db;
    }
}


export { createSchema };
