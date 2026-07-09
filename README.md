# 🍽️ Refenda

**Refenda** é um aplicativo de **agendamento de refeições para escolas públicas**, criado com o objetivo de **reduzir ao máximo o desperdício de comida** nas cantinas/refeitórios escolares.

A ideia central é simples: em vez de a cozinha preparar uma quantidade fixa (e muitas vezes excessiva) de refeições todos os dias, os **alunos agendam com antecedência** se vão ou não almoçar/lanchar na escola. Com isso, a equipe de **gestão e funcionários da cozinha** sabe exatamente quantas porções precisam ser preparadas, evitando sobras e desperdício de alimentos.

O sistema é dividido em três tipos de usuário, cada um com seu próprio fluxo de acesso:

- 👨‍🎓 **Aluno** — agenda suas refeições (login via **RA**);
- 👩‍🍳 **Gestão** — administra o cardápio e acompanha os agendamentos (login via **e-mail**);
- 👷 **Funcionário** — acompanha a operação do dia a dia da cozinha (login via **e-mail**).

## 📌 Status do projeto

O projeto está **em desenvolvimento**. Atualmente já estão implementados:

- Estrutura de banco de dados (usuários, cardápios e agendamentos);
- Autenticação (login) no backend;
- Telas de login para os três tipos de usuário e navegação inicial no app mobile.

Ainda **não implementados** (próximos passos): as rotas de agendamento e de cardápio no backend, e as telas internas de cada perfil (após o login) no frontend.

## 🧱 Arquitetura e tecnologias

O projeto é dividido em duas pastas principais:

```
Projeto-Refenda/
├── backend/     → API REST (Node.js + Express + Prisma)
└── frontend/    → Aplicativo mobile (React Native + Expo)
```

### Backend

- **Node.js** com **Express 5**
- **Prisma ORM** conectado a um banco de dados **MySQL**
- **JWT (jsonwebtoken)** para autenticação
- **bcrypt** para hash de senhas
- **nodemon** para desenvolvimento

Modelo de dados (`prisma/schema.prisma`):

- `usuarios` — armazena nome, e-mail, senha (hash), tipo (`GESTOR`, `ALUNO` ou `FUNCIONARIO`) e RA (para alunos);
- `cardapios` — refeições disponíveis, com nome, descrição e data;
- `agendamentos` — relaciona um usuário a um cardápio em uma data específica, indicando se a refeição está confirmada.

### Frontend

- **React Native** com **Expo**
- **React Navigation** (Stack Navigator) para navegar entre as telas
- **Context API** (`AuthContext`) para gerenciar o usuário logado e o token JWT
- **react-native-paper** e **react-native-vector-icons** para os componentes visuais
- **Axios** / `fetch` para comunicação com a API

## 🚀 Como rodar o projeto localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Um banco de dados **MySQL** rodando
- [Expo Go](https://expo.dev/go) instalado no celular (ou um emulador Android/iOS) para testar o app

### 1. Clonar o repositório

```bash
git clone https://github.com/ViniciusDCDias/Projeto-Refenda.git
cd Projeto-Refenda
```

### 2. Configurar e rodar o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/` com as seguintes variáveis:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
JWT_SECRET="uma_chave_secreta_qualquer"
```

Rode as migrations do Prisma para criar as tabelas no banco:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm start
```

O servidor sobe por padrão na porta `3000` (`http://localhost:3000`).

> 💡 O backend escuta em `0.0.0.0`, o que permite que o app mobile (rodando no celular, na mesma rede Wi-Fi) consiga acessá-lo pelo IP local da máquina.

### 3. Configurar e rodar o frontend (app mobile)

```bash
cd frontend
npm install
```

Antes de rodar, ajuste o IP da API dentro dos arquivos de login (`src/components/LoginAluno.js`, `LoginCozi.js` e `LoginFunc.js`), trocando o endereço:

```js
fetch("http://192.168.0.230:3000/auth/login", ...)
```

pelo **IP local da máquina onde o backend está rodando** (o celular e o computador precisam estar na mesma rede).

Inicie o app com o Expo:

```bash
npm start
```

Escaneie o QR Code exibido no terminal com o app **Expo Go** para abrir o Refenda no seu celular.

## 🔑 Autenticação

O login é feito através do endpoint:

```
POST /auth/login
Content-Type: application/json

{
  "identificador": "email_ou_ra",
  "senha": "sua_senha"
}
```

- Alunos se autenticam pelo **RA**;
- Gestores e funcionários se autenticam pelo **e-mail**.

Se as credenciais forem válidas, a API retorna um **token JWT** e os dados do usuário (`id`, `nome`, `tipo`), usados pelo app para manter a sessão através do `AuthContext`.

## 🗺️ Fluxo de uso

1. O usuário abre o app e escolhe seu perfil na tela inicial: **Aluno**, **Gestão** ou **Funcionário**;
2. Faz login com suas credenciais;
3. *(em desenvolvimento)* O aluno visualiza o cardápio da semana e agenda as refeições que irá consumir;
4. *(em desenvolvimento)* A gestão cadastra o cardápio e acompanha quantos agendamentos foram feitos para cada dia, ajustando o preparo das refeições conforme a demanda real — reduzindo o desperdício de alimentos.

## 🤝 Contribuindo

Sugestões, issues e pull requests são bem-vindos! Este é um projeto em construção, ideal para quem quer contribuir com melhorias no backend (rotas de agendamento e cardápio) ou nas telas internas do app.
