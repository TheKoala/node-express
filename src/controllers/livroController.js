import NaoEncontrado from "../Errors/NaoEncontrado.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static listarLivros = (req, res, next) => {
    livros
      .find()
      .populate("autor")
      .then((livros) => {
        res.status(200).json(livros);
      })
      .catch((erro) => next(erro));
  };

  static listarLivroPorId = (req, res, next) => {
    const id = req.params.id;
    livros
      .findById(id)
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

      console.log(busca);

      // const livrosResultado = await livros.find(busca).populate("autor");
      // res.status(200).send(livrosResultado);

      if (busca !== null) {
        livros
          .find(busca)
          .populate("autor")
          .then((livros) => {
            if (livros.length > 0) {
              res.status(200).send(livros);
            } else {
              next(
                new NaoEncontrado(
                  "Não foram encontrados livros com os parametros pesquisados"
                )
              );
            }
          })
          .catch((erro) => {
            next(erro);
          });
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
  //const regex = new RegExp(titulo, "i");
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  console.log(nomeAutor);
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
