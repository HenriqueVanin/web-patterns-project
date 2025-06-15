fetch("/resources/data/puzzles.json")
    .then((response) => response.json())
    .then((puzzles) => {
        sessionStorage.setItem("puzzles", JSON.stringify(puzzles));
    })

// Carrega um grupo de puzzles aleatórios para um nível específico
// O formato de retorno e a quantidade de puzzles dependem do nível
function fetchRandomPuzzles(level)
{
    const puzzles = JSON.parse(sessionStorage.getItem("puzzles"));
    const lvl = puzzles[`level-${level}`];
    let puzzlesData = null;
    switch (level) {
        case 1:
            puzzlesData = fetchPuzzlesLvl1(lvl);
            break;
        case 2:
            puzzlesData = fetchPuzzlesLvl2(lvl);
            break;
        case 3:
            puzzlesData = fetchPuzzlesLvl3(lvl);
            break;
    }
    return puzzlesData;
}

function fetchPuzzlesLvl1(data)
{
    const categories = Object.values(data);

    const selected = categories.map((questions) => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const q = questions[randomIndex];
        return {
            tip: q.question,
            answer: q.answer,
            level: 1,
        };
    });

    return selected;
}

function fetchPuzzlesLvl2(data)
{

}

function fetchPuzzlesLvl3(data)
{
    const sections = Object.keys(data);

    // Seleciona uma imagem aleatória para puzzle-typing
    const indexTyping = Math.floor(Math.random() * data["puzzle-typing"].length);
    const selectedTypingImagePath = data["puzzle-typing"][indexTyping];
    const selectedTypingAnswer = selectedTypingImagePath.answer;

    // Seleciona uma categoria aleatória para puzzle-clicking
    const categories = Object.keys(data['puzzle-clicking']);
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    // Extraindo todos os caminhos de todas as categorias e embaralhando
    let allPaths = [];
    for (let category of categories) {
        allPaths = allPaths.concat(data['puzzle-clicking'][category]);
    }
    allPaths.sort(() => Math.random() - 0.5);
    // Indexes correspondentes aos caminhos selecionados na categoria escolhida
    const selectedPaths = data['puzzle-clicking'][selectedCategory];
    const indexes = [];
    for (let i = 0; i < allPaths.length; i++) {
        if (selectedPaths.includes(allPaths[i])) {
            indexes.push(i);
        }
    }

    // Seleciona um artista aleatório para o puzzle-form
    const indexForm = Math.floor(Math.random() * data["puzzle-form"].length);
    const selectedForm = data["puzzle-form"][indexForm];

    return {
        typing: {
            path: selectedTypingImagePath.path,
            answer: selectedTypingAnswer,
        },
        clicking: {
            category: selectedCategory,
            paths: allPaths,
            indexes: indexes,
        },
        form: selectedForm
    }
}