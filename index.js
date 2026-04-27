const express = require('express');
const app = express();
const PORT = 3000;

// Middlewares obrigatórios
app.use(express.json()); // Permite receber dados no corpo das requisições POST e PUT 
app.use(express.static('public')); // Serve os arquivos estáticos (Front-End) da pasta public/ 

// Rota de teste
app.get('/api/status', (req, res) => {
    res.json({ mensagem: "API da Escola rodando perfeitamente!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
