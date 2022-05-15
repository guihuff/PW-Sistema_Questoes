
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
const questaoQS = () => {
    const questao1 = new Questao();
    questao1.text = `A norma ISO 9126 descreve um modelo de qualidade de um produto de software. O padrão identifica seis atributos fundamentais de qualidade. Relacione a Coluna 1 à Coluna 2, associando os nomes de alguns atributos de qualidade definidos na ISO 9126 com suas respectivas definições.
    <br>
    Coluna 1
    <br>
    1. Funcionalidade.
    <br>
    2. Confiabilidade.
    <br>
    3. Eficiência.
    <br>
    4. Usabilidade.
    <br>
    Coluna 2  
    <br>
    ( ) O quanto o software fica disponível para uso, levando-se em conta aspectos como maturidade, tolerância a falhas e facilidade de recuperação.
    <br>
    ( ) O grau com que o software satisfaz às necessidades declaradas pelos interessados.
    <br>
    ( ) O grau de facilidade de utilização do software.
    <br>
    ( ) O grau de otimização do uso, pelo software, dos recursos do sistema.
    <br>
    A ordem correta de preenchimento dos parênteses, de cima para baixo, é:`;
    questao1.respostas = ["1 – 2 – 3 – 4", "2 – 1 – 4 – 3", "1 – 3 – 4 – 2", "2 – 3 – 1 – 4"];
    questao1.respostacorreta = "2 – 1 – 4 – 3";

    const questao2 = new Questao();
    questao2.text = "A norma ISO/IEC, que fornece um modelo de referência básica na avaliação de produto de software com a definição de características de qualidade de software, tais como: Funcionalidade, Confiabilidade, Usabilidade, Eficiência, Manutenibilidade, Portabilidade, Segurança e Compatibilidade, é a norma: ";
    questao2.respostas = ["L13709", "25010:2011", "21500:2012", "11801-1:2017 "];
    questao2.respostacorreta = "25010:2011";

    const questao3 = new Questao();
    questao3.text = "ISO/IEC 9126 é uma norma ISO para qualidade de produto de software. Ela define um conjunto de parâmetros com o objetivo de padronizar a avaliação da qualidade de software e se enquadra no modelo de qualidade das normas da família 9000. Assinale a alternativa que corresponde a duas sub características dos Atributos de Qualidade da Norma ISO/IEC 9126. ";
    questao3.respostas = ["Funcionalidade: adequação e maturidade", "Confiabilidade: tolerância a falhas e utilização de recursos", "Eficiência: recuperabilidade e atratividade", "Usabilidade: inteligibilidade e conformidade"];
    questao3.respostacorreta = "Usabilidade: inteligibilidade e conformidade";

    const questao4 = new Questao();
    questao4.text = "Um dos fatores de qualidade definidos nas normas de software estabelece o nível com que o software faz uso otimizado dos recursos do sistema. Tal fator corresponde à propriedade da";
    questao4.respostas = ["usabilidade", "funcionalidade", "eficiência", "portabilidade"];
    questao4.respostacorreta = "eficiência";

    const questao5 = new Questao();
    questao5.text = "Considerando os aspectos de manutenibilidade, assinale a opção que apresenta a caraterística de qualidade de software que corresponde à capacidade do produto de permitir o diagnóstico de deficiências ou de causas de falhas, bem como a identificação das partes a serem modificadas.";
    questao5.respostas = ["analisabilidade", "modularidade", "modificabilidade", "testabilidade"];
    questao5.respostacorreta = "analisabilidade";

    const questao6 = new Questao();
    questao6.text = "Assinale abaixo qual é uma ferramenta de controle de versão:";
    questao6.respostas = ["GIT", "Figma", "VSCODE", "ClickUp"];
    questao6.respostacorreta = "GIT";

    const questao7 = new Questao();
    questao7.text = `FATORES DE QUALIDADE ISO 9126, relacione as colunas<br>
    COLUNA 1<br>
    I. Funcionalidade<br>
    II. Confiabilidade<br>
    III. Usabilidade<br>
    IV. Eficiência<br>
    COLUNA 2<br>
    ( ) Satisfaz necessidades declaradas (adequabilidade, exatidão, interoperabilidade, conformidade e segurança).<br>
    ( ) Quanto tempo o software fica disponível para uso (maturidade, tolerância a falhas, facilidade de recuperação).<br>
    ( ) Grau de facilidade de utilização (compreensão, Fácil aprendizagem e operabilidade).<br>
    ( ) Grau de otimização de tempo e recursos.<br>
    `; 
    questao7.respostas = ["II - III - I - IV", "I - II - III - IV", "I - III - IV - I", "IV - III - II - I"];
    questao7.respostacorreta = "I - II - III - IV";

    const questao8 = new Questao();
    questao8.text = "Qual das alternativas abaixo não é uma Metodologia Ágil?";
    questao8.respostas = ["Scrum", "XP", "ASD", "GIT"];
    questao8.respostacorreta = "GIT";

    const questao9 = new Questao();
    questao9.text = "Selecione um traço individual desejado para uma equipe ágil";
    questao9.respostas = ["Habilidade para tomar decisão", "Falta de Caráter", "Incompetência", "Confiança mútua e desrespeito"];
    questao9.respostacorreta = "Habilidade para tomar decisão";

    const questao10 = new Questao();
    questao10.text = "Selecione a opção que não faz parte dos três pilares do Scrum:";
    questao10.respostas = ["Transparência", "Inspeção", "Adaptação", "Manutenção"];
    questao10.respostacorreta = "Manutenção";

    const questao11 = new Questao();
    questao11.text = "SCRUM - CONCEITOS<br> Um time Box dentro do qual um conjunto de atividades deve ser executadp, ou seja uma iteração no processo de desenvolvimento.";
    questao11.respostas = ["Sprint", "Backlog", "Versão", "Meeting"];
    questao11.respostacorreta = "Sprint";

    const questao12 = new Questao();
    questao12.text = "SCRUM - CONCEITOS<br> Lista de todas as funcionalidades desejadas para o produto:";
    questao12.respostas = ["Sprint", "Backlog", "Versão", "Meeting"];
    questao12.respostacorreta = "Backlog";

    const questao13 = new Questao();
    questao13.text = "SCRUM - CONCEITOS<br> Representa o interesse de todos os envolvidos, define as funcionalidades do produto, prioriza o product backlog";
    questao13.respostas = ["Product Owner(PO)", "Scrum Master", "Developer", "Tester"];
    questao13.respostacorreta = "Product Owner(PO)";

    const questao14 = new Questao();
    questao14.text = "SCRUM - CONCEITOS<br> Responsavel por garantir a prática do Scrum, facilita o Daily Scrum, Responsável por eliminar qualquer obstáculo detectado";
    questao14.respostas = ["Product Owner(PO)", "Scrum Master", "Developer", "Tester"];
    questao14.respostacorreta = "Scrum Master";

    const questao15 = new Questao();
    questao15.text = "O teste de __________ é baseado nos requisitos funcionais. Como não há conhecimento sobre a operação interna do programa, o avaliador se concentra nas funções que o software deve desempenhar.";
    questao15.respostas = ["estresse", "trofél", "caixa-branca", "caixa-preta"];
    questao15.respostacorreta = "caixa-preta";

    const questao16 = new Questao();
    questao16.text = "Qual o Teste dos componentes individuais de uma aplicação";
    questao16.respostas = ["estresse", "unidade", "caixa-branca", "caixa-preta"];
    questao16.respostacorreta = "unidade";

    const questao17 = new Questao();
    questao17.text = "Garante que as dependências funcionais entre componentes estejam perfeitamente implementadas.";
    questao17.respostas = ["integração", "unidade", "caixa-branca", "caixa-preta"];
    questao17.respostacorreta = "integração";

    const questao18 = new Questao();
    questao18.text = "Qual o primeiro nivel do SW-CMM";
    questao18.respostas = ["Inicial", "Gerenciado", "Definido", "Quantitativamente Gerenciado"];
    questao18.respostacorreta = "Inicial";

    const questao19 = new Questao();
    questao19.text = "Qual o segundo nivel do SW-CMM";
    questao19.respostas = ["Inicial", "Definido", "Gerenciado", "Quantitativamente Gerenciado"];
    questao19.respostacorreta = "Gerenciado";

    const questao20 = new Questao();
    questao20.text = "Qual o quinto e ultimo nivel do SW-CMM";
    questao20.respostas = ["Inicial", "Definido", "Otimização", "Gerenciado"];
    questao20.respostacorreta = "Otimização";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
}
const questaoPW = () => {
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

    const questao10 = new Questao();
    questao10.text = "Qual das resposta abaixo não é um evento valido em JavaScript?";
    questao10.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao10.respostacorreta = "onprint";

    const questao11 = new Questao();
    questao11.text = "Selecione a resposta correta: Evento responsavel por executar uma ação ao carregar um componente?";
    questao11.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao11.respostacorreta = "onload";

    const questao12 = new Questao();
    questao12.text = "Selecione a resposta correta: Evento acionado quando o usuario sai da pagina?";
    questao12.respostas = ["onclick", "onload", "onunload", "onmouseover"];
    questao12.respostacorreta = "onunload";

    const questao13 = new Questao();
    questao13.text = "Selecione a resposta correta: Evento acionado quando o elemento recebe um duplo clique?";
    questao13.respostas = ["onclick", "onload", "onprint", "ondblclick"];
    questao13.respostacorreta = "ondblclick";

    const questao14 = new Questao();
    questao14.text = "Selecione a resposta correta: Evento executado quando o usuário coloca o cursor sobre uma determinada área ou objeto?";
    questao14.respostas = ["onclick", "onload", "onprint", "onmouseover"];
    questao14.respostacorreta = "onprint";

    const questao15 = new Questao();
    questao15.text = "Selecione a resposta correta: Evento executado quando o usuário retira o cursor sobre uma determinada área ou objeto?";
    questao15.respostas = ["onclick", "onload", "onmouseout", "onmouseover"];
    questao15.respostacorreta = "onmouseout";

    const questao16 = new Questao();
    questao16.text = "Selecione a resposta correta: Evento executado quando o usuário quando o usuário move o mouse?";
    questao16.respostas = ["onload", "onmousemove", "onclick", "onmouseover"];
    questao16.respostacorreta = "onmousemove";

    const questao17 = new Questao();
    questao17.text = "Selecione o evento de tecla:";
    questao17.respostas = ["onclick", "onkeydown", "onload", "onmouseover"];
    questao17.respostacorreta = "onkeydown";

    const questao18 = new Questao();
    questao18.text = "JavaScript é uma linguagem:";
    questao18.respostas = ["Fracamente tipada", "Fortemente tipada", "Não tipada", "De marcação"];
    questao18.respostacorreta = "Fracamente tipada";

    const questao19 = new Questao();
    questao19.text = "Propriedade CSS que adiciona uma borda a um elemento:";
    questao19.respostas = ["border", "margin", "padding", "display"];
    questao19.respostacorreta = "border";

    const questao20 = new Questao();
    questao20.text = "Qual é a Tag HTML responsavel por encapsular um paragrafo?";
    questao20.respostas = ["p", "br", "h1", "hr"];
    questao20.respostacorreta = "p";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
}
const questaoSIA = () => {
    const questao1 = new Questao();
    questao1.text = "Uma das ferramentas que auxilia no processo de tomada de decisão é a árvore de decisão. Ela se caracteriza por";
    questao1.respostas = ["ser uma técnica que permite a visualização gráfica das possibilidades ou alternativas de decisões", "gerar uma tabela ilustrativa das várias possibilidades de decisões e seus respectivos resultados", "idealizar uma matriz que compara várias alternativas com atribuições de pesos para diferentes critérios de decisões", "análisar prós e contras, vantagens e desvantagens sobre diferentes tomadas de decisões"];
    questao1.respostacorreta = "ser uma técnica que permite a visualização gráfica das possibilidades ou alternativas de decisões";

    const questao2 = new Questao();
    questao2.text = "Na técnica de árvore de decisão em data mining, é empregada a abordagem denominada";
    questao2.respostas = ["análise de volumetria", "combinação de variáveis", "estratificação", "avaliação de dados"];
    questao2.respostacorreta = "estratificação";

    const questao3 = new Questao();
    questao3.text = "Raciocínio Incerto<br>Dos agentes abaixo qual não é baseado em busca";
    questao3.respostas = ["Busca cega", "Busca heurística", "Busca local", "Prolog"];
    questao3.respostacorreta = "Prolog";

    const questao4 = new Questao();
    questao4.text = "Raciocínio Incerto<br>Lógica proposicional, Lógica de primeira ordem, Prolog, são agentes baseados em: ";
    questao4.respostas = ["Busca", "Lógica", "Array", "heurística"];
    questao4.respostacorreta = "Lógica";

    const questao5 = new Questao();
    questao5.text = "Diante de informações parciais ou imprecisas,apenas soluções aproximadas podem ser obtidas,isto é,soluções com _________";
    questao5.respostas = ["incerteza", "certeza", "decisão", "lógica"];
    questao5.respostacorreta = "incerteza";

    const questao6 = new Questao();
    questao6.text = "O pensamento _________ fornece uma abordagem probabilística para aprendizagem";
    questao6.respostas = ["Bayesiano", "Juliano", "Plano", "Flat"];
    questao6.respostacorreta = "Bayesiano";

    const questao7 = new Questao();
    questao7.text = "A Lógica ______ é baseada na teoria dos conjuntos _______";
    questao7.respostas = ["fuzzy, fuzzy", "fuzzy, bayesiana", "bayeisiana, bayeisiana", "bayeisiana, fuzzy"];
    questao7.respostacorreta = "fuzzy, fuzzy";

    const questao8 = new Questao();
    questao8.text = "Entretanto, na lógica ________, uma premissa varia em gra u deverd adede 0 a 1, o que levaa ser parcialmente verdadeiraou parcialmente falsa";
    questao8.respostas = ["bayesiana", "tree", "fuzzy", "pseudo"];
    questao8.respostacorreta = "fuzzy";

    const questao9 = new Questao();
    questao9.text = "Logica Fuzzy é: ";
    questao9.respostas = ["sim/não", "verdadeiro/falso", "difusa", "doida"];
    questao9.respostacorreta = "difusa";

    const questao10 = new Questao();
    questao10.text = "A lógica _______ é um superconjunto da lógica booleana e acrescenta o conceito de verdade parcial, isto é, gradações ou níveis de verdade. Assim, os conceitos de união, interseção e exclusão possuem significados diferentes nas duas lógicas.";
    questao10.respostas = ["fuzzy", "tree", "pseudo", "bayesiana"];
    questao10.respostacorreta = "fuzzy";

    const questao11 = new Questao();
    questao11.text = "Devido ao fato de pressupor independência entre atributos, o algoritmo ______________ é capaz de realizar, com precisão, o treinamento de um modelo com uma quantidade reduzida de amostras.";
    questao11.respostas = ["fuzzy", "naive bayes", "neoquimico", "bayes"];
    questao11.respostacorreta = "naive bayes";

    const questao12 = new Questao();
    questao12.text = "A idéia básica do algoritmo é testar os atributos mais importantes primeiro. Isso se trata de:";
    questao12.respostas = ["Logica Fuzzy", "Árvore de Decisão", "Naive Bayes", "Todas as anteriores"];
    questao12.respostacorreta = "Árvore de Decisão";

    const questao13 = new Questao();
    questao13.text = "Uma das medidas baseadas em impureza é o ____________, o qual usa a entropia como medida de impureza";
    questao13.respostas = ["Ganho de Informação", "Ganho de Busca", "Perda de Informação", "Busca de Ganho"];
    questao13.respostacorreta = "Ganho de Informação";

    const questao14 = new Questao();
    questao14.text = "Qual dos algoritimos não é uma árvore de decisão:";
    questao14.respostas = ["ID3", "CART", "C4.5", "Naive Bayes"];
    questao14.respostacorreta = "Naive Bayes";

    const questao15 = new Questao();
    questao15.text = "Qual dos algoritimos é/gera uma árvore de decisão:";
    questao15.respostas = ["C4.5", "Fuzzy", "Naive Bayes", "Todas as anteriores"];
    questao15.respostacorreta = "C4.5";

    const questao16 = new Questao();
    questao16.text = "Computadores são capazes de aprender da forma que os humanos aprendem?";
    questao16.respostas = ["Sim", "Não", "Sem duvidas", "Com certeza"];
    questao16.respostacorreta = "Não";

    const questao17 = new Questao();
    questao17.text = "Frameworks de Aprendizadode Máquina<br> Assinale qual desses não é um Framework de aprendizagem de maquina";
    questao17.respostas = ["H2O.ai", "PYTORCH", "ANACONDA", "NODE.JS"];
    questao17.respostacorreta = "NODE.JS";

    const questao18 = new Questao();
    questao18.text = "Frameworks de Aprendizadode Máquina<br> Assinale qual desses é um Framework de aprendizagem de maquina";
    questao18.respostas = ["Caffe2", "NODE.JS", "DJANGO", "REACT.JS"];
    questao18.respostacorreta = "Caffe2";

    const questao19 = new Questao();
    questao19.text = "O que a sigua IA significa em Sistemas Inteligentes:";
    questao19.respostas = ["Inauguração Algoritmica", "Inter Artificial", "Inteligência Artificial", "Inteligência Analoga"];
    questao19.respostacorreta = "Inteligência Artificial";

    const questao20 = new Questao();
    questao20.text = `Relacione as colunas:<br>
    Coluna 1:<br>
    1 AprendizadoSupervisionado<br>
    2 AprendizadoNãoSupervisionado<br>
    3 AprendizadoPor Reforço<br>
    Coluna 2:<br>
    ( ) Treinado através de exposição continua a cenários
    ( ) Treinado com a supervisão de exemplos
    ( ) Treinado com reforço positivo ou negativo a suas decisões
    `;
    questao20.respostas = ["2 - 1 - 3", "3 - 2 - 1", "1 - 2 - 3", "3 - 1 - 2"];
    questao20.respostacorreta = "2 - 1 - 3";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
}
const questaoREDES = () => {
    const questao1 = new Questao();
    questao1.text = "Qual o nome da ferramenta de linha de comando para aferir informações sobre a rede em um sistema operacional Windows 10?";
    questao1.respostas = ["ifconfig", "netconfig", "toolsip", "ipconfig"];
    questao1.respostacorreta = "ipconfig";

    const questao2 = new Questao();
    questao2.text = "Selecione o IP incorreto";
    questao2.respostas = ["192.168.2.2", "192.199.2.1", "192.255.255.252", "192.300.4.2"];
    questao2.respostacorreta = "192.300.4.2";

    const questao3 = new Questao();
    questao3.text = "Selecione o endereço de REDE";
    questao3.respostas = ["192.0.0.0", "192.0.1.1", "192.0.1.5", "192.1.1.1"];
    questao3.respostacorreta = "192.0.0.0";

    const questao4 = new Questao();
    questao4.text = "Qual dessas mascaras de rede pertence a classe C?";
    questao4.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "192.2.2.1"];
    questao4.respostacorreta = "255.255.255.0";

    const questao5 = new Questao();
    questao5.text = "Qual dessas mascaras de rede pertence a classe B?";
    questao5.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.192"];
    questao5.respostacorreta = "255.255.0.0";

    const questao6 = new Questao();
    questao6.text = "Qual dessas mascaras de rede pertence a classe A?";
    questao6.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.192"];
    questao6.respostacorreta = "255.0.0.0";

    const questao7 = new Questao();
    questao7.text = "O endereço 10.0.0.0 pertence a qual classe?";
    questao7.respostas = ["Classe A", "Classe B", "Classe C", "Classe D"];
    questao7.respostacorreta = "Classe A";

    const questao8 = new Questao();
    questao8.text = "O endereço 178.18.0.0 pertence a qual classe?";
    questao8.respostas = ["Classe A", "Classe B", "Classe C", "Classe D"];
    questao8.respostacorreta = "Classe B";

    const questao9 = new Questao();
    questao9.text = "O endereço 192.10.10.0 pertence a qual classe?";
    questao9.respostas = ["Classe A", "Classe B", "Classe C", "Classe D"];
    questao9.respostacorreta = "Classe C";

    const questao10 = new Questao();
    questao10.text = "Qual a mascara de uma rede 192.10.2.0/26?";
    questao10.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.192"];
    questao10.respostacorreta = "255.255.255.192";

    const questao11 = new Questao();
    questao11.text = "Qual a mascara de uma rede 192.10.2.0/25";
    questao11.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.128"];
    questao11.respostacorreta = "255.255.255.128";

    const questao12 = new Questao();
    questao12.text = "Qual a mascara de uma rede 192.10.2.0/27";
    questao12.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.224"];
    questao12.respostacorreta = "255.255.255.224";

    const questao13 = new Questao();
    questao13.text = "Qual a mascara de uma rede 192.10.2.0/30";
    questao13.respostas = ["255.255.255.0", "255.0.0.0", "255.255.0.0", "255.255.255.252"];
    questao13.respostacorreta = "255.255.255.252";

    const questao14 = new Questao();
    questao14.text = "Assinale a alternativa que apresenta a topologia física de rede de computadores em que há a utilização de um único cabo backbone, que é terminado em ambas as extremidades, e cujos hosts são conectados diretamente a esse cabo.";
    questao14.respostas = ["topologia em anel", "topologia em estrela", "topologia em malha", "topologia em barramento"];
    questao14.respostacorreta = "topologia em barramento";

    const questao15 = new Questao();
    questao15.text = "Qual dos endereços IPV6 abaixo não é valido?";
    questao15.respostas = ["CAFE::", "F80:CAFE::", "TUDO::", "CAFE:D89::"];
    questao15.respostacorreta = "TUDO::";

    const questao16 = new Questao();
    questao16.text = "Qual o endereço de loopback de uma rede IPV6?";
    questao16.respostas = ["::1", "::0:A", "A::", "1::"];
    questao16.respostacorreta = "::1";

    const questao17 = new Questao();
    questao17.text = "Qual o endereço de loopback de uma rede IPV4?";
    questao17.respostas = ["127.0.0.1", "128.0.0.1", "::1", "0.0.0.1"];
    questao17.respostacorreta = "127.0.0.1";

    const questao18 = new Questao();
    questao18.text = "O endereço F80:8D:: é a compressão de qual endereço";
    questao18.respostas = ["F80:008D::0000:0000:7777", "127.9.0.0", "0F80:008D:0000:0000:0000:0000:0000:0000", "192.0.0.0"];
    questao18.respostacorreta = "0F80:008D:0000:0000:0000:0000:0000:0000";

    const questao19 = new Questao();
    questao19.text = "Selecione o IPV4 valido:";
    questao19.respostas = ["192.2.1.3", "::1", "193.256.0.0", "1.0.1:256"];
    questao19.respostacorreta = "192.2.1.3";

    const questao20 = new Questao();
    questao20.text = "Qual das alternativas representa um IPV6 com o maximo de compressão?";
    questao20.respostas = ["F8::66", "0F8:0:0:0033::", "0D8:1::", "J::1"];
    questao20.respostacorreta = "F8::66";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
}
const questaoLSO = () => {
    const questao1 = new Questao();
    questao1.text = "LINUX <br>O que o comando cp faz?";
    questao1.respostas = ["copia", "move", "deleta", "cria"];
    questao1.respostacorreta = "copia";

    const questao2 = new Questao();
    questao2.text = "UBUNTU <br>Qual dos comandos abaixo é responsavel por fazer o download de um pacote no linux?";
    questao2.respostas = ["apt", "cp", "rm", "ifconfig"];
    questao2.respostacorreta = "apt";

    const questao3 = new Questao();
    questao3.text = "LINUX <br> Qual é o comando responsavel por mover algo via terminal";
    questao3.respostas = ["cp", "rm", "mv", "touch"];
    questao3.respostacorreta = "mv";

    const questao4 = new Questao();
    questao4.text = "Qual dos comando abaixo mostra as opções de rede no Linux?";
    questao4.respostas = ["ip add show", "ipconfig", "ipweb", "netip show"];
    questao4.respostacorreta = "ip add show";

    const questao5 = new Questao();
    questao5.text = "Qual o nome da ferramenta de linha de comando para aferir informações sobre a rede em um sistema operacional Windows 10?";
    questao5.respostas = ["ifconfig", "netconfig", "toolsip", "ipconfig"];
    questao5.respostacorreta = "ipconfig";

    const questao6 = new Questao();
    questao6.text = "Ao acionar o comando rm /home com permisão de super usuário o que acontece?";
    questao6.respostas = ["vai deletar a pasta /home", "vai acusar um erro pois é um diretório", "nada", "vai deletar a pasta /"];
    questao6.respostacorreta = "vai acusar um erro pois é um diretório";

    const questao7 = new Questao();
    questao7.text = "Qual comando para deletar um diretório no linux?";
    questao7.respostas = ["rm", "rm -r", "mv", "cp"];
    questao7.respostacorreta = "rm -r";

    const questao8 = new Questao();
    questao8.text = "Um conjunto de setores do HD que são endereçados pelo sistema operacional como uma única unidade lógica. Em outras palavras, um cluster é a menor parcela do HD que pode ser acessada pelo sistema operacional, é chamdo de";
    questao8.respostas = ["Strip", "Espelhamento", "Cluster", "SSD"];
    questao8.respostacorreta = "Cluster";

    const questao9 = new Questao();
    questao9.text = "Este sistema também é conhecido como striping (fracionamento), o nível ____________ é aquele onde os dados são divididos em pequenos segmentos e distribuídos entre os discos;";
    questao9.respostas = ["RAID 1", "RAID 2", "RAID 0", "RAID 5"];
    questao9.respostacorreta = "RAID 0";

    const questao10 = new Questao();
    questao10.text = "Neste modelo de RAID, uma unidade 'duplica' a outra, isto é, faz uma 'cópia' da primeira, razão pela qual nível também é conhecido como mirroring (espelhamento);";
    questao10.respostas = ["RAID 1", "RAID 2", "RAID 0", "RAID 5"];
    questao10.respostacorreta = "RAID 1";

    const questao11 = new Questao();
    questao11.text = "O comando para listar todas as partições e discos no linux é?";
    questao11.respostas = ["fdisk -l", "fdisk", "ls", "ls -l"];
    questao11.respostacorreta = "";

    const questao12 = new Questao();
    questao12.text = "O comando para listar todos os arquivos em um diretório é:";
    questao12.respostas = ["ls", "cp", "df", "mv"];
    questao12.respostacorreta = "ls";

    const questao13 = new Questao();
    questao13.text = "O comando para listar todos os arquivos até ocultos em um diretório é:";
    questao13.respostas = ["ls", "ls -a", "df", "mv"];
    questao13.respostacorreta = "ls -a";

    const questao14 = new Questao();
    questao14.text = "Qual a representação do diretório root do linux?";
    questao14.respostas = ["/home", "/usr", "/opt", "/"];
    questao14.respostacorreta = "/";

    const questao15 = new Questao();
    questao15.text = "Ao executar o comando<br> mv hello.html index.html<br> o que acontece?";
    questao15.respostas = ["Altera o nome do arquivo hello.html para index.html", "nada", "copia o arquivo hello", "lista todos os arquivos"];
    questao15.respostacorreta = "Altera o nome do arquivo hello.html para index.html";

    const questao16 = new Questao();
    questao16.text = "Qual o comando para ler um arquivo no terminal?";
    questao16.respostas = ["leitura", "ls", "cat", "drop"];
    questao16.respostacorreta = "cat";

    const questao17 = new Questao();
    questao17.text = "Como executar comandos em modo root no linux?";
    questao17.respostas = ["Usar sudo no inicio", "Usar sudo no final", "Usar rt no inicio", "Usar root no inicio"];
    questao17.respostacorreta = "Usar sudo no inicio";

    const questao18 = new Questao();
    questao18.text = "Qual o comando para trocar a senha de um usuario?";
    questao18.respostas = ["sudo password -a", "sudo passwd <usuario>", "ps <usuario>", "nem uma das alternativas"];
    questao18.respostacorreta = "sudo passwd <usuario>";

    const questao19 = new Questao();
    questao19.text = "Comando para procurar um arquivo por um padrão, o qual possui um filtro muito útil e é extremamente utilizado em shell;";
    questao19.respostas = ["sudo", "cp", "grep", "ls"];
    questao19.respostacorreta = "grep";

    const questao20 = new Questao();
    questao20.text = "O comando _____ conta linhas, palavras e também caracteres dentro de um arquivo;";
    questao20.respostas = ["cp", "wc", "grep", "ls"];
    questao20.respostacorreta = "wc";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
}
const questaoGIT = () => {
    const questao1 = new Questao();
    questao1.text = "A _________ se refere à capacidade de modificar uma ideia em um produto ou serviço.";
    questao1.respostas = ["inovação", "venda", "ciência", "compra"];
    questao1.respostacorreta = "inovação";

    const questao2 = new Questao();
    questao2.text = "Em relação a Revolução industrial selecione a opção que se encaixa: <br> Mecanização, Força Hidráulica, Máquina a vapor";
    questao2.respostas = ["Primeira", "Segunda", "Terceira", "Quarta"];
    questao2.respostacorreta = "Primeira";

    const questao3 = new Questao();
    questao3.text = "Em relação a Revolução industrial selecione a opção que se encaixa: <br> Produção em massa, linha de montagem, eletricidade";
    questao3.respostas = ["Primeira", "Segunda", "Terceira", "Quarta"];
    questao3.respostacorreta = "Segunda";

    const questao4 = new Questao();
    questao4.text = "Em relação a Revolução industrial selecione a opção que se encaixa: <br> Computador e automação";
    questao4.respostas = ["Primeira", "Segunda", "Terceira", "Quarta"];
    questao4.respostacorreta = "Terceira";

    const questao5 = new Questao();
    questao5.text = "Em relação a Revolução industrial selecione a opção que se encaixa: <br> Sistemas ciber-físicos";
    questao5.respostas = ["Primeira", "Segunda", "Terceira", "Quarta"];
    questao5.respostacorreta = "Quarta";

    const questao6 = new Questao();
    questao6.text = "No contexto das inovações, há três elementos internos das organizações que viabilizam o aproveitamento das oportunidades:<br> Selecione a opção que não faz parte deses elementos.";
    questao6.respostas = ["ambiente propício à inovação", "pessoas criativas (empresários, colaboradores, funcionários), preparadas e estimuladas para inovar", "processo (ou método) sistemático e contínuo", "Ambiente Rápido"];
    questao6.respostacorreta = "Ambiente Rápido";

    const questao7 = new Questao();
    questao7.text = "Desenvolvimentos científicos e tecnológicos conduzem a inserções do conhecimento.<br> Selecione a alternativa que corresponde a essa definição:";
    questao7.respostas = ["Indicíduos criativos", "Arquitetura Organizacional e Vínculos externos", "Funções e atividades operacionais das empresas", "Nem uma"];
    questao7.respostacorreta = "Indicíduos criativos";

    const questao8 = new Questao();
    questao8.text = "Mudanças da sociedade e necessidades de mercado conduxem as demandas e oportunidades<br> Selecione a alternativa que corresponde a essa definição:";
    questao8.respostas = ["Indicíduos criativos", "Arquitetura Organizacional e Vínculos externos", "Funções e atividades operacionais das empresas", "Nem uma"];
    questao8.respostacorreta = "Arquitetura Organizacional e Vínculos externos";

    const questao9 = new Questao();
    questao9.text = "Firmas desenvolvem conhecimento, produtos e processos<br> Selecione a alternativa que corresponde a essa definição:";
    questao9.respostas = ["Indicíduos criativos", "Arquitetura Organizacional e Vínculos externos", "Funções e atividades operacionais das empresas", "Nem uma"];
    questao9.respostacorreta = "Funções e atividades operacionais das empresas";

    const questao10 = new Questao();
    questao10.text = "Selecione a opção que não faz parte das três etapas de um funil de oportunidades:";
    questao10.respostas = ["Teste de aceitação", "Avaliação de oportunidades", "Avaliação de projetos", "Desenvolvimento"];
    questao10.respostacorreta = "Teste de aceitação";

    const questao11 = new Questao();
    questao11.text = "Etapas do processo de inovação<br> Selecione a correta apartir da definição:<br> Quais são as oportunidades no meio, o que mudaria realmente um produto, serviço ou empresa que ainda não foi feito?  ";
    questao11.respostas = ["Avaliação", "Geração de novas ideias", "Experimentação", "Comercialização"];
    questao11.respostacorreta = "Geração de novas ideias";

    const questao12 = new Questao();
    questao12.text = "Etapas do processo de inovação<br> Selecione a correta apartir da definição:<br>o que é necessário para colocar isso em prática, se é possível e como viabilizar?";
    questao12.respostas = ["Avaliação", "Geração de novas ideias", "Experimentação", "Comercialização"];
    questao12.respostacorreta = "Avaliação";

    const questao13 = new Questao();
    questao13.text = "Etapas do processo de inovação<br> Selecione a correta apartir da definição:<br> É  fundamental que o que foi pensado seja testado, identificando o que realmente funciona ou que é necessário aprimorar.";
    questao13.respostas = ["Avaliação", "Geração de novas ideias", "Experimentação", "Comercialização"];
    questao13.respostacorreta = "Experimentação";

    const questao14 = new Questao();
    questao14.text = "Etapas do processo de inovação<br> Selecione a correta apartir da definição:<br>Chegou ao ponto ideal? É a hora de oferecer ao público o que antes existia apenas internamente ou como um projeto.";
    questao14.respostas = ["Avaliação", "Geração de novas ideias", "Experimentação", "Comercialização"];
    questao14.respostacorreta = "Comercialização";

    const questao15 = new Questao();
    questao15.text = "Etapas do processo de inovação<br> Selecione a correta apartir da definição:<br>Acompanhar o que foi implementado é parte importante para entender a aceitação, o público e a estratégia. Para isso, o feedback é essencial.";
    questao15.respostas = ["Avaliação", "Geração de novas ideias", "Acompanhamento", "Comercialização"];
    questao15.respostacorreta = "Acompanhamento";

    const questao16 = new Questao();
    questao16.text = "<img src='img/Inovacao-1.png' class='img-fluid'><br>Apartir da imagem selecione o modelo de inovação correspondente:";
    questao16.respostas = ["Modelo Paralelo", "Modelo Linear", "Modelo Modelo Tidd et Alii", "Modelo Inovação Aberta"];
    questao16.respostacorreta = "Modelo Linear";

    const questao17 = new Questao();
    questao17.text = "<img src='img/Inovacao-2.png' class='img-fluid'><br>Apartir da imagem selecione o modelo de inovação correspondente:";
    questao17.respostas = ["Modelo Paralelo", "", "Modelo Modelo Tidd et Alii", "Modelo Inovação Aberta"];
    questao17.respostacorreta = "Modelo Paralelo";

    const questao18 = new Questao();
    questao18.text = "<img src='img/Inovacao-3.png' class='img-fluid'><br>Apartir da imagem selecione o modelo de inovação correspondente:";
    questao18.respostas = ["Modelo Paralelo", "Modelo Linear", "Modelo Modelo Tidd et Alii", "Modelo Inovação Aberta"];
    questao18.respostacorreta = "Modelo Modelo Tidd et Alii";

    const questao19 = new Questao();
    questao19.text = "<img src='img/Inovacao-4.png' class='img-fluid'><br>Apartir da imagem selecione o modelo de inovação correspondente:";
    questao19.respostas = ["Modelo Paralelo", "Modelo Linear", "Modelo Modelo Tidd et Alii", "Modelo Inovação Aberta"];
    questao19.respostacorreta = "Modelo Inovação Aberta";

    const questao20 = new Questao();
    questao20.text = "Qual das opções abaixo é uma empresa do paraná que utiliza o modelo de inovação aberta?";
    questao20.respostas = ["LAR Cooperativa", "Unisul", "Nokia", "Nubank"];
    questao20.respostacorreta = "LAR Cooperativa";

    return [questao1, questao2, questao3, questao4, questao5, questao6, questao7, questao8, questao9, questao10, questao11, questao12, questao13, questao14, questao15, questao16, questao17, questao18, questao19, questao20];
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
