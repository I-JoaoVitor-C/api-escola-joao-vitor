const express = require('express');
const app = express();
const PORT = 3000;

// ↓ Configurar Middlewares (intermediários).
app.use(express.json()); 
app.use(express.static('public')); // ← Serve os arquivos da pasta public/ 

// ↓ Importar e usar as rotas.
const notasRoutes = require('./routes/notas');
const alunosRoutes = require('./routes/alunos');

app.use('/alunos', alunosRoutes);
app.use('/notas', notasRoutes);

// ↓ Rota de teste.
app.get('/status', (req, res) => {
    res.json({ mensagem: "API da Escola rodando perfeitamente!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});