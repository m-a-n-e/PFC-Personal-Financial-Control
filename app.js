const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'dist', 'views'));
app.set('view engine', 'ejs');
app.use(express.static('dist'));
app.use(express.json());

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  let users;
  try {
    users = JSON.parse(fs.readFileSync('./dist/data/users.json'));
  } catch (err) {
    users = [];
  }

  const senhaCriptografada = await bcrypt.hash(req.body.pwd, 10);

  const novoUsuario = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    user: req.body.user,
    pwd: senhaCriptografada,
    level: 'admin',
    status: 'on'
  };

  users.push(novoUsuario);
  fs.writeFileSync('./dist/data/users.json', JSON.stringify(users));
  res.redirect('/login');
});

app.get(['/login', '/'], (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const users = JSON.parse(fs.readFileSync('./dist/data/users.json'));
  const user = users.find(user => user.user === req.body.user);
  if (user && await bcrypt.compare(req.body.pwd, user.pwd)) {
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

app.get('/admin', (req, res) => {
  let lancamentos;
  try {
    lancamentos = JSON.parse(fs.readFileSync('./dist/data/entries.json'));
  } catch (err) {
    lancamentos = [];
  }

  res.render('admin', { lancamentos: lancamentos });
});

app.post('/lancar', (req, res) => {
  let lancamentos;
  try {
    lancamentos = JSON.parse(fs.readFileSync('./dist/data/entries.json'));
  } catch (err) {
    lancamentos = [];
  }

  const novoLancamento = {
    id: uuid.v4(),
    type: req.body.type,
    categories: req.body.categories,
    description: req.body.description,
    value: req.body.value,
    due_date: req.body.due_date,
    payment_date: req.body.payment_date,
    account: req.body.account,
    status: req.body.status
  };

  lancamentos.push(novoLancamento);
  fs.writeFileSync('./dist/data/entries.json', JSON.stringify(lancamentos));
  res.redirect('/admin');
});

app.get('/lancar', (req, res) => {
  res.render('lancar.ejs', (err, html) => {
      if (err) {
          console.error(err);
          res.status(500).send('An error occurred');
      } else {
          res.send(html);
      }
  });
});

app.get('/read', function (req, res) {

});

app.put('/update', function (req, res) {

});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  let data = JSON.parse(fs.readFileSync('./dist/data/entries.json'));

  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    fs.writeFileSync('./dist/data/entries.json', JSON.stringify(data));
    res.status(200).send({ message: 'Lançamento deletado' });
  } else {
    res.status(404).send({ message: 'Lançamento não encontrado' });
  }
});

app.get('/categories', (req, res) => {
  res.render('categories');
});

app.post('/categories', (req, res) => {
  let categories;
  try {
    categories = JSON.parse(fs.readFileSync('./dist/data/categories.json'));
  } catch (err) {
    categories = [];
  }

  const novaCategoria = {
    id: uuid.v4(),
    type: req.body.category_type,
    description: req.body.category_description
  };

  categories.push(novaCategoria);
  fs.writeFileSync('./dist/data/categories.json', JSON.stringify(categories));
  res.redirect('/admin');
});

app.get('/accounts', (req, res) => {
  res.render('accounts');
});

app.post('/accounts', (req, res) => {
  let accounts;
  try {
    accounts = JSON.parse(fs.readFileSync('./dist/data/accounts.json'));
  } catch (err) {
    accounts = [];
  }

  const novaConta = {
    id: uuid.v4(),
    account_number: req.body.account_number,
    account_type: req.body.account_type,
    bank: req.body.bank
  };

  accounts.push(novaConta);
  fs.writeFileSync('./dist/data/accounts.json', JSON.stringify(accounts));
  res.redirect('/admin');
});



app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
