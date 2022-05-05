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
questao4.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao4.respostas = ["=", "!=", "==", "==="];
questao4.respostacorreta = "===";

const questao5 = new Questao();
questao5.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao5.respostas = ["=", "!=", "==", "==="];
questao5.respostacorreta = "===";

const questao6 = new Questao();
questao6.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao6.respostas = ["=", "!=", "==", "==="];
questao6.respostacorreta = "===";

const questao7 = new Questao();
questao7.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao7.respostas = ["=", "!=", "==", "==="];
questao7.respostacorreta = "===";

const questao8 = new Questao();
questao8.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao8.respostas = ["=", "!=", "==", "==="];
questao8.respostacorreta = "===";

const questao9 = new Questao();
questao9.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao9.respostas = ["=", "!=", "==", "==="];
questao9.respostacorreta = "===";

const questao10 = new Questao();
questao10.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao10.respostas = ["=", "!=", "==", "==="];
questao10.respostacorreta = "===";

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
        check = checkQuestions();

        if (check) {
            console.log(aluno);
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
/*
<div class="row border py-3 px-1 rounded mx-0 mb-4">
    <h5 class="font-monospace text-secondary pl-1 col-12">Qustão Numero 1</h5>
    <p>Descrição da Questão. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut est vehicula purus auctor sagittis interdum et ligula. Aenean sollicitudin odio sed vulputate ornare. Sed sed vulputate mauris, in fringilla felis. Cras cursus eget tortor ac pellentesque. Sed ullamcorper tellus vel dignissim blandit.</p>
    <div class="form-check col-12">
        <input type="radio" id="html" class="form-check-input" name="question-1" value="HTML" >
        <label for="html" class="form-check-label">HTML</label>
    </div>
    <div class="form-check col-12">
        <input type="radio" id="css" class="form-check-input" name="question-1" value="CSS">
        <label for="css" class="form-check-label">CSS</label>
    </div>
    <div class="form-check col-12">
        <input type="radio" id="javascript" class="form-check-input" name="question-1" value="JavaScript">
        <label for="javascript" class="form-check-label">JavaScript</label>
    </div>
    <div class="form-check col-12">
        <input type="radio" id="php" class="form-check-input" name="question-1" value="PHP">
        <label for="php" class="form-check-label">PHP</label>
    </div>
</div>
*/