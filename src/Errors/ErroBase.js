class ErroBase extends Error {
  constructor(mensage = "Erro interno do servidor", status = 500) {
    super();
    this.message = mensage;
    this.status = status;
  }

  enviarResposta(res) {
    res.status(this.status).send({
      mensagem: this.message,
      status: this.status,
    });
  }
}

export default ErroBase;
