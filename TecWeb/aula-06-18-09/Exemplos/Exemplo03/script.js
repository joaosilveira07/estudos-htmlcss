const formulario = document.querySelector("#formAluno");

const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoMatricula = document.querySelector("#matricula");
const campoNascimento = document.querySelector("#nascimento");
const campoCurso = document.querySelector("#curso");
const campoSemestre = document.querySelector("#semestre");
const campoSenha = document.querySelector("#senha");
const campoConfirmacaoSenha = document.querySelector("#confirmacaoSenha");
const campoTermos = document.querySelector("#termos");

const erroNome = document.querySelector("#erroNome");
const erroEmail = document.querySelector("#erroEmail");
const erroMatricula = document.querySelector("#erroMatricula");
const erroNascimento = document.querySelector("#erroNascimento");
const erroCurso = document.querySelector("#erroCurso");
const erroSemestre = document.querySelector("#erroSemestre");
const erroSenha = document.querySelector("#erroSenha");
const erroConfirmacaoSenha = document.querySelector("#erroConfirmacaoSenha");
const erroTermos = document.querySelector("#erroTermos");

const painelResultado = document.querySelector("#painelResultado");
const resultado = document.querySelector("#resultado");

const camposComErro = [
    campoNome,
    campoEmail,
    campoMatricula,
    campoNascimento,
    campoCurso,
    campoSemestre,
    campoSenha,
    campoConfirmacaoSenha,
    campoTermos
];

const mensagensDeErro = [
    erroNome,
    erroEmail,
    erroMatricula,
    erroNascimento,
    erroCurso,
    erroSemestre,
    erroSenha,
    erroConfirmacaoSenha,
    erroTermos
];

function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("is-invalid");
    elementoErro.innerText = mensagem;
}

function limparErros() {
    camposComErro.forEach(function (campo) {
        campo.classList.remove("is-invalid");
    });

    mensagensDeErro.forEach(function (elementoErro) {
        elementoErro.innerText = "";
    });
}

function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(`${dataNascimento}T00:00:00`);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const aniversarioAindaNaoOcorreu =
        hoje.getMonth() < nascimento.getMonth()
        || (
            hoje.getMonth() === nascimento.getMonth()
            && hoje.getDate() < nascimento.getDate()
        );

    if (aniversarioAindaNaoOcorreu) {
        idade--;
    }

    return idade;
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    limparErros();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const matricula = campoMatricula.value.trim();
    const dataNascimento = campoNascimento.value;
    const curso = campoCurso.value;
    const semestre = Number(campoSemestre.value);
    const senha = campoSenha.value;
    const confirmacaoSenha = campoConfirmacaoSenha.value;

    let formValido = true;

    // Validação campo nome
    if (nome === ""){
        mostrarErro(campoNome, erroNome, "O nome é obrigatório");
        formValido = false;
    } else if (nome.length < 5){
        mostrarErro(campoNome, erroNome, "O nome deve possuir mais que 5 caracteres");
        formValido = false;
    } else if (nome.split(/\s+/) < 2) {
        mostrarErro(campoNome, erroNome, "Digite nome e sobrenome");
        formValido = false;
    }

    // Validação campo email
    if (email === ""){
        mostrarErro(campoEmail, erroEmail, "O Email é obrigatório");
        formValido = false;
    } else if (campoEmail.validity.typeMismath) {
        mostrarErro(campoEmail, erroEmail, "Digite um Email válido");
        formValido = false;
    } else if (!email.endsWith("@aluno.edu.br")) {
        mostrarErro(campoEmail, erroEmail, "Informe um Email @aluno.edu.br");
        formValido = false;
    }

    // Validação campo matricula
    const formatoMatricula = /^[0-9]{8}$/;
    if (!formatoMatricula.test(matricula)) {
        mostrarErro(campoMatricula, erroMatricula, "A matrícula deve possuir exatamente 8 dígitos númericos.");
        formValido = false;
    }

    // Validação campo dataNasc
    if (dataNascimento === ""){
        mostrarErro(campoNascimento, erroNascimento, "Data de nascimento é obrigatória.");
        formValido = false;
    } else {
        const nascimento = new Date(`${dataNascimento}T00:00:00`);
        const hoje = new Date();

        if (nascimento > hoje) {
            mostrarErro(campoMatricula, erroMatricula, "A data de nascimento não pode ser uma data futura.");
            formValido = false;
        } else if (calcularIdade(dataNascimento < 18 || calcularIdade(dataNascimento > 100))) {
            mostrarErro(campoMatricula, erroMatricula, "Data de nascimento inválida.");
            formValido = false;
        }
    }

    // Validar semestre
    if (!Number.isInteger(semestre) || semestre < 1 || semestre > 10) {
        mostrarErro(campoSemestre, erroSemestre, "Digite um semestre válido.");
        formValido = false;
    }

    // Validar senha 
    const possuiMaiuscula = /[A-Z]/.test(senha);
    const possuiMinuscula = /[a-z]/.test(senha);
    const possuiNumero = /[0-9]/.test(senha);
    const possuiEspecial = /[#|@|!|_|*]/.test(senha);

    if (senha.length < 8){
        mostrarErro(campoSenha, erroSenha, "Senha precisa ter no mínimo 8 caracteres.");
        formValido = false;
    } else if (!possuiEspecial || !possuiMaiuscula || !possuiMinuscula || !possuiNumero) {
        mostrarErro(campoSenha, erroSenha, "Senha não segue as exigências.");
        formValido = false;
    }

    // Validar checkbox
    if (!campoTermos.checked){
        mostrarErro(campoTermos, erroTermos, "Confirme que os dados estão corretos.");
        formValido = false;
    }

    if (!formValido) {
        painelResultado.classList.add("d-none");
        return;
    }

    const aluno = {
        nome, email, matricula, dataNascimento, curso, semestre
    };

    resultado.innerText = JSON.stringify(aluno, null, 2);
    painelResultado.classList.remove("d-none");
});
