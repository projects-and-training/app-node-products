const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const products = [
    {
        id: 1,
        name: 'laptop'
    },
    {
        id: 2,
        name: 'procesador'
    }
];

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/products', (req, res) =>{
    res.json(products);
});

app.post('/products', (req, res) =>{
    const { name } = req.body;
    products.push({
        id: products.length + 1,
        name
    });
    res.json('satisfactoriamente creado');
});

app.put('/products/:id', (req, res) =>{
    console.log(req.params, req.body);
    res.json('recibido');
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});
