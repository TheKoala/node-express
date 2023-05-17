import NaoEncontrado from "../Errors/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = (req, res, next) => {
    autores
      .find()
      .then((autores) => {
        res.status(200).json(autores);
      })
      .catch((erro) => next(erro));
  };

  static listarAutorPorId = (req, res, next) => {
    const id = req.params.id;
    autores
      .findById(id)
      .then((autor) => {
        if (autor !== null) {
          res.status(200).send(autor);
        } else {
          next(new NaoEncontrado("Id do autor não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };

  static cadastrarAutor = (req, res, next) => {
    let autor = new autores(req.body);
    autor
      .save()
      .then(() => {
        res.status(201).send(autor.toJSON());
      })
      .catch((erro) => {
        next(erro);
      });
  };

  static atualizarAutor = (req, res, next) => {
    const id = req.params.id;
    autores
      .findByIdAndUpdate(id, { $set: req.body })
      .then((user) => {
        if (user !== null){
          res.status(200).send("autor atualizado com sucesso");
        } else {
          next(new NaoEncontrado("Id do autor não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };

  static excluirAutor = (req, res, next) => {
    const id = req.params.id;
    autores
      .findByIdAndDelete(id)
      .then((autor) => {
        if (autor !== null) {
          res.status(200).send();
        } else {
          next(new NaoEncontrado("Id do autor não localizado"));
        }
      })
      .catch((erro) => {
        next(erro);
      });
  };
}

export default AutorController;
