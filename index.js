import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import { createSchema } from './databaseTools/createSchema.js'
//import { createAllTables } from './databaseTools/createTables.js'

import { appEndPoints } from './endpoints/appEndPoints.js'
import { indexEndpoints } from './endpoints/indexEndpoints.js'

const app = express()
const port = process.env.PORT || 8080;
const db = createSchema.createDataBase()

const __filePath = fileURLToPath(import.meta.url); // get the resolved path to the file
const __folderPath = path.dirname(__filePath); // get the name of the directory


app.use(express.static(path.join(__folderPath, 'frontend', 'public')))

app.use(express.json())

app.use('/app', appEndPoints)
app.use('/api', indexEndpoints)


//createAllTables(db)


app.listen(port, () => {
    console.log(`server listening by port ${port}`)
});


export { db }