"# api-escola-joao-vitor" 

 # ↓ Sistema de Gestão Escolar 

Este projeto é uma API desenvolvida em Node.js com Express para gerenciar alunos e suas respectivas notas, utilizando persistência de dados em arquivos JSON. A interface foi construída com HTML, CSS e Fetch API para uma experiência completa de usuário.

## ↓ Tecnologias Usadas

Node.js: Ambiente de execução;
Express: Framework para criação de rotas e servidor;
File System (fs): Manipulação e persistência de arquivos JSON;
HTML/CSS/JS: Interface e consumo da API via Fetch.

## ↓ Como Executar o Projeto

### I. Instale as depêndencias (node_modules/)

Entre no terminal:

(OBS: Se você estiver em um software que abra seu arquivo e tenha um terminal dentro dele, como o Visual Studio Code, você pode executar todos os códigos diretamente nele — com exceção do cd CAMINHO_DA_PASTA, visto que você já está dentro da pasta.)

Vá na barra de pesquisa do seu sistema operacional e pesquise por "cmd" ou "terminal" ou "prompt de comandos" e acesse o terminal.

No terminal (cmd), digite os seguintes comandos para verificar se sua máquina contém node.js instalado e possa realizar os comandos npm:

digite: `node -v` 
aperte ENTER

digite: `npm -v`
aperte ENTER

Caso apareça que não foi reconhecido os comandos, você terá que ir no site: "https://nodejs.org/pt-br" e instalar o node.js em sua máquina, então terá que refazer os comandos.

Verificando que sua máquina contém node.js, você terá que acessar a pasta desse projeto, através desse comando:

digite: `cd CAMINHO_DA_PASTA`
aperte ENTER

Entrando no arquivo, instale as dependências (node_modules/), através dese comando:

digite: `npm install express`
aperte ENTER

### II. Inicie o Servidor

Após a instalação do "node_modules/", coloque este comando no terminal (cmd):

digite: `node index.js`
aperte ENTER

Com isso deverá aparecer o seguinte resultado:

"Servidor rodando em http://localhost:3000"

Então você copiara essa url e colará no seu navegador (seja Chrome, Microsoft Edge ou outro).


### III. Endpoints da API

#### Alunos (entidade 1)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/alunos` | Retorna a lista de todos os alunos. |
| **POST** | `/alunos` | Cadastra um novo aluno com ID automático. |
| **PUT** | `/alunos/:id` | Atualiza os dados de um aluno existente. |
| **DELETE** | `/alunos/:id` | Remove um aluno do sistema. |

#### Notas (entidade 2)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/notas` | Retorna todas as notas lançadas no sistema. |
| **POST** | `/notas` | Lança uma nota (valida se o `alunoId` existe e se a nota está entre 0 e 10). |
| **PUT** | `/notas/:id` | Atualiza as informações de uma nota específica (mantém as validações). |
| **DELETE** | `/notas/:id` | Remove uma nota do sistema permanentemente. |


### IV. Extra (Funcionalidades e Boas Práticas)

1. Persistência de Dados: Todas as informações são salvas nos arquivos alunos.json e notas.json.

2. Integridade: 

* Notas permitidas apenas no intervalo de 0 a 10.
* Cadastro de alunos restrito à faixa etária de 14 a 120 anos.
* Vinculação obrigatória: Não é possível lançar nota para um ID de aluno inexistente.

3. Feedback Visual: O front-end exibe mensagens de sucesso ou erro para todas as operações.

4. Design: Interface estilizada com cores cianas e brancas, organizada em seções.