/**
 * Arquivo: routes/routes.js
 * Descrição: Arquivo responsável pelas rotas da aplicação
 * Data:  07/04/2019 --- testando
 * Author: Glaucia Lemos
 */

const Todo = require('../models/todo');

// Método responsável por retornar todos os TODOS: (GET) localhost://8000
function getTodos(res) {
  Todo.find({}, (error, todos) => {
    if (error) {
      res.send('Erro ao listar os TODOS...: ', error);
    }
    res.json(todos);
  });
}

module.exports = function (app) {
  // Retornará todos os 'Todos' (GET) localhost:8000/api/todos:
  app.get('/api/todos', (req, res) => {
    getTodos(res);
  });

  // Criação de um novo 'Todo': (POST) localhost:8000/api/todos
  app.post('/api/todos', (req, res) => {
    // Criará um novo 'Todo' e retornar os 'Todos' criados:
    Todo.create({
      texto: req.body.text,
      feito: false,
    }, (error) => {
      if (error) {
        res.send('Erro ao criar um TODO...: ', error);
      }
      getTodos(res);
    });
  });

  // Exclusão de um 'Todo': (DELETE) localhost:8000/api/todos/:id
  app.delete('/api/todos/:id', (req, res) => {
    Todo.remove({
      _id: req.params.id,
    }, (error) => {
      if (error) {
        res.send('Erro ao deletar um TODO...: ', error);
      }
      getTodos(res);
    });
  });

  // Aplicação: todas as vezes que retornar um GET o Angular irá atualizar as mudanças na página:
  app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/front-end/index.html`);
  });
};
