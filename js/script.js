
/* CLASS */

class Questao {
    text;
    respostas;
    respostacorreta;
}
class AlunoResposta {
    nome;
    sobrenome;
    email;
    respostas;
    resultado;
}

// CÓDIGO
const url = $(location).attr('href');
let questionsSelected = [];

const aluno = new AlunoResposta();

let travel = 0;
// JQUERY
$(document).ready(() => {
    $('#btn-menu-lateral').click(() => {
        $('#menu-lateral').slideToggle('slow', () => {});
        $('#container-questions').toggleClass( 'col-lg-10 col-md-9 col-sm-8' );
    }); 
    $('.btn-questions').click((event) => {
        event.preventDefault();
    });
    $('body').ready(() => {

        const param = url.split('?');
        if (param[1] != undefined){
            createHeader(param[1].split('=')[1]);
            questionsSelected = sortTenQuestions(subjectSelected(param[1].split('=')[1]));
            createElement(questionsSelected);
        } else {
            $('#0').prepend($('<div></div>').addClass('text-secondary border py-3 px-1 rounded mx-0 text-center').append('Selecione uma disciplina no menu lateral'));
        }   
        
    });
    $('#finishQuestion').click(() => {
        let check = false;
        check = checkData();
        if (check) { check = checkQuestions(); }

        if (check) {
            resultQuestion();

            $('#board-questoes').toggleClass('disable');
            $('#board-resposta').toggleClass('disable');
        }
    });
});

// FUNCTIONS
const proxQuestion = () => {
    $(`#${travel}`).toggleClass('disable');
    $(`#${(travel+1)}`).toggleClass('disable');
    travel = travel+1;
}

const anteQuestion = () => {
    $(`#${travel}`).toggleClass('disable');
    $(`#${(travel-1)}`).toggleClass('disable');
    travel = travel-1;
}

const createHeader = (disciplina) => {
    let h3discForm = $('<h4></h4>').addClass('font-monospace text-secondary text-center').append(`Disciplina: ${disciplina}`);
    let h5titleForm = $('<h5></h5>').addClass('font-monospace text-secondary pl-1').append('Dados Pessoais');
    let divForm = $('<div></div>').addClass('row d-flex justify-content-start border py-3 px-1 rounded mx-0 mb-4').append(h3discForm).append(h5titleForm);
    divForm.append(`
        <div class="col-12 col-lg-4 col-md-6 m-2">
            <input id="name" type="text" class="form-control" placeholder="Nome" data-bs-toggle="tooltip" data-bs-placement="top" title="Primeiro Nome" required/>
            <label for="name" class="text-secondary" style="font-size: 0.8rem;">-- Nome</label>
        </div>
        <div class="col-12 col-lg-4 col-md-6 m-2">
            <input id="lastname" type="text" class="form-control" placeholder="Sobrenome" data-bs-toggle="tooltip" data-bs-placement="top" title="Ultimo Nome" required/>
            <label for="lastname" class="text-secondary" style="font-size: 0.8rem;">-- Sobrenome</label>
        </div>
        <div class="col-12 col-lg-6 col-md-8 m-2">
            <input id="email" type="email" class="form-control" placeholder="Email" data-bs-toggle="tooltip" data-bs-placement="top" title="Email: exemplo@email.com" required/>
            <label for="email" class="text-secondary" style="font-size: 0.8rem;">-- Email</label>
        </div>`
    );

    let divDesc = $('<div></div>').addClass('border py-3 px-1 rounded mb-4').append(`
        <h5 class="font-monospace text-secondary pl-1">Instuções</h5>
        <ul class="font-monospace text-secondary">
            <li>Preencha seu nome, sobrenome e email corretamente</li>
            <li>São 10 questõs que multipla escolha</li>
            <li>Cada questão só tem uma resposta correta</li>
            <li>Só é possivel selecionar 1 opção por questão</li>
            <li>Navegue pelas questões pelos botões de proximo (<i class="far fa-arrow-alt-circle-right"></i>) ou anterior (<i class="far fa-arrow-alt-circle-left"></i>)</li>
            <li>Cada questão vale 1 ponto. Após clicar em enviar (<i class="fa-regular fa-circle-check"></i>) não é possivel voltar, sua nota será computada e mostrada na sua tela</li>
        </ul>
        `
    );
    $('#div-btn-init').toggleClass('disable');
    $('#0').prepend(divDesc).prepend(divForm);
}

const createElement = (lista) => {
    let contador = 1;
    for ( item in lista ) {
        let divContainer = $('<div></div>').addClass('row border py-3 px-1 rounded mx-0 mb-4');
        let h5Title = $(`<h5></h5>`).addClass('font-monospace text-secondary pl-1 col-12');
        let pDescripition = $('<p></p>');
        h5Title.append(`Questão Numero ${contador}`);
        pDescripition.append(`${lista[item].text}`);
        for(let i = 0; i < 4; i++){
            let divRadio = $('<div></div>').addClass('form-check col-12');
            let inputRadio = $('<input type="radio" \>').addClass('form-check-input');
            let lableRadio = $('<label></label>').addClass('form-check-label');

            inputRadio.attr('id', `${contador}-${i}`).val(`${lista[item].respostas[i]}`).attr('name', `question-${contador}`);
            lableRadio.attr('for', `${contador}-${i}`).append(`${lista[item].respostas[i]}`);
            divRadio.append(inputRadio).append(lableRadio);
            divContainer.append(divRadio)
        }
        divContainer.prepend(pDescripition);
        divContainer.prepend(h5Title);
        $(`#${contador}`).prepend(divContainer);
        contador = contador+1;
    }
}

const checkData = () => {
    const nome = $('#name');
    const sobrenome = $('#lastname');
    const email = $('#email');

    if (nome.val() === ''){
        alert("PREENCHA O NOME");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(0)}`).toggleClass('disable');
        travel = 0;
        nome.focus();
        return false;
    } else if (sobrenome.val() === '') {
        alert("PREENCHA O SOBRENOME");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(0)}`).toggleClass('disable');
        travel = 0;
        sobrenome.focus();
        return false;
    } else if (email.val() === '') {
        alert("PREENCHA O EMAIL");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(0)}`).toggleClass('disable');
        travel = 0;
        email.focus();
        return false;
    }
    aluno.nome = nome.val();
    aluno.sobrenome = sobrenome.val();
    aluno.email = email.val();
    return true;
}

const checkQuestions = () => {
    const q1 = $("input[name='question-1']:checked").val();
    const q2 = $("input[name='question-2']:checked").val();
    const q3 = $("input[name='question-3']:checked").val();
    const q4 = $("input[name='question-4']:checked").val();
    const q5 = $("input[name='question-5']:checked").val();
    const q6 = $("input[name='question-6']:checked").val();
    const q7 = $("input[name='question-7']:checked").val();
    const q8 = $("input[name='question-8']:checked").val();
    const q9 = $("input[name='question-9']:checked").val();
    const q10 = $("input[name='question-10']:checked").val();

    if (q1 === undefined){
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(1)}`).toggleClass('disable');
        travel = 1;
        return false;
    } else if (q2 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(2)}`).toggleClass('disable');
        travel = 2;
        return false;
    } else if (q3 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(3)}`).toggleClass('disable');
        travel = 3;
        return false;
    } else if (q4 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(4)}`).toggleClass('disable');
        travel = 4;
        return false;
    } else if (q5 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(5)}`).toggleClass('disable');
        travel = 5;
        return false;
    } else if (q6 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(6)}`).toggleClass('disable');
        travel = 6;
        return false;
    } else if (q7 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(7)}`).toggleClass('disable');
        travel = 7;
        return false;
    } else if (q8 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(8)}`).toggleClass('disable');
        travel = 8;
        return false;
    } else if (q9 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(9)}`).toggleClass('disable');
        travel = 9;
        return false;
    }
    else if (q10 === undefined) {
        alert("Responda todas as questões!!");
        $(`#${travel}`).toggleClass('disable');
        $(`#${(10)}`).toggleClass('disable');
        travel = 10;
        return false;
    }
    aluno.respostas = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    
    return true;
}

const resultQuestion = () => {
    let cont = 0;
    for ( i in aluno.respostas ){
        if ( aluno.respostas[i] === questionsSelected[i].respostacorreta ){
            cont++;
        }
    }
    aluno.resultado = cont;
    let divContainer = $('<div></div>').addClass('row border py-3 px-1 rounded');
    let h3Subject = $('<h3></h3>').addClass('font-monospace text-secondary pl-1').append(`${nameSubject(url.split('?')[1].split('=')[1])}`);
    let pResponse = $('<p></p>').addClass('text-secondary pl-1').append(`${aluno.email}`);
    let h5Response = $('<h5></h5>').addClass('font-monospace text-secondary pl-1').append(`${aluno.nome} ${aluno.sobrenome}`);
    let h4Response = $('<h5></h5>').addClass('font-monospace text-secondary pl-1').append(`ACERTOU: ${aluno.resultado}`);
    
    divContainer.append(h3Subject).append(h5Response).append(pResponse).append('<hr>').append(h4Response);
    $('#cont-resposta').prepend(divContainer);
}

const nameSubject = (param) => {
    switch (param) {
        case 'qs':
            return 'Qualidade de Software';
        case 'lpw':
            return 'Linguagem de Programação Web';
        case 'sia':
            return 'Sistemas Inteligentes Aplicados';
        case 'redes':
            return 'Redes de Computadores 2';
        case 'lso':
            return 'Laboratório de SO';
        case 'git':
            return 'Gestão de Inovação e Tecnologia';
    }
}

/* BANCO DE QUESTÕES */

const questaoPW = () => {
    const questao1pw = new Questao();
    questao1pw.text = "Assinale qual linguagem abaixo é de marcação de texto:";
    questao1pw.respostas = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
    questao1pw.respostacorreta = "HTML";

    const questao2pw = new Questao();
    questao2pw.text = "Assinale qual linguagem abaixo é de estilo em cascata:";
    questao2pw.respostas = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
    questao2pw.respostacorreta = "CSS";

    const questao3pw = new Questao();
    questao3pw.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
    questao3pw.respostas = ["=", "!=", "==", "==="];
    questao3pw.respostacorreta = "===";

    const questao4pw = new Questao();
    questao4pw.text = "Em JavaScript, o que significa NaN:";
    questao4pw.respostas = ["Not a Name", "Not a Number", "Not a Night", "Not a Newsletter"];
    questao4pw.respostacorreta = "Not a Number";

    const questao5pw = new Questao();
    questao5pw.text = "Como é declarado que um documento é do tipo HTML5?";
    questao5pw.respostas = ["!DOCTYPE html", "body", "!DOCTYPE xml", "NaN"];
    questao5pw.respostacorreta = "!DOCTYPE html";

    const questao6pw = new Questao();
    questao6pw.text = "Qual dos simbolos abaixo representa o seletor universal no css? ou seja esse seletor irá referenciar todos os nós:";
    questao6pw.respostas = ["*", "-", "#", ":::"];
    questao6pw.respostacorreta = "*";

    const questao7pw = new Questao();
    questao7pw.text = "Assinale a resposta que se refere ao tipo de display: flex?";
    questao7pw.respostas = ["O Flexible Box Module, geralmente chamado de flexbox, foi projetado tanto como um modelo de layout unidimensional quanto como um método capaz de organizar espacialmente os elementos em uma interface", "CSS Grid Layout introduz um sistema bi-dimensional de grid (literalmente 'grades') para CSS. Grids podem ser usados para o design de layouts de grandes seções de uma webpage, assim como de pequenos elementos de interface.", "Mudando coordenadas no espaço da tela o CSS transforms permite que a posição do conteúdo afetado seja alterada sem afetar o fluxo de informação da página.", "A propriedade especifica o tipo de método de posicionamento usado para um elemento (estático, relativo, fixo, absoluto ou fixo)."];
    questao7pw.respostacorreta = "O Flexible Box Module, geralmente chamado de flexbox, foi projetado tanto como um modelo de layout unidimensional quanto como um método capaz de organizar espacialmente os elementos em uma interface", "CSS Grid Layout introduz um sistema bi-dimensional de grid (literalmente 'grades') para CSS. Grids podem ser usados para o design de layouts de grandes seções de uma webpage, assim como de pequenos elementos de interface.";

    const questao8pw = new Questao();
    questao8pw.text = "Vários elementos HTML podem compartilhar a mesma __________. Seletor de _________ é representado por um ponto “.”, e tem como alvo todos os elementos que possuem um determinado valor no atributo ____________. Selecione a opção que preenche as lacunas corretamente";
    questao8pw.respostas = ["classe, id, class", "id, name, class", "name, id, id", "classe, classe, class"];
    questao8pw.respostacorreta = "classe, classe, class";

    const questao9pw = new Questao();
    questao9pw.text = "O atributo global ___ define um identificador exclusivo. Seletor _______ é representado pelo sinal “#”, e tem como alvo todos os elementos que possuem um determinado valor no atributo _________. Selecione a opção que preenche as lacunas corretamente";
    questao9pw.respostas = ["id, id, id", "class, class, id", "name, name, data", "class, class, class"];
    questao9pw.respostacorreta = "id, id, id";

    const questao10pw = new Questao();
    questao10pw.text = "Qual das resposta abaixo não é um evento valido em JavaScript?";
    questao10pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao10pw.respostacorreta = "onprint";

    const questao11pw = new Questao();
    questao11pw.text = "Questão11?";
    questao11pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao11pw.respostacorreta = "onprint";

    const questao12pw = new Questao();
    questao12pw.text = "Questão 12?";
    questao12pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao12pw.respostacorreta = "onprint";

    const questao13pw = new Questao();
    questao13pw.text = "Questão 13?";
    questao13pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao13pw.respostacorreta = "onprint";

    const questao14pw = new Questao();
    questao14pw.text = "Questão 14?";
    questao14pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao14pw.respostacorreta = "onprint";

    const questao15pw = new Questao();
    questao15pw.text = "Questão 15";
    questao15pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao15pw.respostacorreta = "onprint";

    const questao16pw = new Questao();
    questao16pw.text = "Questão 16";
    questao16pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao16pw.respostacorreta = "onprint";

    const questao17pw = new Questao();
    questao17pw.text = "Questão 17";
    questao17pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao17pw.respostacorreta = "onprint";

    const questao18pw = new Questao();
    questao18pw.text = "Questão 18";
    questao18pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao18pw.respostacorreta = "onprint";

    const questao19pw = new Questao();
    questao19pw.text = "Questão 19";
    questao19pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao19pw.respostacorreta = "onprint";

    const questao20pw = new Questao();
    questao20pw.text = "Questão 20";
    questao20pw.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao20pw.respostacorreta = "onprint";

    return [questao1pw, questao2pw, questao3pw, questao4pw, questao5pw, questao6pw, questao7pw, questao8pw, questao9pw, questao10pw, questao11pw, questao12pw, questao13pw, questao14pw, questao15pw, questao16pw, questao17pw, questao18pw, questao19pw, questao20pw];
}
const sortTenQuestions = (list) => {
    let values = [];
    let selectValues = [];
    for (let i = 0; i < 10; i++){
        const value = Math.floor(Math.random() * 20);
        if ( values.includes(value) ) {
            i--;
        } else {
            values.push(value);
        }
    }
    for (i in values) {
        selectValues.push(list[values[i]]);
    }
    return selectValues;
}
const subjectSelected = (param) => {
    switch (param) {
        case 'qs':
            return questaoQS();
        case 'lpw':
            return questaoPW();
        case 'sia':
            return questaoSIA();
        case 'redes':
            return questaoREDES();
        case 'lso':
            return questaoLSO();
        case 'git':
            return questaoGIT();
    }
}
