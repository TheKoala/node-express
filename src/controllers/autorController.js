import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res) => {
    autores
      .find()
      .then((autores) => {
        res.status(200).json(autores);
      })
      .catch((erro) => console(erro));
  };

  static listarAutorPorId = (req, res) => {
    const id = req.params.id;
    autores
      .findById(id)
      .then((autor) => {
        res.status(200).send(autor);
      })
      .catch((erro) => {
        res
          .status(400)
          .send({ message: `${erro.message} - Id do autor não localizado.` });
      });
  };

  static cadastrarAutor = (req, res) => {
    let autor = new autores(req.body);
    autor
      .save()
      .then(() => {
        res.status(201).send(autor.toJSON());
      })
      .catch((erro) => {
        if (erro) {
          res
            .status(500)
            .send({ message: `${erro.message} - falha ao cadastrar autor` });
        }
      });
  };

  static atualizarAutor = (req, res) => {
    const id = req.params.id;
    autores
      .findByIdAndUpdate(id, { $set: req.body })
      .then(() => {
        res.status(200).send("autor atualizado com sucesso");
      })
      .catch((erro) => {
        res
          .status(500)
          .send({ message: `${erro.message} - falha ao atualizar autor` });
      });
  };

  static excluirAutor = (req, res) => {
    const id = req.params.id;
    autores
      .findByIdAndDelete(id)
      .then(() => {
        res.status(200).send();
      })
      .catch((erro) => {
        res
          .status(500)
          .send({ message: `${erro.message} - falha ao deletar autor` });
      });
  };
}

export default AutorController;
