
function novaTarefa() {
    document.getElementById('caixa-tarefa').style.display = 'flex';
    document.getElementById('titulo-tarefa').focus();
}
function fecharTarefa() {
    document.getElementById('caixa-tarefa').style.display = 'none';
}
function salvarTarefa() {
    const titulo = document.getElementById('titulo-tarefa').value.trim();

    if (titulo === '') {
        alert('digite o nome da tarefa');
        return;
    }

    const lista = document.getElementById('lista-tarefas');

    const tarefa = document.createElement('div');
    tarefa.className = 'item-tarefa';

    const concluir = document.createElement('input');
    concluir.type = 'checkbox';

    const texto = document.createElement('span');
    texto.className = 'texto-tarefa';
    texto.textContent = titulo;

    concluir.onchange = function () {
        texto.classList.toggle('concluida', concluir.checked);
    };

    const acoes = document.createElement('div');
    acoes.className = 'acoes';

    const excluir = document.createElement('button');
    excluir.className = 'excluir';
    excluir.textContent = 'X';

    excluir.onclick = function () {
        tarefa.remove();
    };

    acoes.appendChild(excluir);

    tarefa.appendChild(concluir);
    tarefa.appendChild(texto);
    tarefa.appendChild(acoes);

    lista.appendChild(tarefa);

    document.getElementById('titulo-tarefa').value = '';

    fecharTarefa();
}

document.getElementById('titulo-tarefa').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        salvarTarefa();
    }
    if (event.key === 'Escape') {
        fecharTarefa();
    }
});

