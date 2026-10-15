/*
  Arquivo: alunos-lista.js
  Responsabilidade: controlar a página listar-alunos.html.

  Aqui ficarão as funções de tela:
  - carregar alunos
  - renderizar tabela
  - aplicar filtro
  - abrir modal de detalhes
  - abrir modal de inativação
*/

let raSelecionadoParaInativar = null;

function carregarAlunos() {
  // TODO Aula 09:
  // 1. Chamar listarAlunosApi()
  // 2. Receber alunos da API
  // 3. Chamar renderizarTabela(alunos)
  // 4. Chamar atualizarCardsResumo(alunos)
  console.log("TODO: carregarAlunos");
}

function aplicarFiltroSituacao() {
  // TODO Aula 09:
  // 1. Ler valor do select filtroSituacao
  // 2. Chamar listarAlunosApi(situacao)
  // 3. Renderizar resultado na tabela
  console.log("TODO: aplicarFiltroSituacao");
}

function limparFiltro() {
  // TODO Aula 09:
  // 1. Limpar select
  // 2. Recarregar todos os alunos
  console.log("TODO: limparFiltro");
}

function renderizarTabela(alunos) {
  // TODO Aula 09:
  // 1. Selecionar tbody #tabelaAlunos
  // 2. Limpar conteúdo atual
  // 3. Percorrer alunos com forEach
  // 4. Criar linhas da tabela com template string
  // 5. Incluir botões Ver, Editar e Inativar
  console.log("TODO: renderizarTabela", alunos);
}

function atualizarCardsResumo(alunos) {
  // TODO Aula 09:
  // Atualizar os elementos:
  // #cardTotal
  // #cardAtivos
  // #cardFormados
  // #cardInativos
  console.log("TODO: atualizarCardsResumo", alunos);
}

function criarBadgeSituacao(situacao) {
  // TODO Aula 09:
  // Retornar uma string HTML com badge Bootstrap de acordo com a situação.
  // Ativo -> text-bg-success
  // Trancado -> text-bg-warning
  // Formado -> text-bg-primary
  // Inativo -> text-bg-secondary
  console.log("TODO: criarBadgeSituacao", situacao);
}

function abrirModalDetalhes(ra) {
  // TODO Aula 09:
  // 1. Buscar aluno na API pelo RA
  // 2. Preencher os elementos do modal
  // 3. Abrir modal com Bootstrap.Modal
  console.log("TODO: abrirModalDetalhes", ra);
}

function abrirModalInativar(ra) {
  // TODO Aula 09:
  // 1. Guardar RA selecionado
  // 2. Preencher texto do modal
  // 3. Abrir modal de confirmação
  console.log("TODO: abrirModalInativar", ra);
}

function confirmarInativacao() {
  // TODO Aula 09:
  // 1. Chamar inativarAlunoApi(raSelecionadoParaInativar)
  // 2. Fechar modal
  // 3. Recarregar tabela
  console.log("TODO: confirmarInativacao", raSelecionadoParaInativar);
}

// Opcional: carregar alunos automaticamente ao abrir a página.
// window.addEventListener("DOMContentLoaded", carregarAlunos);
