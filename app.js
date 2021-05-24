const express = require ('express');
const app = express();
const path = require ('path');
app.listen(3000, () => {
    console.log('Servidor 3000 corriendo');
})
app.get('/' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './view/home.html'))
});
app.get('/prodDetail' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './view/prodDetail.html'))
});

app.get('/shop' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './view/shop.html'))
});

app.get('/logIn' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './view/logIn.html'))
});
app.get('/signUp' , (req,res) => {
    res.sendFile(path.resolve(__dirname , './view/signUp.html'))
});
 
app.use(express.static(path.resolve(__dirname , './public')));
