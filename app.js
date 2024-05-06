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

app.get('/lancar', (req, res) => {
  res.render('lancar');
})

app.get('/lancamentos', (req, res) => {
  res.render('lancamentos');
})

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



app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
