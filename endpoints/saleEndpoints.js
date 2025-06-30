import express from 'express';
import { sqlManage } from '../databaseTools/sqlManage.js';
const sqlCommand = sqlManage

const saleEndpoint = express.Router();

saleEndpoint.post('/saleconfirmed', (req, res) => {
    console.log('server side')
    const sqlAnswer = (err, sqlAnswer) => {
        if (!err) {
            res.send(sqlAnswer);
        } else {
            console.error(err);
        }
    };
    sqlCommand.createSale(req.body, sqlAnswer);
});

export { saleEndpoint }