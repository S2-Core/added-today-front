# 🎨 added.today — MVP Frontend

Este repositório contém o frontend do MVP da plataforma **Added Today**, uma iniciativa voltada para a _creator economy_. A plataforma oferece um ecossistema para criadores de conteúdo construírem espaços digitais (Mentals), interagirem com suas comunidades via WhatsApp e testarem formas de monetização.

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
- **Socket.IO Client** — Comunicação em tempo real via WebSocket
- **React Icons** — Biblioteca de ícones para React
- **Motion** — Animações fluidas e performáticas

---

## 🧪 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/byetevinn/added-today-front
cd added-today-front
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` conforme está no arquivo `.env.example` com os valores abaixo:

```env
# API base do backend utilizado
NEXT_PUBLIC_API_URL="http://api_do_backend_aqui"

# Chave secreta para encriptação de dados de autorização
NEXT_PUBLIC_AUTH_SECRET_KEY="sua_chave_aqui"
```

> **Obs:** certifique-se de que o backend esteja rodando na URL configurada.

### 4. Rode a aplicação em modo desenvolvimento

```bash
pnpm run dev
```

Aplicação estará disponível em `http://localhost:3000`

---

## Navegação

- `/` — Página inicial de login
- `/home` — Painel sobre a plataforma
- `/mental` — Página de gerenciamento de Mentals
- `/mental/[slug]` — Página de edição de um Mental
- `/users` — Página de gerenciamento de Usários
- `/users/[id]` — Página de edição de um Usuário
- `/chat` - Página do Chat
- `/new-password?hash=[hash]` - Página de alteração de senha
- `/oportunities` - Página de Oportunidades
- `/oportunities/[id]` - Página de edição de uma Oportunidade
- `/quotations` - Página de Precificaçãoes
- `/insights` - Página de Insights
- `/terms-of-use` - Página de Termos de Uso
- `not-found` — Página de erro 404
- `loading` - Página de carregamento

---

## 📁 Estrutura base do projeto

```bash
.next/ # Build gerado automaticamente pelo Next.js
node_modules/ # Dependências instaladas
public/ # Arquivos estáticos públicos (imagens, ícones, fontes)
src/
│
├── app/ # Arquivos da aplicação/layout e páginas (Next.js)
├── components/ # Componentes reutilizáveis
├── config/ # Configurações globais (variáveis de ambiente, etc.)
├── constants/ # Variáveis constantes utilizadas no projeto
├── contexts/ # Contextos para gerenciamento de estado
├── lib/ # Funções auxiliares de baixo nível (bibliotecas internas)
├── services/ # Configuração do Axios e APIs
├── styles/ # Estilos globais e tema Tailwind
├── types/ # Tipagens compartilhadas e globais
├── utils/ # Funções auxiliares separadas por tipo de dado
└── validators/ # Validadores de formulários por Yup utilizados no projeto

.env # Variáveis de ambiente (desenvolvimento)
.env.example # Exemplo de variáveis de ambiente
.gitignore # Arquivos e pastas ignorados pelo Git
next-env.d.ts # Tipagens padrão do Next.js
next.config.ts # Configurações do Next.js
package.json # Dependências e scripts do projeto
pnpm-lock.yaml # Lockfile do pnpm
postcss.config.mjs # Configurações do PostCSS
README.md # Documentação do projeto
tsconfig.json # Configurações do TypeScript
```

---

## ☁️ Deploy com Railway (via CLI)

O projeto está configurado para deploy automático via **Railway** utilizando o **CLI**.

### 🛠 Como configurar o deploy:

1. Instale o CLI da Railway:

```bash
npm i -g @railway/cli
```

ou

```bash
scoop install railway
```

2. Autentique-se na Railway:

```bash
railway login
```

3. Inicialize o projeto dentro da Railway (dentro da pasta do projeto):

```bash
railway init
```

> Obs: Selecione o repositório `added-today-front` ou conecte-o manualmente.

4. Defina as variáveis de ambiente necessárias:

```bash
railway variables set NEXT_PUBLIC_API_URL="http://api_do_backend_aqui"
railway variables set NEXT_PUBLIC_AUTH_SECRET_KEY="sua_chave_aqui"
```

5. Faça o deploy do projeto:

```bash
railway up
```

> Após qualquer alteração, basta rodar `railway up` novamente para gerar um novo deploy.

### Deploy atual

🔗 **Deploy de produção:** [https://app.added.today/](https://app.added.today/)

---

## 🧑‍💻 Desenvolvedor

**Stevan Padilha**\
[LinkedIn](https://www.linkedin.com/in/stevan-santos-510851235/)\
[GitHub](https://github.com/byetevinn)

---

**Status:** Em desenvolvimento ✨
