/*
  Arquivo: aluno-formulario.js
  Responsabilidade: controlar a página manipular-aluno.html.

  Aqui ficarão as funções de tela:
  - buscar aluno por RA
  - preencher formulário
  - montar objeto aluno
  - cadastrar ou atualizar
  - exibir mensagens
*/

let modoEdicao = false;

function buscarAlunoPorRa() {
  // TODO Aula 09:
  // 1. Ler RA do input
  // 2. Chamar buscarAlunoApi(ra)
  // 3. Preencher formulário com os dados retornados
  // 4. Alterar modoEdicao para true
  console.log("TODO: buscarAlunoPorRa");
}

function salvarAluno(evento) {
  evento.preventDefault();

  // TODO Aula 09:
  // 1. Montar objeto aluno a partir do formulário
  // 2. Se modoEdicao for true, chamar atualizarAlunoApi(ra, aluno)
  // 3. Caso contrário, chamar cadastrarAlunoApi(aluno)
  // 4. Exibir mensagem de sucesso ou erro
  console.log("TODO: salvarAluno");
}

function montarAlunoDoFormulario() {
  // TODO Aula 09:
  // Ler os campos: ra, nome, email, curso, semestre, situacao
  // Retornar objeto aluno.
  console.log("TODO: montarAlunoDoFormulario");
}

function preencherFormulario(aluno) {
  // TODO Aula 09:
  // Preencher inputs/selects com dados do aluno retornado pela API.
  console.log("TODO: preencherFormulario", aluno);
}

function limparFormulario() {
  // TODO Aula 09:
  // 1. Limpar form
  // 2. Voltar para modo cadastro
  // 3. Atualizar badge modoFormulario
  console.log("TODO: limparFormulario");
}

function exibirMensagem(tipo, mensagem) {
  // TODO Aula 09:
  // Preencher #areaMensagem com alert Bootstrap.
  // tipo pode ser: success, danger, warning, info
  console.log("TODO: exibirMensagem", tipo, mensagem);
}
