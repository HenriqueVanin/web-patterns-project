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
            fpuzzlesData = etchPuzzlesLvl3(lvl);
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

}