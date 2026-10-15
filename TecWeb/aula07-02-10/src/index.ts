import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

type CursoAluno = "Engenharia de Software" | "Sistemas da Informação";
type SituacaoAluno = "Ativo" | "Formado" | "Inativo" | "Trancado";

interface Aluno {
    ra: number;
    nome: string;
    email: string,
    curso: CursoAluno;
    semestre: number;
    situacao: SituacaoAluno;
}

let alunos:Aluno[] = [
    {
        ra: 1,
        nome: "João da Silva",
        email: "joaozinho@gmail.com",
        curso: "Engenharia de Software",
        semestre: 2,
        situacao: "Ativo"
    },
    {
        ra: 2,
        nome: "Maria da Penha",
        email: "mariazinha@gmail.com",
        curso: "Sistemas da Informação",
        semestre: 8,
        situacao: "Formado"
    }
];



app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});

app.get("/", (req:Request, res:Response) => {
    res.send("Hello World!");
});

app.get("/alunos", (req:Request, res:Response) => {
    return res.status(200).json(alunos);
});

app.get("/alunos/:ra", (req:Request, res:Response) => {
    const ra = Number(req.params.ra);
    const aluno = alunos.find((item) => item.ra === ra);

    if (!aluno) {
        return res.status(404).json({mensagem:"Aluno não encontrado!"});
    }

    return res.status(200).json(aluno);
});

app.get("/alunos/", (req:Request, res:Response) => {
    const situacao = req.query.situacao;

    if (situacao) {
        const alunosFiltrados = alunos.filter((item) => {
            return item.situacao === situacao;
        });
        return res.status(200).json(alunosFiltrados);
    }

    return res.status(200).json(alunos);
});

app.post("/alunos", (req:Request, res:Response) => {
    const {ra, nome, email, curso, semestre} = req.body;

    // Validações
    if (!ra || !nome || !email || !curso || !semestre) {
        return res.status(404).json({mensagem: "Campos obrigatórios."});
    }

    const novoAluno:Aluno = {
        ra, nome, email, curso, semestre, situacao: "Ativo"
    };

    alunos.push(novoAluno);
    return res.status(201).json(novoAluno);
});

app.put("/alunos/:ra", (req:Request, res:Response) => {
    const ra = Number(req.params.ra);
    const aluno = alunos.find((item) => item.ra === ra);

    if(!aluno){
        return res.status(404).json({mensagem: "Aluno não existe no sistema"});
    }

    const {nome, email, curso, semestre, situacao} = req.body;
    if(!nome || !email || !curso || !semestre || !situacao){
        return res.status(404).json({mensagem: "Campos Obrigatórios!"});
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.curso = curso;
    aluno.semestre = semestre;
    aluno.situacao = situacao;

    return res.status(200).json(aluno);
});

app.delete("/alunos/:ra", (req:Request, res:Response) => {
    const ra = Number(req.params.ra);
    const aluno = alunos.find((item) => item.ra === ra);

    if (!aluno){
        return res.status(404).json({mensagem: "Aluno não encontrado!"});
    }

    aluno.situacao = "Inativo";

    return res.status(200).json({mensagem: "Aluno inativado com sucesso!", aluno});
});

