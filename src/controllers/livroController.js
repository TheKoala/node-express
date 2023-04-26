import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = (req, res) => {
    livros
      .find()
      .then((livros) => {
        res.status(200).json(livros);
      })
      .catch((erro) => console(erro));
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;
    livros
      .findById(id)
      .then((livro) => {
        res.status(200).send(livro);
      })
      .catch((erro) => {
        res
          .status(400)
          .send({ message: `${erro.message} - Id do livro não localizado.` });
      });
  };

  static cadastrarLivro = (req, res) => {
    let livro = new livros(req.body);
    livro
      .save()
      .then(() => {
        res.status(201).send(livro.toJSON());
      })
      .catch((erro) => {
        if (erro) {
          res
            .status(500)
            .send({ message: `${erro.message} - falha ao cadastrar livro` });
        }
      });
  };

  static atualizarLivro = (req, res) => {
    const id = req.params.id;
    livros
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send("livro atualizado com sucesso");
      })
      .catch((erro) => {
        res
          .status(500)
          .send({ message: `${erro.message} - falha ao atualizar livro` });
      });
  };
}

export default LivroController;
