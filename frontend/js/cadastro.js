
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const mensagem = document.getElementById('mensagem');

    if (senha !== confirmarSenha) {
        mensagem.textContent = 'As senhas nao sao iguais!';
        return;
    }

    try {
        const resposta = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            mensagem.textContent = 'Cadastro realizado com sucesso!';

            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);

        } else {
            mensagem.textContent = dados.mensagem || 'Erro ao realizar cadastro.';
        }

    } catch (erro) {
        mensagem.textContent = 'Nao foi possivel conectar ao servidor.';
    }
});