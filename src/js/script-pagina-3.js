document.addEventListener('DOMContentLoaded', () => {
    // A página já começa com a sidebar embaralhada
    shuffleSidebar();

    // Add listeners
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', sidebarItemClicked);
    });
    nextBtn = document.getElementById("next-btn");
    nextBtn.addEventListener("click", () => {
        console.log("Próxima página clicada");
        window.location.href = "/src/html/ultima-pagina.html";
    });

    // Seleciona puzzles aleatórios para cada seção
    selectedPuzzles = fetchRandomPuzzles(3);

    // Carrega puzzles de typing

    // Carrega puzzles de clicking

    // Carrega puzzles de forms

});

// Embaralha os itens da sidebar
function shuffleSidebar() {
    let sidebar = document.getElementById('sidebar-list');
    let items = Array.from(sidebar.children);

    shuffled_sidebar = Array.from(items, () => null);
    for (item of items) {
        let index = Math.floor(Math.random() * items.length);
        while (shuffled_sidebar[index] !== null) {
            index += 1;
            if (index >= items.length)
                index = 0;
        }
        shuffled_sidebar[index] = item;
    }

    sidebar.innerHTML = '';
    for (item of shuffled_sidebar) {
        sidebar.appendChild(item);
    }
}

// Callback de quando um item da sidebar é clicado
function sidebarItemClicked(event) {
    // Reset active
    document.querySelectorAll('.puzzle-page').forEach(item => {
        item.classList.remove('active');
    });

    // Pegar o data-target correspondente
    let targetId = event.currentTarget.getAttribute('data-target');
    let targetSection = document.getElementById(targetId);

    // Ativar a seção correspondente
    targetSection.classList.add('active');

    // Embaralhar a sidebar novamente
    shuffleSidebar();
}