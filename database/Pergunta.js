const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({ force: false }).then(() => {
    console.log("Tabela criada!");


}); // nao irá forçar a criação da tabela caso ela exista 

module.exports = Pergunta;