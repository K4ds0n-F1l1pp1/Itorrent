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

    //---- Aparece requisitos senha ----\\
    $('#inputSenhaUp').on('focus', function () {
        $('.requirements').stop(true, true).addClass('show');
    });
    
    $('#inputSenhaUp').on('blur', function () {
        setTimeout(() => {
            if (!document.activeElement.closest('.requirements')) {
                $('.requirements').stop(true, true).removeClass('show');
            }
        }, 150);
    });

    //---- CONTENT ----\\

    //-- Validador de CPF --\\   
    $(document).ready(function () {
        const $inputCPF = $('#cpf');
        const $errorCPF = $inputCPF.siblings('[data-error]');

        $inputCPF.on('input', function () {
            let value = $(this).val().replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
    
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
            $(this).val(value);
        });

        $inputCPF.on('blur', function () {
            const rawCPF = $(this).val().replace(/\D/g, '');
    
            if (rawCPF.length !== 11 || !isValidCPF(rawCPF)) {
                $(this).addClass('input-error');
                $errorCPF.text('CPF inválido.');
            } else {
                $(this).removeClass('input-error');
                $errorCPF.text('');
            }
        });

        function isValidCPF(cpf) {
            if (/^(\d)\1+$/.test(cpf)) return false;
    
            let soma = 0;
            for (let i = 0; i < 9; i++) {
                soma += parseInt(cpf.charAt(i)) * (10 - i);
            }
    
            let dig1 = 11 - (soma % 11);
            if (dig1 >= 10) dig1 = 0;
            if (dig1 !== parseInt(cpf.charAt(9))) return false;
    
            soma = 0;
            for (let i = 0; i < 10; i++) {
                soma += parseInt(cpf.charAt(i)) * (11 - i);
            }
    
            let dig2 = 11 - (soma % 11);
            if (dig2 >= 10) dig2 = 0;
            if (dig2 !== parseInt(cpf.charAt(10))) return false;
    
            return true;
        }
    });

    //-- Validador de E-mail --\\
    $(document).ready(function () {
        const $inputEmail = $('#inputEmailUp');
        const $errorSpan = $inputEmail.siblings('[data-error]');
    
        const isEmailValid = function (email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };
    
        $inputEmail.on('blur input', function () {
            const email = $(this).val();
    
            if (!isEmailValid(email)) {
                $inputEmail.addClass('input-error');
                $errorSpan.text('E-mail inválido. Ex: nome@dominio.com');
            } else {
                $inputEmail.removeClass('input-error');
                $errorSpan.text('');
            }
        });
    });

    //-- Validador de Senha --\\
    $(document).ready(function () {
        const $inputSenha = $('#inputSenhaUp');
        const $toggleEye = $('[data-toggle-password]');
        const $progressBar = $('[data-requirement-progress]');
        const $requirementItems = $('[data-requirement-item]');

        $toggleEye.on('click', function () {
            const isPassword = $inputSenha.attr('type') === 'password';
            $inputSenha.attr('type', isPassword ? 'text' : 'password');

            $(this)
                .toggleClass('fa-eye')
                .toggleClass('fa-eye-slash');
        });

        $inputSenha.on('input', function () {
            const senha = $(this).val();
            let pontos = 0;
    
            const regras = [
                { regex: /(?=.*[a-z])(?=.*[A-Z])/, item: $requirementItems.eq(0) },
                { regex: /(?=.*\d)/, item: $requirementItems.eq(1) },
                { regex: /(?=.*[^A-Za-z0-9])/, item: $requirementItems.eq(2) },
                { regex: /.{8,}/, item: $requirementItems.eq(3) }
            ];
    
            regras.forEach(regra => {
                if (regra.regex.test(senha)) {
                    pontos++;
                    regra.item.find('i')
                        .removeClass('fa-circle-xmark')
                        .addClass('fa-circle-check')
                        .css('color', 'green');
                } else {
                    regra.item.find('i')
                        .removeClass('fa-circle-check')
                        .addClass('fa-circle-xmark')
                        .css('color', 'red');
                }
            });
    
            const porcentagem = (pontos / regras.length) * 100;
            $progressBar.css({
                'width': `${porcentagem}%`,
                'background-color': porcentagem < 50 ? 'red' : porcentagem < 75 ? 'orange' : 'green',
                'height': '4px',
                'transition': 'width 0.3s ease'
            });
        });
    });
})