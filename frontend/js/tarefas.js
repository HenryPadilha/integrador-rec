
const API_URL = 'http://localhost:3001';
let tarefaEditando = null;

async function carregarTarefas() {
    const token = localStorage.getItem('token');
    const lista = document.getElementById('lista-tarefas');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    try {
        const resposta = await fetch(API_URL + '/tarefas', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (resposta.status === 401 || resposta.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = 'login.html';
            return;
        }

        const tarefas = await resposta.json();

        lista.innerHTML = '';

        if (!resposta.ok) {
            lista.textContent = 'Erro ao carregar tarefas.';
            return;
        }

        if (tarefas.length === 0) {
            lista.textContent = 'Voce ainda nao tem tarefas.';
            return;
        }

        tarefas.forEach(function(tarefa) {
            const caixa = document.createElement('div');
            const titulo = document.createElement('h3');
            const descricao = document.createElement('p');
            const editar = document.createElement('button');
            const excluir = document.createElement('button');

            titulo.textContent = tarefa.titulo;
            descricao.textContent = tarefa.descricao || '';
            editar.textContent = 'Editar';
            excluir.textContent = 'Excluir';

            editar.onclick = function() {
                editarTarefa(tarefa);
            };

            excluir.onclick = function() {
                excluirTarefa(tarefa.id);
            };

            caixa.appendChild(titulo);
            caixa.appendChild(descricao);
            caixa.appendChild(editar);
            caixa.appendChild(excluir);

            lista.appendChild(caixa);
        });

    } catch (erro) {
        lista.textContent = 'Nao foi possivel conectar ao servidor.';
    }
}

function novaTarefa() {
    tarefaEditando = null;

    document.getElementById('titulo-caixa').textContent = 'Adicionar tarefa';
    document.getElementById('titulo-tarefa').value = '';
    document.getElementById('descricao-tarefa').value = '';
    document.getElementById('mensagem').textContent = '';
    document.getElementById('caixa-tarefa').style.display = 'flex';
}

function fecharTarefa() {
    document.getElementById('caixa-tarefa').style.display = 'none';
}

async function salvarTarefa() {
    const token = localStorage.getItem('token');
    const titulo = document.getElementById('titulo-tarefa').value.trim();
    const descricao = document.getElementById('descricao-tarefa').value.trim();
    const mensagem = document.getElementById('mensagem');

    if (!titulo) {
        mensagem.textContent = 'Digite o nome da tarefa.';
        return;
    }

    try {
        let url = API_URL + '/tarefas';
        let metodo = 'POST';

        if (tarefaEditando !== null) {
            url = API_URL + '/tarefas/' + tarefaEditando;
            metodo = 'PUT';
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao
            })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            fecharTarefa();
            carregarTarefas();
        } else {
            mensagem.textContent = dados.mensagem || 'Erro ao salvar tarefa.';
        }

    } catch (erro) {
        mensagem.textContent = 'Nao foi possivel conectar ao servidor.';
    }
}

function editarTarefa(tarefa) {
    tarefaEditando = tarefa.id;

    document.getElementById('titulo-caixa').textContent = 'Editar tarefa';
    document.getElementById('titulo-tarefa').value = tarefa.titulo;
    document.getElementById('descricao-tarefa').value = tarefa.descricao || '';
    document.getElementById('mensagem').textContent = '';
    document.getElementById('caixa-tarefa').style.display = 'flex';
}

async function excluirTarefa(id) {
    const token = localStorage.getItem('token');

    if (!confirm('Deseja excluir esta tarefa?')) {
        return;
    }

    try {
        const resposta = await fetch(API_URL + '/tarefas/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            carregarTarefas();
        } else {
            alert(dados.mensagem || 'Erro ao excluir tarefa.');
        }

    } catch (erro) {
        alert('Nao foi possivel conectar ao servidor.');
    }
}

function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

function verPerfil() {
    const dados = localStorage.getItem('usuario');

    if (dados) {
        const usuario = JSON.parse(dados);
        alert('Nome: ' + usuario.nome + '\nE-mail: ' + usuario.email);
    } else {
        alert('Dados do usuario nao encontrados.');
    }
}

carregarTarefas();