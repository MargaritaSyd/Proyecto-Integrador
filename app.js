const express = require ('express');
const app = express();
const path = require ('path');
const indexRoutes = require('./src/routes/indexRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const methodOverride= require('method-override');
const session = require('express-session');
//const session = require('cookie-session');

const cookies= require('cookie-parser');

const cookieLogin = require('./src/middlewares/cookieLogin');

// app.listen(3000, () => {
//     console.log('Servidor 3000 corriendo');
// })

app.listen(process.env.PORT || 3000, function(){
    console.log('Servidor corriendo en puerto 3000');
});

app.use(session({
	secret: "It's a secret",
	resave: true,
	saveUninitialized: true,
}));

app.use(cookies());

app.use(cookieLogin);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.resolve(__dirname , './public')));

app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');

app.use('/' , indexRoutes);

app.use('/product' , productRoutes);

app.use('/users' , userRoutes);