const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //responsavel por traduzir os dados enviados
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta"); // Pergunta é o do database que é model correto
//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log("conexão feita com o banco");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });


//Estou dizendo para o ejs express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // carrega qualquer arquivos estaticos como: css, imagens, etc

//BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true }).then(perguntas => { //findAll-> Equivalente ao select from table
        console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    });

});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")

});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
});

app.listen(8080, () => {

    console.log("App rodando");

});