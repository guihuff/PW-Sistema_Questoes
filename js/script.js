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

const questao1 = new Questao();
questao1.text = "Assinale qual linguagem abaixo é de marcação de texto:";
questao1.respostas = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
questao1.respostacorreta = "HTML";

const questao2 = new Questao();
questao2.text = "Assinale qual linguagem abaixo é de estilo em cascata:";
questao2.respostas = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
questao2.respostacorreta = "CSS";

const questao3 = new Questao();
questao3.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao3.respostas = ["=", "!=", "==", "==="];
questao3.respostacorreta = "===";

const questao4 = new Questao();
questao4.text = "Em JavaScript, o que significa NaN:";
questao4.respostas = ["Not a Name", "Not a Number", "Not a Night", "Not a Newsletter"];
questao4.respostacorreta = "Not a Number";

const questao5 = new Questao();
questao5.text = "Como é declarado que um documento é do tipo HTML5?";
questao5.respostas = ["!DOCTYPE html", "body", "!DOCTYPE xml", "NaN"];
questao5.respostacorreta = "!DOCTYPE html";

const questao6 = new Questao();
questao6.text = "Qual dos simbolos abaixo representa o seletor universal no css? ou seja esse seletor irá referenciar todos os nós:";
questao6.respostas = ["*", "-", "#", ":::"];
questao6.respostacorreta = "*";

const questao7 = new Questao();
questao7.text = "Assinale a resposta que se refere ao tipo de display: flex?";
questao7.respostas = ["O Flexible Box Module, geralmente chamado de flexbox, foi projetado tanto como um modelo de layout unidimensional quanto como um método capaz de organizar espacialmente os elementos em uma interface", "CSS Grid Layout introduz um sistema bi-dimensional de grid (literalmente 'grades') para CSS. Grids podem ser usados para o design de layouts de grandes seções de uma webpage, assim como de pequenos elementos de interface.", "Mudando coordenadas no espaço da tela o CSS transforms permite que a posição do conteúdo afetado seja alterada sem afetar o fluxo de informação da página.", "A propriedade especifica o tipo de método de posicionamento usado para um elemento (estático, relativo, fixo, absoluto ou fixo)."];
questao7.respostacorreta = "O Flexible Box Module, geralmente chamado de flexbox, foi projetado tanto como um modelo de layout unidimensional quanto como um método capaz de organizar espacialmente os elementos em uma interface", "CSS Grid Layout introduz um sistema bi-dimensional de grid (literalmente 'grades') para CSS. Grids podem ser usados para o design de layouts de grandes seções de uma webpage, assim como de pequenos elementos de interface.";

const questao8 = new Questao();
questao8.text = "Vários elementos HTML podem compartilhar a mesma __________. Seletor de _________ é representado por um ponto “.”, e tem como alvo todos os elementos que possuem um determinado valor no atributo ____________. Selecione a opção que preenche as lacunas corretamente";
questao8.respostas = ["classe, id, class", "id, name, class", "name, id, id", "classe, classe, class"];
questao8.respostacorreta = "classe, classe, class";

const questao9 = new Questao();
questao9.text = "O atributo global ___ define um identificador exclusivo. Seletor _______ é representado pelo sinal “#”, e tem como alvo todos os elementos que possuem um determinado valor no atributo _________. Selecione a opção que preenche as lacunas corretamente";
questao9.respostas = ["id, id, id", "class, class, id", "name, name, data", "class, class, class"];
questao9.respostacorreta = "id, id, id";

const questao10 = new Questao();
questao10.text = "Qual das resposta abaixo não é um evento valido em JavaScript?";
questao10.respostas = ["onclick", "onload", "onprint", "onmouseover"];
questao10.respostacorreta = "onprint";

const listQuestions = [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10];
const aluno = new AlunoResposta();

let travel = 0;

$(document).ready(() => {
    $('#btn-menu-lateral').click(() => {
        $('#menu-lateral').slideToggle('slow', () => {});
        $('#container-questions').toggleClass( 'col-lg-10 col-md-9 col-sm-8' );
    }); 
    $('.btn-questions').click((event) => {
        event.preventDefault();
    });
    $('body').ready(() => {
        createElement(listQuestions);
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
        if ( aluno.respostas[i] === listQuestions[i].respostacorreta ){
            cont++;
        }
    }
    aluno.resultado = cont;
    let divContainer = $('<div></div>').addClass('row border py-3 px-1 rounded');
    let pResponse = $('<p></p>').addClass('text-secondary pl-1').append(`${aluno.email}`);
    let h5Response = $('<h5></h5>').addClass('font-monospace text-secondary pl-1').append(`${aluno.nome} ${aluno.sobrenome}`);
    let h4Response = $('<h5></h5>').addClass('font-monospace text-secondary pl-1').append(`ACERTOU: ${aluno.resultado}`);
    divContainer.append(h5Response).append(pResponse).append('<hr>').append(h4Response);
    $('#cont-resposta').prepend(divContainer);
}