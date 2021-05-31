const express = require ('express');
const app = express();
const path = require ('path');

app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
})
app.get('/' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/home.html'))
});
app.get('/prodDetail' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/prodDetail.html'))
});

app.get('/carrito' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/carrito.html'))
});

app.get('/login' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/login.html'))
});
app.get('/signUp' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './views/signUp.html'))
});
 
app.use(express.static(path.resolve(__dirname , './public')));


   
