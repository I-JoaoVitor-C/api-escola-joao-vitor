const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const pathNotas = path.join(__dirname, '../data/notas.json');
const pathAlunos = path.join(__dirname, '../data/alunos.json');
// ↓ Função para ler arquivo alunos.json para verificar posteriormente se o alunoId existe.
const readAlunos = () => {
    try {
        return JSON.parse(fs.readFileSync(pathAlunos, 'utf-8'));
    } catch (e) { return []; }
};

const readData = () => {
    try {
        const data = fs.readFileSync(pathNotas, 'utf-8');
        return JSON.parse(data);
    } catch (e) { return []; }
};

const writeData = (data) => fs.writeFileSync(pathNotas, JSON.stringify(data, null, 2));

// ↓ Listar todas as notas
router.get('/', (req, res) => {
    res.json(readData());
});

// ↓ Rota POST/, serve para criar nota (deve validar se alunoId existe).
router.post('/', (req, res) => {
    const { alunoId, disciplina, nota } = req.body;
    if (!alunoId || !disciplina || nota === undefined) {
        return res.status(400).json({ erro: "Campos obrigatórios: alunoId, disciplina e nota" });
    }

    const alunos = readAlunos();
    const alunoExistente = alunos.some(a => a.id === parseInt(alunoId));

    if (!alunoExistente) {
        return res.status(404).json({erro: "Não é possível lançar a nota: Aluno não encontrado."})
    }

    const notas = readData();
    const novaNota = {
        id: notas.length > 0 ? Math.max(...notas.map(n => n.id)) + 1 : 1,
        alunoId: parseInt(alunoId),
        disciplina,
        nota: parseFloat(nota)
    };

    notas.push(novaNota);
    writeData(notas);
    res.status(201).json(novaNota);
});

// Rota PUT/:id, para atualizar uma nota que já existe.
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { alunoId, disciplina, nota } = req.body;
    
    let notas = readData();
    const index = notas.findIndex(n => n.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: "Nota não encontrada" });
    }

    // ↓ Validação para verificar se o alunoId (se enviado) existe.
    if (alunoId) {
        const alunos = readAlunos();
        const alunoExiste = alunos.some(a => a.id === parseInt(alunoId));
        if (!alunoExiste) {
            return res.status(404).json({ erro: "Não é possível atualizar: Aluno não encontrado." });
        }
    }

    notas[index] = {
        ...notas[index],
        alunoId: alunoId ? parseInt(alunoId) : notas[index].alunoId,
        disciplina: disciplina || notas[index].disciplina,
        nota: nota !== undefined ? parseFloat(nota) : notas[index].nota
    };

    writeData(notas);
    res.json(notas[index]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let notas = readData();
    const novaLista = notas.filter(n => n.id !== id);

    if (notas.length === novaLista.length) {
        return res.status(404).json({ erro: "Nota não encontrada" });
    }

    writeData(novaLista);
    res.json({ mensagem: "Nota removida com sucesso" });
});
module.exports = router;