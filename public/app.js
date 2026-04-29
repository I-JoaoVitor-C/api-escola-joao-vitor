// ↓ Variáveis globais para controle de estado.
let alunoEmEdicao = null;
let notaEmEdicao = null;

const formAluno = document.getElementById('form-aluno');
const formNota = document.getElementById('form-nota');
const mensagemDiv = document.getElementById('mensagem');

// ———FUNÇÕES—DE—UTILIDADE———

// ↓ Exibe feedback visual para o usuário (depende do id da div do html).
function exibirMensagem(texto, idAlvo, erro = false) {
    const elemento = document.getElementById(idAlvo); // ← Aqui ele busca o ID que vc passa.
    if (elemento) {
        elemento.innerText = texto;
        elemento.style.color = erro ? '#d9534f' : '#5cb85c';
        setTimeout(() => elemento.innerText = '', 3000);
    } else {
        console.error("ID não encontrado:", idAlvo); // ← Serve para debug.
    }
}

// ↓ Reseta o formulário de alunos.
function resetarFormAluno() {
    formAluno.reset();
    alunoEmEdicao = null;
    const btn = document.querySelector('#form-aluno button');
    btn.innerText = 'Cadastrar';
    btn.style.backgroundColor = ''; 
}

// ↓ Reseta o formulário de notas.
function resetarFormNota() {
    formNota.reset();
    notaEmEdicao = null;
    const btn = document.querySelector('#form-nota button');
    btn.innerText = 'Lançar';
    btn.style.backgroundColor = '';
}

// ———LÓGICA—DA—ENTIDADE—ALUNOS———

// ———1.—LISTAR—ALUNOS—(GET)———
async function listarAlunos() {
    try {
        const response = await fetch('/alunos');
        const alunos = await response.json();
        
        const tbody = document.querySelector('#tabela-alunos tbody');
        tbody.innerHTML = '';

        alunos.forEach(aluno => {
            tbody.innerHTML += `
                <tr>
                    <td>${aluno.id}</td>
                    <td>${aluno.nome}</td>
                    <td>${aluno.turma}</td>
                    <td>${aluno.idade}</td>
                    <td>
                        <button onclick="prepararEdicaoAluno(${aluno.id}, '${aluno.nome}', '${aluno.turma}', ${aluno.idade})">Editar</button>
                        <button onclick="removerAluno(${aluno.id})">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
    }
}

// ———2.—SALVAR/ATUALIZAR—ALUNO—(POST/PUT)———
formAluno.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        turma: document.getElementById('turma').value,
        idade: parseInt(document.getElementById('idade').value)
    };

    try {
        const url = alunoEmEdicao ? `/alunos/${alunoEmEdicao}` : '/alunos';
        const metodo = alunoEmEdicao ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            exibirMensagem(alunoEmEdicao ? 'Aluno atualizado!' : 'Aluno cadastrado!', 'mensagem-aluno');
            resetarFormAluno();
            listarAlunos();
        } else {
            const erroData = await response.json();
            exibirMensagem(erroData.erro || 'Erro na operação', 'mensagem-aluno', true);
        }
    } catch (error) {
        exibirMensagem('Erro de conexão', true);
    }
});

// ———3.—PREPARAR—EDIÇÃO—DE—ALUNO———
function prepararEdicaoAluno(id, nome, turma, idade) {
    alunoEmEdicao = id;
    document.getElementById('nome').value = nome;
    document.getElementById('turma').value = turma;
    document.getElementById('idade').value = idade;
    
    const btn = document.querySelector('#form-aluno button');
    btn.innerText = 'Atualizar';
    btn.style.backgroundColor = '#f0ad4e';
}

// ———4.—EXCLUIR—ALUNO—(DELETE)———
async function removerAluno(id) {
    if (!confirm(`Excluir aluno ID ${id}?`)) return;
    try {
        const response = await fetch(`/alunos/${id}`, { method: 'DELETE' });
        if (response.ok) {
            exibirMensagem('Aluno removido!', 'mensagem-aluno');
            listarAlunos();
        }
    } catch (error) { exibirMensagem('Erro ao excluir', true); }
}

// ———LÓGICA—DA—ENTIDADE—NOTAS———

// ———1.—LISTAR—NOTAS—(GET)———
async function listarNotas() {
    try {
        const response = await fetch('/notas');
        const notas = await response.json();
        const tbody = document.querySelector('#tabela-notas tbody');
        tbody.innerHTML = '';

        notas.forEach(n => {
            tbody.innerHTML += `
                <tr>
                    <td>${n.id}</td>
                    <td>${n.alunoId}</td>
                    <td>${n.disciplina}</td>
                    <td>${n.nota}</td>
                    <td>
                        <button onclick="prepararEdicaoNota(${n.id}, ${n.alunoId}, '${n.disciplina}', ${n.nota})">Editar</button>
                        <button onclick="removerNota(${n.id})">Excluir</button>
                    </td>
                </tr>`;
        });
    } catch (error) { console.error('Erro ao listar notas:', error); }
}

// ———2.—SALVAR/ATUALIZAR—NOTA—(POST/PUT)———
formNota.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        alunoId: parseInt(document.getElementById('nota-alunoId').value),
        disciplina: document.getElementById('disciplina').value,
        nota: parseFloat(document.getElementById('valor-nota').value)
    };

    try {
        const url = notaEmEdicao ? `/notas/${notaEmEdicao}` : '/notas';
        const metodo = notaEmEdicao ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            exibirMensagem('Nota salva!', 'mensagem-nota');
            resetarFormNota();
            listarNotas();
        } else {
            const erroData = await response.json();
            exibirMensagem(erroData.erro || 'Erro ao salvar nota', 'mensagem-nota', true);
        }
    } catch (error) { exibirMensagem('Erro de conexão', 'mensagem-nota', true); }
});

// ———3.—PREPARAR—EDIÇÃO—DE—NOTA———
function prepararEdicaoNota(id, alunoId, disciplina, valor) {
    notaEmEdicao = id;
    document.getElementById('nota-alunoId').value = alunoId;
    document.getElementById('disciplina').value = disciplina;
    document.getElementById('valor-nota').value = valor;
    
    const btn = document.querySelector('#form-nota button');
    btn.innerText = 'Atualizar';
    btn.style.backgroundColor = '#f0ad4e';
}

// ———4.—EXCLUIR—NOTA—(DELETE)———
async function removerNota(id) {
    if (!confirm(`Excluir nota ID ${id}?`)) return;
    try {
        const response = await fetch(`/notas/${id}`, { method: 'DELETE' });
        if (response.ok) {
            exibirMensagem('Nota excluída!');
            listarNotas();
        }
    } catch (error) { exibirMensagem('Erro ao excluir nota', true); }
}

// ———INICIALIZAÇÃO———
listarAlunos();
listarNotas();