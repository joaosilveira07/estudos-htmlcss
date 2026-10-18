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

// listar todas as músicas
app.get("/musicas", (req:Request, res:Response) => {
    return res.status(200).json(musicas);
});

// listar música especifíca
