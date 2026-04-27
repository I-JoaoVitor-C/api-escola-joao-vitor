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
    res.json(aluno);
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