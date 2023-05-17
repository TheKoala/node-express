import mongoose from "mongoose";
import ErroBase from "../Errors/ErroBase.js";
import RequisicaoIncorreta from "../Errors/RequisicaoIncorreta.js";
import ErroValidacao from "../Errors/ErroValidacao.js";
import NaoEncontrado from "../Errors/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  console.log(erro);
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
