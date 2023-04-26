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
}

export default LivroController;
