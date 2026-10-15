# Aula 09 — Frontend consumindo API REST com fetch

Este material contém páginas HTML/CSS/Bootstrap prontas para a aula de integração frontend-backend.

## Estrutura

```txt
frontend/
├── index.html
├── pages/
│   ├── listar-alunos.html
│   └── manipular-aluno.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── alunos-lista.js
    └── aluno-formulario.js
```

## Backend esperado

O backend deve rodar em:

```txt
http://localhost:3000
```

Rotas utilizadas:

```txt
GET    /alunos
GET    /alunos?situacao=Ativo
GET    /alunos/:ra
POST   /alunos
PUT    /alunos/:ra
DELETE /alunos/:ra
```

## Observação importante

Como o frontend e o backend provavelmente estarão em portas diferentes, habilite CORS no backend:

```bash
npm install cors
npm install -D @types/cors
```

```ts
import cors from "cors";
app.use(cors());
```
