const express = require ('express');
const app = express();
const path = require ('path');

app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
})
app.get('/' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/index.html'))
});
app.get('/prodetail' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/prodetail.html'))
});

app.get('/carrito' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/carrito.html'))
});

app.get('/login' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/login.html'))
});
app.get('/signup' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/signup.html'))
});
 
app.use(express.static(path.resolve(__dirname , './public')));


   
