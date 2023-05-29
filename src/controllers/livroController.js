import NaoEncontrado from "../Errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

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

  static listarLivroEditora = (req, res, next) => {
    const editora = req.query.editora;
    livros
      .find({ editora: editora })
      .populate("autor")
      .then((livros) => {
        if (livros.length > 0) {
          res.status(200).send(livros);
        } else {
          next(
            new NaoEncontrado(
              "Não foram encontrados livros da editora pesquisada"
            )
          );
        }
      })
      .catch((erro) => {
        next(erro);
      });
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

export default LivroController;
