fetch("/resources/data/puzzles.json")
  .then((res) => res.json())
  .then(puzzles => {
    // 1) IMAGEM (col 1)
    const movies = puzzles["level-2"]["movie-stills"];
    const m = movies[Math.floor(Math.random() * movies.length)];
    let helpImg = 0;
    // refs
    const col1 = document.getElementById("column-1");
    const imgEl = document.getElementById("puzzle-img-1");
    const alt1 = document.getElementById("col-alt-1");
    const form1 = col1.querySelector(".puzzle-form");
    const input1 = form1.querySelector("input");
    const res1 = form1.querySelector(".result");
    const helpBtn1 = document.getElementById("help-puzzle-1");

    // init imagem
    document.getElementById("col-title-1").textContent = "Enigma 1";
    imgEl.src = `data/img/${m["img-path"]}`;
    form1.dataset.badAlt = m["bad-alt"];
    form1.dataset.goodAlt = m["good-alt"];
    form1.dataset.answer = m.answer;

    function updateImg() {
      const lvl = helpImg + 1;
      const altText = (lvl === 3) ? form1.dataset.goodAlt : form1.dataset.badAlt;
      imgEl.alt = altText;
      alt1.textContent = altText;
      // troca classe de blur
      col1.classList.remove("page-2-category-1-puzzle-1", "page-2-category-1-puzzle-2", "page-2-category-1-puzzle-3");
      col1.classList.add(`page-2-category-1-puzzle-${lvl}`);
    }

    helpBtn1.addEventListener("click", () => {
      if (helpImg < 2) { helpImg++; updateImg(); }
    });

    // 2) ÁUDIO / LETRAS (coluna 2 com TTS)
    const songs = puzzles["level-2"]["song-lyrics"];
    const s = songs[Math.floor(Math.random() * songs.length)];
    let helpAud = 0;

    // refs
    const playBtn2 = document.getElementById("play-puzzle-2");
    const col2 = document.getElementById("column-2");
    const lyricsDiv = document.getElementById("col-lyrics-2");
    const form2 = col2.querySelector(".puzzle-form");
    const input2 = form2.querySelector("input");
    const res2 = form2.querySelector(".result");
    const helpBtn2 = document.getElementById("help-puzzle-2");

    // preenche título e dados
    const songName = s["song-name"];
    document.getElementById("col-title-2").textContent = `Enigma 2: "${songName}"`;
    lyricsDiv.innerHTML = s.lyrics
      .map(line => `<p lang="${s["bad-lang"]}">${line}</p>`)
      .join("");
    form2.dataset.badLang = s["bad-lang"];
    form2.dataset.goodLang = s["good-lang"];
    form2.dataset.answer = s.answer;

    // função que faz o TTS das linhas com a língua passada
    function readLyrics(lang) {
      const text = s.lyrics.join(". ");
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
    }

    // play dispara a leitura no idioma atual
    playBtn2.addEventListener("click", () => {
      const currentLang = (helpAud === 1)
        ? form2.dataset.goodLang
        : form2.dataset.badLang;
      readLyrics(currentLang);
    });

    // help só troca o lang das tags <p> e marca helpAud=1
    helpBtn2.addEventListener("click", () => {
      if (helpAud === 0) {
        lyricsDiv.querySelectorAll("p").forEach(p =>
          p.setAttribute("lang", form2.dataset.goodLang)
        );
        helpAud = 1;
      }
    });

    // função checar
    function check(form, input, resultSpan) {
      const val = input.value.trim().toLowerCase();
      resultSpan.classList.remove("correct", "incorrect");
      if (!val) { resultSpan.textContent = ""; return false; }
      const ok = val === form.dataset.answer.toString().toLowerCase();
      resultSpan.textContent = ok ? "Correto" : "Incorreto";
      resultSpan.classList.add(ok ? "correct" : "incorrect");
      return ok;
    }

    nextBtn = document.getElementById("next-btn");
    // eventos checagem
    [[form1, input1, res1], [form2, input2, res2]].forEach(([f, i, r]) => {
      f.addEventListener("submit", e => {
        e.preventDefault();
        check(f, i, r);
        nextBtn.disabled = !(check(form1, input1, res1) && check(form2, input2, res2));
      });
      i.addEventListener("input", () => {
        check(f, i, r);
        nextBtn.disabled = !(check(form1, input1, res1) && check(form2, input2, res2));
      });
    });

    updateImg();
    helpAud = 0;
    nextBtn.disabled = true;
    nextBtn.addEventListener("click", () => {
      if (!nextBtn.disabled) window.location.href = "terceira-pagina.html";
    });
  });
