const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Serve o diretório 'dist'
app.use(express.static('dist'));

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'register.html'));
});

app.get(['/login', '/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'login.html'));
});

app.get(['/admin', '/'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'admin.html'));
});

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});








