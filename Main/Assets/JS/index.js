$(document).ready(function () {
    $('#toggleSenha').on('click', function () {
      const input = $('#senha');
      const type = input.attr('type') === 'password' ? 'text' : 'password';
      input.attr('type', type);
      $(this).toggleClass('fa-eye fa-eye-slash');
    });

    $('[data-form]').on('submit', function (e) {
      e.preventDefault();
      const email = $('#email').val();
      const senha = $('#senha').val();
      if (!email.includes('@') || senha.length < 6) {
        alert('Preencha corretamente os campos.');
      } else {
        alert('Login efetuado com sucesso!');
        window.location.href = "./TelaPrincipal/Main.html";
      }
    });
});