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
        name: name
    });
    res.json('satisfactoriamente creado');
});

app.put('/products', (req, res) =>{
    console.log(req.body);
    let id = req.body.id;
    products.map((product, i) => {
        if(product.id == id){
            products[i].name = req.body.name
        }
    });    
    res.json('recibido');
});

app.delete('/products', (req,res) =>{
    const {id} = req.body;
    
    products = products.filter(product => product.id !== id);
    
    res.json('Delete complete');
});

app.use(express.static(path.join(__dirname,'public')));

app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});
