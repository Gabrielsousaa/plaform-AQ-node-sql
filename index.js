const express = require("express");
const app = express();
const bodyParser = require("body-parser"); //responsavel por traduzir os dados enviados
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta"); // Pergunta é o do database que é model correto
const Resposta = require("./database/Resposta");
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
    Pergunta.findAll({
        raw: true,
        order: [
            ['createdAt', 'DESC'] //asc = crescente || DES = descrescente
        ]
    }).then(perguntas => { //findAll-> Equivalente ao select from table
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

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => { //then basicamente é uma função de resposta da pesquisa findOne ou qualquer find
        if (pergunta != undefined) { //pergunta encotrada
            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                raw: true,
                order: [
                    ['createdAt', 'DESC']
                ]

            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else { // nao encontrada
            res.redirect("/");
        }
    });

});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});
app.listen(8080, () => {

    console.log("App rodando");

});