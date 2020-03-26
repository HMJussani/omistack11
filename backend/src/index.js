const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
const porta= 3333;
/*
app.use(cors({
    origin:'http://meuapp.com'
}));*/
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(porta, function(){
    console.log(`Rodando na porta: ${porta}`);    
});





