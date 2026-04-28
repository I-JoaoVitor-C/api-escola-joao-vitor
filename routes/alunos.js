const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
// ↓ Definindo caminho para arquivo alunos.json.
const dataPath = path.join(__dirname, '../data/alunos.json');

// ↓ Função para ler arquivo alunos.json.
const readData = () => {

    // ↓ Usando try/catch para tratamento de erros.
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } 
    
    catch (error) {
        return [];
    }
};

// ↓ Função para escrever no arquivo alunos.json.
const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// ↓ Rota GET, mostrando/listando todos os alunos.

router.get ('/', (req, res) => {
    const alunos = readData();
    res.json(alunos);
});

// ↓ Rota GET, buscar aluno por id.

router.get ('/:id', (req, res) => {
    const alunos = readData();
    const aluno = alunos.find(a => a.id === parseInt(req.params.id));

    if (!aluno) {
        return res.status(404).json({erro: "Aluno não encontrado" });
    }
    res.json(aluno);
});

// ↓ Rota POST, para adicionar aluno.

router.post('/', (req, res) => {
    const { nome, turma, idade } = req.body;
    const alunos = readData();

    // ↓ Validação de dados obrigatórios.
    if (!nome || !turma || !idade) {
        return res.status(400).json({ erro: "Todos os campos (nome, turma, idade) são obrigatórios" });
    }

    const novoAluno = {
        id: alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1, // ← ID gerado automaticamente.
        nome,
        turma,
        idade: parseInt(idade)
    };

    alunos.push(novoAluno);
    writeData(alunos);
    res.status(201).json(novoAluno); // ← Retorna 201, que indica que deu tudo certo na criação.
});

// ↓ Rota PUT, para atualizar aluno.
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, turma, idade } = req.body;
    const alunos = readData();
    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Aluno não encontrado para atualização" });
    }

    // ↓ Atualiza apenas os campos enviados ou mantém os atuais.
    alunos[index] = { 
        ...alunos[index], 
        nome: nome || alunos[index].nome, 
        turma: turma || alunos[index].turma, 
        idade: idade ? parseInt(idade) : alunos[index].idade 
    };

    writeData(alunos);
    res.json(alunos[index]);
});

// ↓ Rota DELETE/alunos/:id, deleta aluno por id.
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let alunos = readData();
    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Aluno não encontrado para remoção" });
    }

    alunos = alunos.filter(a => a.id !== id);
    writeData(alunos);
    res.json({ mensagem: "Aluno removido com sucesso" });
});

module.exports = router;