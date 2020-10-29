const express = require("express");
const next = require("next");
const bodyParser = require('body-parser')



const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare().then(() => {
    const server = express();

    server.use(bodyParser.json());


    server.get('*',(req,res) => {
        return handle(req,res)
    })

    server.listen(3000, (err) => {
        if(err) throw err
        else console.log('Server started at port: 3000');
    })
})