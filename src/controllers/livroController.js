import livros from "../models/Livro.js";

class LivroController {
	static listarLivros = (req, res) => {
		livros
			.find()
			.populate("autor")
			.then((livros) => {
				res.status(200).json(livros);
			})
			.catch((erro) => console(erro));
	};

	static listarLivroPorId = (req, res) => {
		const id = req.params.id;
		livros
			.findById(id)
			.populate("autor", "nome")
			.then((livro) => {
				res.status(200).send(livro);
			})
			.catch((erro) => {
				res
					.status(400)
					.send({ message: `${erro.message} - Id do livro não localizado.` });
			});
	};

	static listarLivroEditora = (req, res) => {
		const editora = req.query.editora;
		livros
			.find({"editora": editora})
			.populate("autor")
			.then((livros) => {
				res.status(200).send(livros);
			})
			.catch((erro) => {
				res
					.status(400)
					.send({ message: `${erro.message} - livros não localizados.` });
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

	static excluirLivro = (req, res) => {
		const id = req.params.id;
		livros
			.findByIdAndDelete(id)
			.then(() => {
				res.status(200).send();
			})
			.catch((erro) => {
				res
					.status(500)
					.send({ message: `${erro.message} - falha ao deletar livro` });
			});
	};
}

export default LivroController;
