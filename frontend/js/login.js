
const form = document.getElementById('formLogin');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    try {
        const resposta = await fetch('http://localhost:3001/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            localStorage.setItem('token', dados.token);
            localStorage.setItem('usuario', JSON.stringify(dados.usuario));

            mensagem.textContent = 'Login realizado com sucesso!';

            setTimeout(function() {
                window.location.href = 'tarefas.html';
            }, 1000);

        } else {
            mensagem.textContent = dados.mensagem || 'E-mail ou senha invalidos.';
        }

    } catch (erro) {
        mensagem.textContent = 'Nao foi possivel conectar ao servidor.';
    }
});
