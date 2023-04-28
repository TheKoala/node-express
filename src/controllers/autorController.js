import autores from "../models/Autor.js";
import mongoose from "mongoose";

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
        if (autor !== null) {
          res.status(200).send(autor);
        } else {
          res.status(404).send({ message: "Id do autor não localizado." });
        }
      })
      .catch((erro) => {
        if (erro instanceof mongoose.Error.CastError) {
          res
            .status(400)
            .send({ message: "Um ou mais dados fornecidos estão incorretos." });
        } else {
          res
            .status(500)
            .send({ message: `${erro.message} - Erro interno` });
        }
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
