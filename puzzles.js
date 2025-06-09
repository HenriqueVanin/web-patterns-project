fetch('./data/puzzles.json')
    .then(response => response.json())
    .then(puzzles => {
      const level1 = puzzles['level-1'];
      const categories = Object.values(level1);

      // Array para contar os usos do help por categoria
      const helpCounts = Array(categories.length).fill(0);

      // Seleciona uma questão aleatória de cada categoria para cada coluna
      const selected = categories.map((questions) => {
        const randomIndex = Math.floor(Math.random() * questions.length);
        const q = questions[randomIndex];
        return {
          tip: q.question,
          answer: q.answer,
          level: 1
        };
      });

      // Preenche os textos e respostas nos elementos HTML já existentes
      selected.forEach((puzzle, idx) => {
        document.getElementById(`col-title-${idx + 1}`).textContent = `Enigma ${idx + 1}`;
        document.getElementById(`col-tip-${idx + 1}`).textContent = puzzle.tip;
        const form = document.querySelectorAll('.puzzle-form')[idx];
        form.dataset.answer = puzzle.answer;
      });

      // Função para checar resposta
      function checkAnswer(form) {
        const input = form.querySelector('input[type="text"]');
        const result = form.querySelector('.result');
        const helpBtn = form.querySelector('.help-btn');
        if (input.value.trim() === '') {
          result.innerHTML = '';
          helpBtn.style.display = 'inline-block';
          return;
        }
        if (input.value.trim().toLowerCase() === form.dataset.answer.toLowerCase()) {
          result.innerHTML = 'Correto';
          helpBtn.style.display = 'none';
        } else {
          result.innerHTML = 'Incorreto';
          helpBtn.style.display = 'inline-block';
        }
      }

      // Função para verificar se todos estão corretos
      function checkAllCorrect() {
        const forms = document.querySelectorAll('.puzzle-form');
        let allCorrect = true;
        forms.forEach(form => {
          const input = form.querySelector('input[type="text"]');
          if (input.value.trim().toLowerCase() !== form.dataset.answer.toLowerCase()) {
            allCorrect = false;
          }
        });
        document.getElementById('next-btn').disabled = !allCorrect;
      }

      // Adiciona eventos
      document.querySelectorAll('.puzzle-form').forEach((form, idx) => {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          checkAnswer(this);
          checkAllCorrect();
        });
        form.querySelector('input[type="text"]').addEventListener('input', function () {
          checkAnswer(form);
          checkAllCorrect();
        });
        form.querySelector('.help-btn').addEventListener('click', function () {
          // Incrementa o contador de help para a categoria
          helpCounts[idx] = Math.min(helpCounts[idx] + 1, 3);
          // Atualiza a classe do <p> correspondente
          const tipElem = document.getElementById(`col-tip-${idx + 1}`);
          // Remove classes antigas puzzle-*-category-*
          tipElem.className = tipElem.className
            .split(' ')
            .filter(c => !/^puzzle-\d-category-\d+$/.test(c))
            .join(' ');
          // Adiciona a nova classe
          tipElem.classList.add(`category-${idx + 1}-puzzle-${helpCounts[idx]}`);
          alert('Dica extra: ' + form.dataset.answer[0] + '...');
        });
      });

      // Inicializa o botão como desabilitado
      document.getElementById('next-btn').disabled = true;

      // Opcional: Adiciona ação ao botão "Avançar"
      document.getElementById('next-btn').addEventListener('click', function () {
        if (!this.disabled) {
          alert('Parabéns! Você pode avançar.');
        }
      });
    });