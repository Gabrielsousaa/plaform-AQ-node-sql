const express = require("express");
const app = express();

//estuou dizendo para o ejs express usar o EJS como view engine
app.set('view engine', 'ejs');

app.get("/",(req,res) =>{
    res.render("home");
});


app.listen(8080,()=>{

    console.log("App rodando");

});