const formulario = document.querySelector("#formReserva");

const campoNome = document.querySelector("#nome");
const campoEmail = document.querySelector("#email");
const campoTelefone = document.querySelector("#telefone");
const campoNascimento = document.querySelector("#data-nasc");
const campoCheckin = document.querySelector("#data-CI");
const campoCheckout = document.querySelector("#data-CO");
const campoHospedes = document.querySelector("#qtd-hospedes");
const campoQuarto = document.querySelector("#quarto");
const campoSenha = document.querySelector("#senha");
const campoConfirmacaoSenha = document.querySelector("#confirmacaoSenha");
const campoCheck = document.querySelector("#check");

const erroNome = document.querySelector("#erroNome");
const erroEmail = document.querySelector("#erroEmail");
const erroTelefone = document.querySelector("#erroTelefone");
const erroNascimento = document.querySelector("#erroDataNasc");
const erroCheckin = document.querySelector("#erroDataCI");
const erroCheckout = document.querySelector("#erroDataCO");
const erroHospedes = document.querySelector("#erroQtdHosp");
const erroQuarto = document.querySelector("#erroQuarto");
const erroSenha = document.querySelector("#erroSenha");
const erroConfirmacaoSenha = document.querySelector("#erroConfimarcaoSenha");
const erroCheck = document.querySelector("#erroCheck");

const camposComErro = [
    campoNome,
    campoEmail,
    campoTelefone,
    campoNascimento,
    campoCheckin,
    campoCheckout,
    campoHospedes,
    campoQuarto,
    campoSenha,
    campoConfirmacaoSenha,
    campoCheck
];

const mensagensDeErro = [
    erroNome,
    erroEmail,
    erroTelefone,
    erroNascimento,
    erroCheckin,
    erroCheckout,
    erroHospedes,
    erroQuarto,
    erroSenha,
    erroConfirmacaoSenha,
    erroCheck
];


function mostrarErro(campo, elementoErro, mensagem) {
    campo.classList.add("is-invalid");
    elementoErro.innerText = mensagem;

    campo.style.borderColor = "red";
    elementoErro.style.color = "red";
}


function limparErros() {
    camposComErro.forEach(function(campo) {
        campo.classList.remove("is-invalid");
        campo.style.borderColor = "";
    });

    mensagensDeErro.forEach(function(elementoErro) {
        elementoErro.innerText = "";
    });

    const resultadoAntigo = document.querySelector("#resultadoReserva");

    if(resultadoAntigo !== null) {
        resultadoAntigo.remove();
    }
}


function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento + "T00:00:00");

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aniversarioAindaNaoOcorreu =
        hoje.getMonth() < nascimento.getMonth()
        ||
        (
            hoje.getMonth() === nascimento.getMonth()
            &&
            hoje.getDate() < nascimento.getDate()
        );

    if(aniversarioAindaNaoOcorreu) {
        idade--;
    }

    return idade;
}


formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    limparErros();

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const telefone = campoTelefone.value.trim();
    const nascimento = campoNascimento.value;
    const checkin = campoCheckin.value;
    const checkout = campoCheckout.value;
    const hospedes = Number(campoHospedes.value);
    const quarto = campoQuarto.value;
    const senha = campoSenha.value;
    const confirmacaoSenha = campoConfirmacaoSenha.value;
    const aceitouCondicoes = campoCheck.checked;

    let formValido = true;


    // Validar nome
    if(nome === "") {

        mostrarErro(
            campoNome,
            erroNome,
            "Nome é obrigatório!"
        );

        formValido = false;

    } else if(nome.length < 5) {

        mostrarErro(
            campoNome,
            erroNome,
            "O nome deve possuir pelo menos 5 caracteres."
        );

        formValido = false;

    } else if(nome.split(" ").length < 2) {

        mostrarErro(
            campoNome,
            erroNome,
            "Informe nome e sobrenome."
        );

        formValido = false;
    }


    // Validar email
    if(email === "") {

        mostrarErro(
            campoEmail,
            erroEmail,
            "Email é obrigatório!"
        );

        formValido = false;

    } else if(campoEmail.validity.typeMismatch) {

        mostrarErro(
            campoEmail,
            erroEmail,
            "Informe um email válido."
        );

        formValido = false;
    }


    // Validar telefone
    const telefoneNumero = Number(telefone);

    if(
        telefone.length !== 11
        ||
        !Number.isInteger(telefoneNumero)
    ) {

        mostrarErro(
            campoTelefone,
            erroTelefone,
            "O telefone deve possuir exatamente 11 números."
        );

        formValido = false;
    }


    // Validar nascimento
    if(nascimento === "") {

        mostrarErro(
            campoNascimento,
            erroNascimento,
            "A data de nascimento é obrigatória."
        );

        formValido = false;

    } else if(calcularIdade(nascimento) < 18) {

        mostrarErro(
            campoNascimento,
            erroNascimento,
            "O responsável pela reserva deve possuir 18 anos ou mais."
        );

        formValido = false;
    }


    // Validar check-in
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);

    if(checkin === "") {

        mostrarErro(
            campoCheckin,
            erroCheckin,
            "A data de check-in é obrigatória."
        );

        formValido = false;

    } else {

        const dataCheckin = new Date(checkin + "T00:00:00");

        if(dataCheckin < hoje) {

            mostrarErro(
                campoCheckin,
                erroCheckin,
                "O check-in não pode ser anterior à data atual."
            );

            formValido = false;
        }
    }


    // Validar check-out
    if(checkout === "") {

        mostrarErro(
            campoCheckout,
            erroCheckout,
            "A data de check-out é obrigatória."
        );

        formValido = false;

    } else if(checkin !== "") {

        const dataCheckin = new Date(checkin + "T00:00:00");
        const dataCheckout = new Date(checkout + "T00:00:00");

        if(dataCheckout <= dataCheckin) {

            mostrarErro(
                campoCheckout,
                erroCheckout,
                "O check-out deve ser posterior ao check-in."
            );

            formValido = false;
        }
    }


    // Validar hóspedes
    if(
        !Number.isInteger(hospedes)
        ||
        hospedes < 1
        ||
        hospedes > 5
    ) {

        mostrarErro(
            campoHospedes,
            erroHospedes,
            "A quantidade de hóspedes deve estar entre 1 e 5."
        );

        formValido = false;
    }


    // Validar quarto
    if(quarto === "") {

        mostrarErro(
            campoQuarto,
            erroQuarto,
            "Selecione um tipo de quarto."
        );

        formValido = false;

    } else if(quarto === "individual" && hospedes > 1) {

        mostrarErro(
            campoQuarto,
            erroQuarto,
            "O quarto individual permite apenas 1 hóspede."
        );

        formValido = false;

    } else if(quarto === "duplo" && hospedes > 2) {

        mostrarErro(
            campoQuarto,
            erroQuarto,
            "O quarto duplo permite no máximo 2 hóspedes."
        );

        formValido = false;

    } else if(quarto === "familia" && hospedes > 5) {

        mostrarErro(
            campoQuarto,
            erroQuarto,
            "O quarto família permite no máximo 5 hóspedes."
        );

        formValido = false;
    }


    // Validar senha
    const possuiMaiuscula =
        senha !== senha.toLowerCase();

    const possuiNumero =
        senha.split("0").length > 1
        ||
        senha.split("1").length > 1
        ||
        senha.split("2").length > 1
        ||
        senha.split("3").length > 1
        ||
        senha.split("4").length > 1
        ||
        senha.split("5").length > 1
        ||
        senha.split("6").length > 1
        ||
        senha.split("7").length > 1
        ||
        senha.split("8").length > 1
        ||
        senha.split("9").length > 1;


    if(senha.length < 8) {

        mostrarErro(
            campoSenha,
            erroSenha,
            "A senha deve possuir pelo menos 8 caracteres."
        );

        formValido = false;

    } else if(!possuiMaiuscula) {

        mostrarErro(
            campoSenha,
            erroSenha,
            "A senha deve possuir pelo menos uma letra maiúscula."
        );

        formValido = false;

    } else if(!possuiNumero) {

        mostrarErro(
            campoSenha,
            erroSenha,
            "A senha deve possuir pelo menos um número."
        );

        formValido = false;
    }


    // Confirmar senha
    if(confirmacaoSenha !== senha) {

        mostrarErro(
            campoConfirmacaoSenha,
            erroConfirmacaoSenha,
            "As senhas devem ser iguais."
        );

        formValido = false;
    }


    // Aceitar condições
    if(!aceitouCondicoes) {

        mostrarErro(
            campoCheck,
            erroCheck,
            "Você deve aceitar as condições da reserva."
        );

        formValido = false;
    }


    // Reserva válida
    if(formValido) {

        const reserva = {
            nome: nome,
            email: email,
            telefone: telefone,
            checkin: checkin,
            checkout: checkout,
            hospedes: hospedes,
            quarto: quarto
        };


        const painel = document.createElement("div");

        painel.id = "resultadoReserva";


        const mensagem = document.createElement("h3");

        mensagem.innerText =
            "Solicitação de reserva realizada com sucesso!";


        const resultado = document.createElement("pre");

        resultado.innerText =
            JSON.stringify(reserva, null, 2);


        painel.appendChild(mensagem);
        painel.appendChild(resultado);

        formulario.appendChild(painel);
    }

});