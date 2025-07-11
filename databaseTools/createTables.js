
const createTable = {
    tableProducts: (db) => {
        db.run(`CREATE TABLE IF NOT EXISTS products (code INT PRIMARY KEY, name TEXT NOT NULL);`, (err) => {
            if (!err) {
                console.log('Table created successfully');
            } else {
                console.log(err);
            }
        });
    },

    tableStocks: (db) => {
        db.run(`CREATE TABLE IF NOT EXISTS stocks 
            (fkcode INT UNIQUE, stock INT NOT NULL, FOREIGN KEY(fkcode) REFERENCES products(code));`, (err) => {
            if (!err) {
                console.log('Table created successfully');
            } else {
                console.log(err);
            }
        });
    },

    tablePrices: (db) => {
        db.run(`CREATE TABLE IF NOT EXISTS prices 
            (fkcode INT UNIQUE, price INT NOT NULL, FOREIGN KEY(fkcode) REFERENCES products(code));`, (err) => {
            if (!err) {
                console.log('Table created successfully');
            } else {
                console.log(err);
            }
        });
    },

    tableSales: (db) => {
        db.run(`CREATE TABLE IF NOT EXISTS sales
            (time NUMERIC NOT NULL,
            name TEXT NOT NULL,
            stock INT NOT NULL,
            price INT NOT NULL,
            fktime NUMERIC,
            fkcode INT,
            FOREIGN KEY(fkcode) REFERENCES products(code),
            FOREIGN KEY(fktime) REFERENCES totalsales(time)
            );`, (err) => {
            if (!err) {
                console.log('Table created successfully');
            } else {
                console.log(err);
            }
        });
    },

    tableTotalSales: (db) => {
        db.run(`CREATE TABLE IF NOT EXISTS totalsales
            (time NUMERIC PRIMARY KEY)
            ;`, (err) => {
            if (!err) {
                console.log('Table created successfully');
            } else {
                console.log(err);
            }
        });
    }
}

function createAllTables(db) {
    createTable.tableProducts(db)
    createTable.tableStocks(db)
    createTable.tablePrices(db)
    createTable.tableTotalSales(db)
    createTable.tableSales(db)
}
export { createAllTables };

const justProbeTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS justprobetable
        (id NUMERIC PRIMARY KEY,
        name TEXT NOT NULL,
        age NUMERIC)
        ;`, (err) => {
        if (!err) {
            console.log('Table created successfully');
        } else {
            console.log(err);
        }
    });
};

//justProbeTable();
//tableProducts();
//tableTotalSales();

//tableStocks();
//tablePrices();
//tableSales();



// node controllers/createTables.js


