$(document).ready(() => {
    $('#btn-menu-lateral').click(() => {
        $('#menu-lateral').slideToggle('slow', () => {});
        $('#container-questoes').toggleClass( 'col-lg-10 col-md-9 col-sm-8' );
    });  
});