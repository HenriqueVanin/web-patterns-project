/** Para ser substituído por script-pagina-3.js */

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

// Add listeners para a sidebar
document.querySelectorAll('.sidebar-item').forEach(item => {
    item.addEventListener('click', sidebarItemClicked);
});
nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", () => {
    console.log("Próxima página clicada");
    window.location.href = "ultima-pagina.html";
});

// A página já começa com a sidebar embaralhada
shuffleSidebar();

// Carrega os puzzles
fetch("/resources/data/puzzles.json")
    .then((response) => response.json())
    .then((puzzles) => {
        const level3 = puzzles["level-3"];

        // Carrega puzzle de typing
        const categories = Object.values(level3);
        const indexTyping = Math.floor(Math.random() * categories["puzzle-typing"].length);
        const selectedTyping = categories["puzzle-typing"][indexTyping];

        // Atualiza a imagem do puzzle e a resposta
        let imgElement = document.getElementById('puzzle-typing-img');
        imgElement.src = selectedTyping.path;
        imgElement.alt = selectedTyping.answer;

        // Verificação de resposta
    });
