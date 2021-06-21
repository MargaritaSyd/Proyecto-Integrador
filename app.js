const express = require ('express');
const app = express();
const path = require ('path');
const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
})

app.use(express.static(path.resolve(__dirname , './public')));

app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);

app.use('/product' , productRoutes);

app.use('/users' , userRoutes);