// No lado do cliente (JavaScript)
document.querySelectorAll('.options-menu').forEach(function(menuButton) {
    menuButton.addEventListener('click', function(event) {
        var dropdownMenu = event.target.closest('.relative').querySelector('.menu');
        dropdownMenu.classList.toggle('hidden');

        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(1)').addEventListener('click', function() {
            // Chame a função criar aqui
            fetch('/create', { method: 'POST' });
        });
        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(2)').addEventListener('click', function() {
            // Chame a função ler aqui
            fetch('/read', { method: 'GET' });
        });
        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(3)').addEventListener('click', function() {
            // Chame a função atualizar aqui
            fetch('/update', { method: 'PUT' });
        });
        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(4)').addEventListener('click', function() {
            // Chame a função deletar aqui
            fetch('/delete', { method: 'DELETE' });
        });
    });
});

const express = require('express');
const app = express();

app.post('/create', function(req, res) {
    // Implemente a lógica para criar aqui
});

app.get('/read', function(req, res) {
    // Implemente a lógica para ler aqui
});

app.put('/update', function(req, res) {
    // Implemente a lógica para atualizar aqui
});

app.delete('/delete', function(req, res) {
    // Implemente a lógica para deletar aqui
});

app.listen(3000, function() {
    console.log('Servidor rodando na porta 3000');
});
