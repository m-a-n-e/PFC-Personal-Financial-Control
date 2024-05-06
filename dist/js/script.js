document.querySelectorAll('.options-menu').forEach(function(menuButton) {
    menuButton.addEventListener('click', function(event) {
        var dropdownMenu = event.target.closest('.relative').querySelector('.menu');
        dropdownMenu.classList.toggle('hidden');
    });
});

