document.addEventListener('DOMContentLoaded', () => {
    // Seleciona uma questão aleatória de cada categoria para cada coluna
    selectedPuzzles = fetchRandomPuzzles(1);

    // Array para contar os usos do help por categoria
    window.helpCounts = Array(selectedPuzzles.length).fill(0);

    // Preenche os textos e respostas nos elementos HTML já existentes
    selectedPuzzles.forEach((puzzle, idx) => {
        document.getElementById(`col-title-${idx + 1}`).textContent = `Enigma ${idx + 1
            }`;
        document.getElementById(`col-tip-${idx + 1}`).textContent = puzzle.tip;
        const form = document.querySelectorAll(".puzzle-form")[idx];
        form.dataset.answer = puzzle.answer;
    });

    // Adiciona eventos
    document.querySelectorAll(".puzzle-form").forEach((form, idx) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            checkAnswer(this);
            checkAllCorrect();
        });
        form
            .querySelector('input[type="text"]')
            .addEventListener("input", function () {
                checkAnswer(form);
                checkAllCorrect();
            });

        const helpBtn = document.getElementById(`help-puzzle-${idx + 1}`);
        if (helpBtn) {
            helpBtn.addEventListener("click", function () {
                applyColumnStylePuzzle(idx);
            });
        }
    });
    let i = 0;
    for (i = 0; i < 3; i++) {
        applyColumnStylePuzzle(i)
    };

    // Inicializa o botão como desabilitado
    document.getElementById("next-btn").disabled = true;

    // Ação ao botão "Avançar"
    document.getElementById("next-btn").addEventListener("click", function () {
        if (!this.disabled) {
            window.location.href = "/src/html/pagina-2.html";
        }
    });
});

// Função para verificar se todos estão corretos
function checkAllCorrect() {
    const forms = document.querySelectorAll(".puzzle-form");
    let allCorrect = true;
    forms.forEach((form) => {
        const input = form.querySelector('input[type="text"]');
        if (
            input.value.trim().toLowerCase() !== form.dataset.answer.toLowerCase()
        ) {
            allCorrect = false;
        }
    });
    document.getElementById("next-btn").disabled = !allCorrect;
}

function applyColumnStylePuzzle(category_id) {
    helpCounts[category_id] = Math.min(helpCounts[category_id] + 1, 3);
    const columnDiv = document.getElementById(`column-${category_id + 1}`);
    if (columnDiv) {
        // Remove classes category-x-puzzle-* antes de adicionar a nova
        let i = 0;
        for (i = 1; i <= 3; i++) {
            columnDiv.classList.remove(`page-1-category-${category_id + 1}-puzzle-${i}`);
        };
        columnDiv.classList.add(
            `page-1-category-${category_id + 1}-puzzle-${helpCounts[category_id]}`
        );
    }
}