const quiz = document.querySelector(".quiz")
const pergunta = quiz.querySelector("h1")
const alternativas = quiz.querySelector(".alternativas")
const heading = quiz.querySelector(".headings")



void async function () {
  const requisicao = await fetch("quiz.json")
  const perguntas = await requisicao.json()

  let numPerguntaAtual = 0
  let perguntaAtual
  let acertos = 0
  let erros = 0

  function rederizaPergunta() {
    let currentLetter = 'A'
    let animationDur = 0.5
    perguntaAtual = perguntas[numPerguntaAtual]
    pergunta.innerHTML= ""
    pergunta.innerHTML = `<span class="title" style="animation-duration: ${animationDur += 0.2}s;">${perguntaAtual.pergunta}</span>`
    alternativas.innerHTML = ""
    perguntaAtual.alternativas.forEach(alt => {
      alternativas.innerHTML += `
      <a>
      <div class="answer-container" style="animation-duration: ${animationDur += 0.2}s;">
        <div class="letter">${currentLetter}</div>
        <div class="alt-unit">${alt}</div> 
        </div>
      </a>`
      currentLetter = String.fromCharCode(`${currentLetter}`.charCodeAt() + 1)
  })
  }

  alternativas.addEventListener("click", evt => {
    const answer = quiz.querySelector(".answer-container")
    if (evt.target.classList.contains("alternativas")){
      return
    }
    const bt = evt.target.closest("a")
    
    if (!bt) return

    const arrAlts = [...alternativas.children]
    const idxClicado = arrAlts.indexOf(bt)
    if (idxClicado === perguntaAtual.resposta) {
      numPerguntaAtual += 1
      acertos += 1
      if (numPerguntaAtual === perguntas.length) {
        quiz.innerHTML = `
        <div class="ending">
          <h3>Seus Status</h3>
          <h2 style="font-size: ${16*acertos}px;"> ${acertos} ACERTOS </h2>
          <h2 style="font-size: ${16*erros}px;"> ${erros} ERROS</h2>
          <h3>${(acertos - erros) / numPerguntaAtual  * 100}% de aproveitamento</h3>
        </div>
        `
        return
      }
      
      rederizaPergunta()
      return
    }
    
    erros += 1
    
  })

  rederizaPergunta()
}();