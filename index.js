// brain of the backend
const express  = require('express');
const app = express();
const mongoose = require('mongoose');


app.get('/',(req,res)=>{
    res.send("Hello from Node API Server");

});

mongoose.connect('mongodb+srv://abdullah75farid:8EaSXlcvGskghVlJ@backenddb.cwpro.mongodb.net/Node-Api?retryWrites=true&w=majority&appName=BackendDB')
.then(()=>{
    console.log('connected to database');
    app.listen(3000,()=>{
        console.log('server is listening on port 3000');
    });
})
.catch(()=>{
    console.log('connection failed!');    
})

