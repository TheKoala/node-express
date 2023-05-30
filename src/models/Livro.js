import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const livroSchema = mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
    autopopulate: true,
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatório"],
    enum: {
      values: ["Casa do código", "Editora Arqueiro"],
      message: "A editora {VALUE} não é um valor permitido.",
    },
  },
  numeroPaginas: {
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O campo numeroPaginas: {VALUE},  deve estar entre 10 e 5000",
    },
    /*min: [
      10,
      "O campo numeroPaginas: {VALUE} é menor que o valor mínimo permitido (10)",
    ],
    max: [
      5000,
      "O campo numeroPaginas: {VALUE} é maior que o valor máximo permitido (5000)",
    ],*/
  },
});

livroSchema.plugin(mongooseAutoPopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;
