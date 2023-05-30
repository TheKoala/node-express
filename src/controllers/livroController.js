import NaoEncontrado from "../Errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = (req, res, next) => {
    const buscaLivros = livros.find();
    req.consulta = buscaLivros;
    next();
  };

  static listarLivroPorId = (req, res, next) => {
    const id = req.params.id;
    livros
      .findById(id, {}, { autopopulate: false })
      .populate("autor", "nome")
      .then((livro) => {
        if (livro !== null) {
          res.status(200).send(livro);
        } else {
          next(new NaoEncontrado("Id do livro não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const buscaLivros = livros.find(busca);
        req.consulta = buscaLivros;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = (req, res, next) => {
    let livro = new livros(req.body);
    livro
      .save()
      .then(() => {
        res.status(201).send(livro.toJSON());
      })
      .catch((erro) => {
        if (erro) {
          next(erro);
        }
      });
  };

  static atualizarLivro = (req, res, next) => {
    const id = req.params.id;
    livros
      .findByIdAndUpdate(id, { $set: req.body })
      .then((livro) => {
        if (livro !== null) {
          res.status(200).send("livro atualizado com sucesso");
        } else {
          next(new NaoEncontrado("Id do livro não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };

  static excluirLivro = (req, res, next) => {
    const id = req.params.id;
    livros
      .findByIdAndDelete(id)
      .then((livro) => {
        if (livro !== null) {
          res.status(200).send();
        } else {
          next(new NaoEncontrado("Id do livro não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    });
    if (autor !== null) {
      const autorId = autor._id;
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
