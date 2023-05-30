import RequisicaoIncorreta from "../Errors/RequisicaoIncorreta.js";

function paginar(req, res, next) {
  let { limite = 1, pagina = 1, ordenacao = "_id:-1" } = req.query;

  let [campoOrdenacao, ordem] = ordenacao.split(":");

  limite = parseInt(limite);
  pagina = parseInt(pagina);

  const consulta = req.consulta;

  if (limite > 0 && pagina > 0) {
    consulta
      .find()
      .sort({ [campoOrdenacao]: ordem })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .then((resultadoPaginado) => {
        res.status(200).json(resultadoPaginado);
      })
      .catch((erro) => next(erro));
  } else {
    next(new RequisicaoIncorreta());
  }
}

export default paginar;
