import mongoose from "mongoose";

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
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatório"],
    enum: {
      values: ["Casa do código", "Editora Arqueiro"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  numeroPaginas: {
    type: Number,
    min: [
      10,
      "O campo numeroPaginas: {VALUE} é menor que o valor mínimo permitido (10)",
    ],
    max: [
      5000,
      "O campo numeroPaginas: {VALUE} é maior que o valor máximo permitido (5000)",
    ],
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;
