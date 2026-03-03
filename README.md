# 📦 CRUD MongoDB + Mongoose

Aplicação CRUD completa com Node.js, Express, MongoDB/Mongoose no backend e HTML/CSS/JS puro no frontend.

## 🗂️ Estrutura

```
crud-mongo/
├── backend/
│   ├── models/
│   │   └── produto.model.js   # Schema Mongoose
│   ├── routes/
│   │   └── produto.routes.js  # Rotas REST (GET, POST, PUT, DELETE)
│   ├── server.js              # Entry point Express
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
└── frontend/
    └── index.html             # Interface completa
```

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- MongoDB rodando localmente (ou Atlas URI)

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env` na pasta `backend/`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crud_db
```
> Para usar MongoDB Atlas: `MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/crud_db`

### 3. Iniciar o servidor
```bash
# Produção
npm start

# Desenvolvimento (com hot-reload)
npm run dev
```

### 4. Abrir o frontend
Abra o arquivo `frontend/index.html` no navegador
> ⚠️ O backend deve estar rodando na porta 3000

---

## 🔌 API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/produtos` | Listar todos (paginação + busca + filtro) |
| GET | `/api/produtos/:id` | Buscar por ID |
| POST | `/api/produtos` | Criar novo produto |
| PUT | `/api/produtos/:id` | Atualizar produto |
| DELETE | `/api/produtos/:id` | Remover produto |

### Parâmetros de query (GET /api/produtos)
- `search` – busca por nome ou descrição
- `categoria` – filtrar por categoria
- `page` – página (padrão: 1)
- `limit` – itens por página (padrão: 10)

### Exemplo de body (POST/PUT)
```json
{
  "nome": "MacBook Pro M3",
  "descricao": "Laptop Apple com chip M3",
  "preco": 15999.99,
  "estoque": 5,
  "categoria": "Eletrônicos",
  "ativo": true
}
```

---

## 🧱 Schema do Produto

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| nome | String | ✅ | Máx. 100 chars |
| descricao | String | ❌ | Máx. 500 chars |
| preco | Number | ✅ | Mínimo 0 |
| estoque | Number | ❌ | Padrão 0 |
| categoria | Enum | ✅ | Eletrônicos, Roupas, Alimentos, Livros, Outros |
| ativo | Boolean | ❌ | Padrão true |
| createdAt | Date | auto | Timestamp automático |
| updatedAt | Date | auto | Timestamp automático |

---

## ✨ Funcionalidades

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Busca em tempo real (nome e descrição)
- ✅ Filtro por categoria
- ✅ Paginação
- ✅ Validação no backend (Mongoose)
- ✅ Feedback visual com toasts
- ✅ Interface responsiva
- ✅ Modo de edição visual destacado
