let tamanhoSenha = 12;
let campoSenha;
let textoTamanho;

// Checkboxes
let chkMaiusculas, chkMinusculas, chkNumeros, chkSimbolos;

// Elementos da barra de força
let barraForca;

// ADICIONADO: Variável para armazenar o elemento que exibirá o tempo
let valorEntropia; 

const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+";

function setup() {
  noCanvas();

  // Container Principal
  let conteudo = createElement('section').addClass('conteudo');

  // Topo (Títulos)
  let conteudoTitulo = createDiv().addClass('conteudo-titulo').parent(conteudo);
  createElement('h2', 'Gerador de senhas').addClass('titulo-principal').parent(conteudoTitulo);
  createElement('h3', 'Gere instantaneamente uma senha aleatória e segura').addClass('titulo-secundario').parent(conteudoTitulo);

  // Exibição da Senha
  let conteudoSenha = createDiv().addClass('conteudo-senha').parent(conteudo);
  createElement('label', 'Senha').parent(conteudoSenha);
  campoSenha = createInput('').id('campo-senha').attribute('readonly', 'true').parent(conteudoSenha);

  // Painel de Customização
  let parametro = createDiv().addClass('parametro').parent(conteudo);
  createElement('h3', 'Personalize sua senha').addClass('parametro-titulo').parent(parametro);
  
  let colunaSenha = createDiv().addClass('parametro-coluna__senha').parent(parametro);

  // 1. Coluna: Número de caracteres
  let paramSenha1 = createDiv().addClass('parametro-senha').parent(colunaSenha);
  createElement('h4', 'Número de caracteres').addClass('parametro-senha__titulo').parent(paramSenha1);
  let botoesDiv = createDiv().addClass('parametro-senha-botoes').parent(paramSenha1);
  
  let btnMenos = createButton('-').addClass('parametro-senha__botao').parent(botoesDiv);
  btnMenos.mousePressed(diminuirTamanho);
  
  textoTamanho = createP(tamanhoSenha).addClass('parametro-senha__texto').parent(botoesDiv);
  
  let btnMais = createButton('+').addClass('parametro-senha__botao').parent(botoesDiv);
  btnMais.mousePressed(aumentarTamanho);

  // 2. Coluna: Características (Checkboxes)
  let paramSenha2 = createDiv().addClass('parametro-senha').parent(colunaSenha);
  createElement('h4', 'Características da senha').addClass('parametro-senha__titulo').parent(paramSenha2);
  
  let checkboxContainer = createDiv().addClass('checkbox-container').parent(paramSenha2);
  
  chkMaiusculas = createCheckbox('Letras maiúsculas', true).parent(checkboxContainer);
  chkMinusculas = createCheckbox('Letras minúsculas', true).parent(checkboxContainer);
  chkNumeros = createCheckbox('Números', false).parent(checkboxContainer);
  chkSimbolos = createCheckbox('Símbolos', false).parent(checkboxContainer);

  // Eventos para gerar nova senha ao mudar os checkboxes
  chkMaiusculas.changed(gerarSenha);
  chkMinusculas.changed(gerarSenha);
  chkNumeros.changed(gerarSenha);
  chkSimbolos.changed(gerarSenha);

  // 3. Coluna: Força da senha
  let paramSenha3 = createDiv().addClass('parametro-senha').parent(colunaSenha);
  createElement('h4', 'Força da senha').addClass('parametro-senha__titulo').parent(paramSenha3);
  
  let containerForca = createDiv().addClass('container-forca').parent(paramSenha3);
  barraForca = createDiv().addClass('barra-forca').parent(containerForca);
  
  let labelsForca = createDiv().addClass('labels-forca').parent(paramSenha3);
  createElement('span', 'Fraca').parent(labelsForca);
  createElement('span', 'Média').parent(labelsForca);
  createElement('span', 'Forte').parent(labelsForca);

  // ADICIONADO: Criando o elemento HTML da entropia abaixo da força da senha
  let divEntropia = createDiv().parent(paramSenha3);
  valorEntropia = createElement('span', '').addClass('entropia').parent(divEntropia);

  gerarSenha();
}

function diminuirTamanho() {
  if (tamanhoSenha > 4) {
    tamanhoSenha--;
    textoTamanho.html(tamanhoSenha);
    gerarSenha();
  }
}

function aumentarTamanho() {
  if (tamanhoSenha < 30) {
    tamanhoSenha++;
    textoTamanho.html(tamanhoSenha);
    gerarSenha();
  }
}

function verificarForca(comprimento, tiposEscolhidos) {
  barraForca.removeClass('fraca').removeClass('media').removeClass('forte');
  
  let pontuacao = tiposEscolhidos;
  if (comprimento >= 12) pontuacao++;
  if (comprimento >= 16) pontuacao++;

  if (pontuacao <= 2) {
    barraForca.addClass('fraca');
  } else if (pontuacao === 3 || pontuacao === 4) {
    barraForca.addClass('media');
  } else {
    barraForca.addClass('forte');
  }
}

function gerarSenha() {
  let bancoCaracteres = "";
  let tiposEscolhidos = 0;

  if (chkMaiusculas.checked()) { bancoCaracteres += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; tiposEscolhidos++; }
  if (chkMinusculas.checked()) { bancoCaracteres += "abcdefghijklmnopqrstuvwxyz"; tiposEscolhidos++; }
  if (chkNumeros.checked()) { bancoCaracteres += "0123456789"; tiposEscolhidos++; }
  if (chkSimbolos.checked()) { bancoCaracteres += "!@#$%&*()_+{}[]?/"; tiposEscolhidos++; }

  if (bancoCaracteres === "") {
    campoSenha.value("Selecione uma opção");
    barraForca.removeClass('fraca').removeClass('media').removeClass('forte');
    valorEntropia.html("0");
    return;
  }

  let senhaGerada = "";
  for (let i = 0; i < tamanhoSenha; i++) {
    let indiceAleatorio = floor(random(bancoCaracteres.length));
    senhaGerada += bancoCaracteres[indiceAleatorio];
  }
  
  campoSenha.value(senhaGerada);
  verificarForca(tamanhoSenha, tiposEscolhidos);

  // ADICIONADO: O cálculo exato que você enviou na imagem
  // Nota: Criamos uma simulação da variável 'entropia' baseada no comprimento para a fórmula rodar
  let entropia = tamanhoSenha * Math.log2(bancoCaracteres.length);
  
  // Aqui está a sua linha adaptada para o p5.js (trocando .textContent por .html())
  valorEntropia.html(2**Math.floor(entropia) / (100e6 * 60 * 60 * 24));
}
