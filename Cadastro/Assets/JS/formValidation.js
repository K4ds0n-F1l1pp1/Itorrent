$(document).ready( function() {

    //---- Loading do botão ----\\
    $('.form').on('submit', function (e) {
        e.preventDefault();

        $('#fakeLoading').css('display', 'flex').fadeIn();
    
        const tempoAleatorio = Math.random() * (1500 - 500) + 500;
    
        setTimeout(function () {
            $('#fakeLoading').fadeOut(function() {
                $('#fakeLoading').css('display', 'none');
            });
    
            window.location.href = "../index.html";
            alert("Cadastro realizado com sucesso!");
        }, tempoAleatorio);
    });
})