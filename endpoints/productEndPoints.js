import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer'
import { sqlManage } from '../databaseTools/sqlManage.js';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const upload = multer({ dest: 'uploadsx/' })
console.log('**********************************')
console.log(upload)


const productEndpoint = express.Router();

const sqlCommand = sqlManage


productEndpoint.get('/product/csv', (req, res) => {
    const sqlAnswer = (err, rows) => {
        if (!err) {
            console.log(rows)
            const csvWriter = createObjectCsvWriter({
                path: 'inventario.csv',
                header: [
                    { id: 'code', title: 'codigo' },
                    { id: 'name', title: 'articulo' },
                    { id: 'stock', title: 'cantidad' },
                    { id: 'price', title: 'valor' },
                ]
            })
            csvWriter.writeRecords(rows).then(() => {
                console.log('CSV file created')
                res.download('inventario.csv')
            }).catch(err => {
                console.error('Error writing CSV:', err);
                res.status(500).send('CSV generation error');
            })

        } else {
            console.error(err);
        }
    };
    sqlCommand.downloadcsv(sqlAnswer);
});

productEndpoint.get('/all', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlCommand.selectAllRows(sqlAnswer);
});

productEndpoint.post('/create', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        console.log('sqlanswer');
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlCommand.createRow(req.body, sqlAnswer);
});

productEndpoint.post('/masivecreate', upload.single('csvFile'), (req, res) => {
    const filePath = req.file.path
    console.log(filePath)
    const fileContents = fs.readFileSync(filePath, "utf8");
    console.log(fileContents)
    console.log('File Update: ', req.file)
    const sqlAnswer = (err, sqlAnswer) => {
        console.log('masivecreate');
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    //sqlAnswer(null, { "all": "ok" })
    sqlCommand.createMasiveRows(fileContents, sqlAnswer);
});

productEndpoint.get('/delete/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlCommand.deleteIdRow(req.params, sqlAnswer);
});

productEndpoint.get('/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlCommand.selectIdRow(req.params, sqlAnswer);
});

productEndpoint.post('/update/:id', (req, res) => {
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            res.send(err);
        }
    };
    sqlCommand.updateIdRow(req.body, sqlAnswer);
});


export { productEndpoint };