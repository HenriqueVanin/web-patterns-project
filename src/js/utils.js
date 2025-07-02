// Função para checar resposta
function checkAnswer(form) {
    const input = form.querySelector('input[type="text"]');
    const result = form.querySelector(".result");


    result.classList.remove("correct", "incorrect");
    if (input.value.trim() === "") {
        result.innerHTML = "";
        return;
    }
    if (
        input.value.trim().toLowerCase() === form.dataset.answer.toLowerCase()
    ) {
        result.innerHTML = "Correto";
        result.classList.add("correct");
    } else {
        result.innerHTML = "Incorreto";
        result.classList.add("incorrect");
    }
}