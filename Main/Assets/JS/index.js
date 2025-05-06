$(document).ready(function () {
  $('#toggleSenha').on('click', function () {
    const input = $('#senha');
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  $('[data-form]').on('submit', function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const senha = $('#senha').val().trim();

    if (!email.includes('@') || senha.length < 3) {
      alert('Preencha corretamente os campos.');
      return;
    }

    // Simulação de banco de dados
    const users = {
      "cliente@teste.com": { senha: "123", tipo: "cliente" },
      "admin@teste.com": { senha: "Admin@123", tipo: "admin" },
      "tecnico@teste.com": { senha: "tec123", tipo: "tecnico" }
    };

    if (users[email] && users[email].senha === senha) {
      const tipo = users[email].tipo;

      // Redireciona com base no tipo
      if (tipo === "cliente") {
        window.location.href = "./clientes/index.html";
      } else if (tipo === "admin") {
        window.location.href = "./admin/index.html";
      } else if (tipo === "tecnico") {
        window.location.href = "./tecnicos/index.html";
      }
    } else {
      alert("Email ou senha inválidos!");
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById('cards');
    let totalCards = 0;
    const maxCards = 30;
  
    function createCard(index) {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerText = `Card ${index}`;
      return div;
    }

    // loading de cards
    function loadCards(quantity = 6) {
      for (let i = 0; i < quantity && totalCards < maxCards; i++) {
        const card = createCard(totalCards + 1);
        section.appendChild(card);
        totalCards++;
      }
      revealCards();
    }
  
    function revealCards() {
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < window.innerHeight - 50) {
          card.classList.add('visible');
        }
      });
    }
  
    window.addEventListener('scroll', () => {
      revealCards();
  
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadCards(6);
      }
    });
  
    loadCards(6);
  });
});