document.querySelectorAll('.options-menu').forEach(function(menuButton) {
    menuButton.addEventListener('click', function(event) {
        var dropdownMenu = event.target.closest('.relative').querySelector('.menu');
        dropdownMenu.classList.toggle('hidden');

        var id = event.target.closest('section').dataset.id;

        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(1)').addEventListener('click', function() {
            // Chame a função ler aqui
            fetch('/read', { method: 'GET' });
        });
        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(2)').addEventListener('click', function() {
            // Chame a função atualizar aqui
            fetch(`/update/${id}`, { method: 'PUT' });
        });
        dropdownMenu.querySelector('a[role="menuitem"]:nth-child(3)').addEventListener('click', function() {
            // Chama a função DELETE
            fetch(`/delete/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        event.target.closest('section').remove();
                    } else {
                        console.error('Erro ao deletar lançamento');
                    }
                });
        });
    });
});

document.querySelector('#launchButton').addEventListener('click', function() {
    fetch('/lancar')
        .then(response => response.text())
        .then(html => {
            document.querySelector('#modal').innerHTML = html;
            document.querySelector('#modal').classList.remove('hidden');
            document.querySelector('#modal-background').classList.remove('hidden');
        });
});
