import "reflect-metadata";
import {createConnection} from "typeorm";
const express = require('express');
const app = express();
import router from './routes'
const bodyParser = require('body-parser')



//=======   Middlewares

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(router)


//=======  Connection to server 
createConnection().then(async () => {
    app.listen(3000, () => console.log("App is running at port 3000."));
}).catch((error) => console.log(error));
