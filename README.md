# 🎨 added.today — MVP Frontend

Este repositório contém o frontend do MVP da plataforma **added.today**, uma iniciativa voltada para a _creator economy_. A plataforma oferece um ecossistema para criadores de conteúdo construírem espaços digitais (Mentals), interagirem com suas comunidades via WhatsApp e testarem formas de monetização.

---

## ✅ Funcionalidades atuais

- Interface interativa para criação e edição de _Mentals_
- Página pública de cada _Mental_ com slug único
- Sistema de autenticação com JWT e cookies seguros
- Integração com backend via API (Axios)
- Validação de formulários com **React Hook Form** + **Yup**
- Feedbacks visuais com **react-hot-toast**
- Responsividade total com **TailwindCSS**
- Upload e leitura de CSV com **PapaParse**
- Máscaras e validações de telefone com **libphonenumber-js**
- Criptografia leve com **crypto-js**
- Navegação otimizada com **Next.js** + **Turbopack**
- Estrutura modular e escalável com suporte a ambientes `.env`

---

## 🚀 Tecnologias utilizadas

- **Next.js** — Framework React para aplicações web rápidas e escaláveis
- **React** — Biblioteca JavaScript para criação de interfaces
- **TypeScript** — Superset de JavaScript com tipagem estática
- **TailwindCSS** — Utilitários para estilização rápida e responsiva
- **React Hook Form + Yup** — Gerenciamento e validação de formulários
- **Axios** — Cliente HTTP para comunicação com o backend
- **js-cookie** — Manipulação de cookies no navegador
- **CryptoJS** — Criptografia de dados simples no client-side
- **PapaParse** — Leitura de arquivos CSV
- **libphonenumber-js** — Formatação e validação de números de telefone
- **React Hot Toast** — Toasts simples e elegantes para feedbacks visuais

---

## 🧪 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/byetevinn/added-today-front
cd added-today-front
```

### 2. Instale as dependências

```bash
yarn install
# ou
npm install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com os valores abaixo:

```env
# API base do backend utilizado
NEXT_PUBLIC_API_URL="http://api_do_backend_aqui"

# Chave secreta para encriptação de dados de autorização
NEXT_PUBLIC_AUTH_SECRET_KEY="sua_chave_aqui"
```

> **Obs:** certifique-se de que o backend esteja rodando na URL configurada.

### 4. Rode a aplicação em modo desenvolvimento

```bash
yarn dev
# ou
npm run dev
# ou
pnpm run dev
```

Aplicação estará disponível em `http://localhost:3000`

---

## Navegação

- `/` — Página inicial de login
- `/home` — Painel sobre a plataforma
- `/mental` — Página de gerenciamento de Mentals
- `/mental/[slug]` — Página de edição de um Mental
- `/users` — Página de gerenciamento de usários
- `/users/[id]` — Página de edição de um usuário
- `not-found` — Página de erro 404

---

## 📁 Estrutura base do projeto

```bash
src/
│
├── app/              # Rotas da aplicação (Next.js)
├── components/       # Componentes reutilizáveis
├── config/           # Configurações globais (variáveis de ambiente, etc.)
├── constants/        # Variáveis constantes utilizadas no projeto
├── contexts/         # Contextos para gerenciamento de estado
├── services/         # Configuração do Axios e APIs
├── styles/           # Estilos globais e tema Tailwind
└── types/            # Tipagens compartilhadas e globais
├── utils/            # Funções auxiliares separadas por tipo de dado
```

---

## ☁️ Deploy com Vercel

O projeto está configurado para deploy automático via **Vercel**.

### 🛠 Como configurar o deploy:

1. Acesse [https://vercel.com/import](https://vercel.com/import)
2. Selecione o repositório `added-today-front`
3. Defina as variáveis de ambiente:

```env
NEXT_PUBLIC_API_URL="http://api_do_backend_aqui"
NEXT_PUBLIC_AUTH_SECRET_KEY="sua_chave_aqui"
```

4. Finalize a publicação

> Após qualquer `push` na branch principal, a Vercel irá gerar um novo deploy automaticamente.

### Deploy atual

🔗 **Deploy de produção:** [https://added-today.vercel.app/](https://added-today.vercel.app/)

---

## 🧑‍💻 Desenvolvedor

**Stevan Padilha**\
[LinkedIn](https://www.linkedin.com/in/stevan-santos-510851235/)\
[GitHub](https://github.com/byetevinn)

---

**Status:** Em desenvolvimento ✨
