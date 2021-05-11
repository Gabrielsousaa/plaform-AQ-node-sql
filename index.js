const express = require("express");
const app = express();

//estuou dizendo para o ejs express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // carrega qualquer arquivos estaticos como: css, imagens, etc

app.get("/",(req,res) =>{
    res.render("index")

});

app.get("/perguntar",(req,res) =>{
    res.render("perguntar")

});



app.listen(8080,()=>{

    console.log("App rodando");

});