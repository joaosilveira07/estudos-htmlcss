import express, {Request, Response} from "express";

const PORT = 3000;
const app = express();
app.use(express.json());

type SituacaoMusica = "Ativa" | "Inativa";
type Genero = "Rock" | "Pop" | "Bossa Nova" | "Rap";

interface Musica {
    id: number;
    titulo: string;
    artista: string;
    genero: Genero;
    anoLancamento: number;
    duracao: number;
    situacao: SituacaoMusica;
}

let musicas:Musica[] = [
  {
    id: 1,
    titulo: "Bohemian Rhapsody",
    artista: "Queen",
    genero: "Rock",
    anoLancamento: 1975,
    duracao: 354,
    situacao: "Ativa"
  },
  {
    id: 2,
    titulo: "Billie Jean",
    artista: "Michael Jackson",
    genero: "Pop",
    anoLancamento: 1982,
    duracao: 294,
    situacao: "Ativa"
  },
  {
    id: 3,
    titulo: "Garota de Ipanema",
    artista: "Tom Jobim",
    genero: "Bossa Nova",
    anoLancamento: 1962,
    duracao: 170,
    situacao: "Ativa"
  },
  {
    id: 4,
    titulo: "Lose Yourself",
    artista: "Eminem",
    genero: "Rap",
    anoLancamento: 2002,
    duracao: 326,
    situacao: "Inativa"
  }
];

app.listen(PORT, () => {
    console.log(`Servidor ativo na porta ${PORT}`);
});

// listar todas as músicas ou músicas filtradas
app.get("/musicas", (req:Request, res:Response) => {
    const situacao = req.query.situacao;
    const genero = req.query.genero;
    const artista = req.query.artista
    const anoLancamento = Number(req.query.anoLancamento);

    if (situacao) {
        const musicasFiltradas = musicas.filter((item) => {
            return item.situacao === situacao;
        });
        return res.status(200).json(musicasFiltradas);
    }
    if (genero) {
        const musicasFiltradas = musicas.filter((item) => {
            return item.genero === genero;
        });
        return res.status(200).json(musicasFiltradas);
    }
    if (artista) {
        const musicasFiltradas = musicas.filter((item) => {
            return item.artista === artista;
        });
        return res.status(200).json(musicasFiltradas);
    }
    if (anoLancamento) {
        const musicasFiltradas = musicas.filter((item) => {
            return item.anoLancamento === anoLancamento;
        });
        return res.status(200).json(musicasFiltradas);
    }

    return res.status(200).json(musicas);
});

// listar música especifíca
app.get("/musicas/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    const musica = musicas.find((item) => item.id === id);

    if (!musica){
        return res.status(404).json({mensagem: "Música não foi encontrada."});
    }

    return res.status(200).json(musica);
});

// cadastrar nova música
app.post("/musicas", (req:Request, res:Response) => {
    const {titulo, artista, genero, anoLancamento, duracao} = req.body;

    if (!titulo || !artista || !genero || !anoLancamento || !duracao){
        return res.status(400).json({"mensagem": "Título, artista, gênero, ano de lançamento e duração são obrigatórios."});
    }

    const id = musicas.length + 1;
    
    const novaMusica: Musica = {
        id, titulo, artista, genero, anoLancamento, duracao, situacao: "Ativa"
    };
    musicas.push(novaMusica);
    return res.status(201).json(novaMusica);
});

// atualizar música
app.put("/musicas/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    const musica = musicas.find((item) => item.id === id);

    if (!musica){
        return res.status(404).json({mensagem: "Música não foi encontrada."});
    }

    const {titulo, artista, genero, anoLancamento, duracao, situacao} = req.body;

    if (!titulo || !artista || !genero || !anoLancamento || !duracao || !situacao){
        return res.status(400).json({"mensagem": "Título, artista, gênero, ano de lançamento, duração e situação são obrigatórios."});
    }

    musica.titulo = titulo;
    musica.artista = artista;
    musica.genero = genero;
    musica.anoLancamento = anoLancamento;
    musica.duracao = duracao;
    musica.situacao = situacao;

    return res.status(200).json(musica);
});

app.delete("/musicas/:id", (req:Request, res:Response) => {
    const id = Number(req.params.id);
    const musica = musicas.find((item) => item.id === id);

    if (!musica){
        return res.status(404).json({mensagem: "Música não foi encontrada."});
    }

    musica.situacao = "Inativa";

    return res.status(200).json({mensagem: "Música inativada com sucesso!", musica});
});