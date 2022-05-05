class Questao {
    text;
    respostas;
    respostacorreta;
}

const questao1 = new Questao();
questao1.text = "Assinale qual linguagem abaixo é de marcação de texto:";
questao1.resposta1 = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
questao1.respostacorreta = "HTML";

const questao2 = new Questao();
questao2.text = "Assinale qual linguagem abaixo é de estilo em cascata:";
questao2.resposta1 = ["CSS", "HTML", "JAVASCRIPT", "PHP"];
questao2.respostacorreta = "CSS";

const questao3 = new Questao();
questao3.text = "Em JavaScript, qual desses sinais abaixo representa a comparação de tipo (type) e conteúdo:";
questao3.resposta1 = ["=", "!=", "==", "==="];
questao3.respostacorreta = "===";

const questao4 = new Questao();

const questao5 = new Questao();

const questao6 = new Questao();

const questao7 = new Questao();

const questao8 = new Questao();

const questao9 = new Questao();

const questao10 = new Questao();


const listQuestions = [];

let travel = 0;

$(document).ready(() => {
    $('#btn-menu-lateral').click(() => {
        $('#menu-lateral').slideToggle('slow', () => {});
        $('#container-questions').toggleClass( 'col-lg-10 col-md-9 col-sm-8' );
    }); 
    $('.btn-questions').click((event) => {
        event.preventDefault();

    })
});

const proxQuestion = () => {
    $(`#${travel}`).toggleClass('disable');
    $(`#${(travel+1)}`).toggleClass('disable');
    travel = travel+1;
}
const antQuestion = () => {
    $(`#${travel}`).toggleClass('disable');
    $(`#${(travel-1)}`).toggleClass('disable');
    travel = travel-1;
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