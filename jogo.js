var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search 
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
  criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
  criaMosquitoTempo = 1000
}else if(nivel === 'hard'){
  criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo(){
  altura = window.innerHeight 
  largura = window.innerWidth
  //console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){
  tempo--
  if(tempo < 0){
    clearInterval(cronometro)
    clearInterval(criaMosca)
    window.location.href = 'vitoria.html'
  }else{
    document.getElementById('cronometro').innerHTML = tempo
  }
}, 1000)

document.getElementById('cronometro').innerHTML = tempo

function posicaoRandomica(){
  //remover o mosquito anterior(caso exista)
  if(document.getElementById('mosquito')){
    document.getElementById('mosquito').remove()

    if(vidas > 3){
      window.location.href = 'fim_de_jogo.html'
    }else{
      document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"
      vidas++
    }
  }

  //posições randomicas de acordo com a largura e altura da tela
  var posicaoX = Math.floor(Math.random() * largura) - 90 // 90px a menos q o limite e a img n ultrapasse
  var posicaoY = Math.floor(Math.random() * altura) - 90

  posicaoX = posicaoX < 0 ? 0 : posicaoX // se posicaoX < 0 -> recebe 0, senão recebe ela mesma
  posicaoY = posicaoY < 0 ? 0 : posicaoY

  //criar o elemento html
  var mosca = document.createElement('img')
  mosca.src = 'imagens/mosca.png'
  mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
  mosca.style.left = posicaoX + 'px'
  mosca.style.top = posicaoY + 'px'
  mosca.style.position = 'absolute' //para que as coordenadas sejam aplicadas, o elemento precisa ser absoluto
  mosca.id = 'mosquito'
  mosca.onclick = function(){
    this.remove()
  }

  document.body.appendChild(mosca)
}

function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3)

  switch(classe){
    case 0:
      return 'mosca1'
    case 1:
      return 'mosca2'
    case 2:
      return 'mosca3'
  }
}

function ladoAleatorio() {
  var classe = Math.floor(Math.random() * 2)

  switch(classe){
    case 0:
      return 'ladoA'
    case 1:
      return 'ladoB'
  }
}

var criaMosca = setInterval(function(){
  posicaoRandomica()
}, criaMosquitoTempo)

function iniciarJogo(){
  var nivel = document.getElementById('nivel').value

  if(nivel === ''){
    alert('Selecione um nível para iniciar o jogo')
    return false
  }

  window.location.href = 'app.html?' + nivel
}
