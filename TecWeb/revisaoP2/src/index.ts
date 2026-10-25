import express, {Request, Response} from "express"

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => {
    console.log(`servidor ativo na porta ${PORT}`);
});

type Categoria = "Romance" | "Ficção" | "Fantasia" | "Drama";
type Situacao = "Disponível" | "Indisponível";

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    categoria: Categoria;
    anoPublicacao: number;
    paginas: number;
    situacao: Situacao;
}

let livros:Livro[] = [
    {
        id: 1,
        titulo: "O Hobbit",
        autor: "Tolkien",
        categoria: "Drama",
        anoPublicacao: 1888,
        paginas: 380,
        situacao: "Disponível"
    },
    
    {
        id: 2,
        titulo: "O Pequeno Príncipe",
        autor: "João da Silva",
        categoria: "Fantasia",
        anoPublicacao: 1910,
        paginas: 120,
        situacao: "Indisponível"
    },

    {
        id: 3,
        titulo: "Harry Potter",
        autor: "JK Roling",
        categoria: "Ficção",
        anoPublicacao: 2001,
        paginas: 368,
        situacao: "Disponível"
    },

    {
        id: 4,
        titulo: "Star Wars",
        autor: "DC",
        categoria: "Romance",
        anoPublicacao: 1979,
        paginas: 421,
        situacao: "Indisponível"
    }
];

app.get("/livros", (req:Request, res:Response) => {
    return res.status(200).json(livros);
});

app.get("/livros/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    let livro = livros.find((item) => item.id === id);

    if (!livro){
        return res.status(404).json({mensagem: "Livro não foi encontrado."});
    }

    return res.status(200).json(livro);
});

app.post("/livros", (req:Request, res:Response) => {
    const {titulo, autor, categoria, anoPublicacao, paginas} = req.body;

    if (!titulo || !autor || !categoria || !anoPublicacao || !paginas){
        return res.status(400).json({mensagem: "Título, autor, categoria, ano de publicação e páginas são obrigatórios."});
    }

    const id = livros.length + 1;

    const novoLivro:Livro = {
        id, titulo, autor, categoria, anoPublicacao, paginas, situacao: "Disponível"
    };
    livros.push(novoLivro);
    return res.status(201).json({mensagem: "Livro cadastrado com sucesso!"});
});

app.put("/livros/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    let livro = livros.find((item) => item.id === id);

    if (!livro){
        return res.status(404).json({mensagem: "Livro não foi encontrado."});
    }

    const {titulo, autor, categoria, anoPublicacao, paginas, situacao} = req.body;

    if (!titulo || !autor || !categoria || !anoPublicacao || !paginas || !situacao){
        return res.status(400).json({mensagem: "Campos Obrigatórios"});
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.categoria = categoria;
    livro.anoPublicacao = anoPublicacao;
    livro.paginas = paginas;
    livro.situacao = situacao;
    return res.status(200).json(livro);
});

app.delete("/livros/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    let livro = livros.find((item) => item.id === id);

    if (!livro){
        return res.status(404).json({mensagem: "Livro não foi encontrado."});
    }

    livro.situacao = "Indisponível";
    return res.status(200).json({mensagem: "Livro inativado com sucesso.", livro});
});

app.get("/livros/", (req:Request, res:Response) => {
    const categoria = req.query.categoria;
    const situacao = req.query.situacao;
    const autor = req.query.autor;

    if (categoria){
        const livrosFiltrados = livros.filter((item) => {
            return item.categoria;
        });
        return res.status(200).json(livrosFiltrados);
    }
    if (situacao){
        const livrosFiltrados = livros.filter((item) => {
            return item.situacao;
        });
        return res.status(200).json(livrosFiltrados);
    }
    if (autor){
        const livrosFiltrados = livros.filter((item) => {
            return item.autor;
        });
        return res.status(200).json(livrosFiltrados);
    }
    
    return res.status(200).json(livros);
});