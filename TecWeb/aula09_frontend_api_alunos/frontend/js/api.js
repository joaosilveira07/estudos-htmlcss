/*
  Arquivo: api.js
  Responsabilidade: concentrar as chamadas para a API.

  Backend esperado:
  http://localhost:3000

  Rotas disponíveis no backend:
  GET    /alunos
  GET    /alunos?situacao=Ativo
  GET    /alunos/:ra
  POST   /alunos
  PUT    /alunos/:ra
  DELETE /alunos/:ra
*/

const API_BASE_URL = "http://localhost:3000";

async function listarAlunosApi(situacao = "") {
  let url = `${API_BASE_URL}/alunos`;

  if (situacao){
    url += `?situacao=${encodeURIComponent(situacao)}`;
  }

  const resposta = await fetch(url); //FETCH É PRA CHAMAR API EXTERNA, QUALQUER UMA QUE SEJA
  return await tratarRespostaApi(resposta);

}

async function tratarRespostaApi(resposta) {
  const dados = await resposta.json();

  if (!resposta.ok){
    const mensagem = dados.mensagem || "Erro ao realizar a requisição."; // a variavel mensagem recebe a msg que está no body de dados ou, se estiver vazia, a mensagem padrão
    throw new Error(mensagem); //Lança novo erro
  }

  return dados;
}

async function buscarAlunoApi(ra) {
  const resposta = await fetch(`${API_BASE_URL}/alunos/${ra}`);

  return await tratarRespostaApi(resposta);
}

// QUANDO NAO DECLARA METODO É PQ É GET

async function cadastrarAlunoApi(aluno) {
  const resposta = await fetch(`${API_BASE_URL}/alunos`, {
    method: "POST", // Método POST
    headers: {
      "Content-Type": "application/json" // para avisar que é do tipo json
    },
    body: JSON.stringify(aluno) 
  });

  return await tratarRespostaApi(resposta);
}

async function atualizarAlunoApi(ra, aluno) {
  const resposta = await fetch(`${API_BASE_URL}/alunos/${ra}`, {
    method: "PUT", // Método PUT
    headers: {
      "Content-Type": "application/json" // para avisar que é do tipo json
    },
    body: JSON.stringify(aluno) 
  });

  return await tratarRespostaApi(resposta);
}

async function inativarAlunoApi(ra) {
  const resposta = await fetch(`${API_BASE_URL}/alunos/${ra}`, {
    method: "DELETE" // Método DELETE
  });

  return await tratarRespostaApi(resposta);
}
