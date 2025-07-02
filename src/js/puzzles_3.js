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
        console.log(level3)
        // Carrega puzzle de typing
        const indexTyping = Math.floor(Math.random() * level3["puzzle-typing"].length);
        const selectedForm = level3["puzzle-form"][indexTyping];
        const selectedTyping = level3["puzzle-typing"][indexTyping];
        const clickingKeys = Object.keys(level3["puzzle-clicking"]);
        const clickingIndex = Math.floor(Math.random() * clickingKeys.length);
        const selectedClickingKey = clickingKeys[clickingIndex];
        const selectedClicking = level3["puzzle-clicking"][selectedClickingKey];
        // Adiciona imagens do puzzle-clicking na section com id "puzzle-images"
        const puzzleImagesSection = document.getElementById('puzzle-images');
        puzzleImagesSection.innerHTML = '';
        selectedClicking.forEach((imgSrc) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '';
            img.style.width = '100%'; // Ajusta a largura da imagem
            puzzleImagesSection.appendChild(img);
        });

        // Atualiza a imagem do puzzle e a resposta
        let imgElement = document.getElementById('puzzle-typing-img');
        imgElement.src = selectedTyping.path;
        imgElement.alt = selectedTyping.answer;

        let formImgElement = document.getElementById('puzzle-form-img');
        formImgElement.src = selectedForm.path;

        // Verificação de resposta
        const input = document.getElementById('puzzle-input');
        const checkBtn = document.getElementById('puzzle-submit');

        const decoyInput = document.getElementById('decoy');
        const nameInput = document.getElementById('name');
        const countryInput = document.getElementById('country');
        const cityInput = document.getElementById('city');
        const dateInput = document.getElementById('date');

        function checkFormAnswers() {
            const decoyCorrect = decoyInput.value.trim() === selectedForm["nome-real"];
            const nameCorrect = nameInput.value.trim() === selectedForm["nome-artistico"];
            const countryCorrect = countryInput.value.trim() === selectedForm["pais-de-nascimento"];
            const cityCorrect = cityInput.value.trim() === selectedForm["cidade-de-nascimento"];
            return {
                decoyCorrect,
                nameCorrect,
                countryCorrect,
                cityCorrect,
                dateCorrect
            };
        }
        const formBtn = document.getElementById('puzzle-form-button');
        formBtn.addEventListener('click', () => {
            const results = checkFormAnswers();
            if (results.decoyCorrect && results.nameCorrect && results.countryCorrect && results.cityCorrect && results.dateCorrect) {
                alert('Formulário correto!');
            } else {
                alert('Alguma resposta está incorreta. Tente novamente.');
            }
        });

        checkBtn.addEventListener('click', () => {
            const userAnswer = input.value.trim();
            if (userAnswer === selectedTyping.answer) {
                alert('Resposta correta!');
            } else {
                alert('Resposta incorreta. Tente novamente.');
            }
        });
    });
