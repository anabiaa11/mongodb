const mongoose = require("mongoose");

const ProdutoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      maxlength: [100, "Nome não pode exceder 100 caracteres"],
    },
    descricao: {
      type: String,
      trim: true,
      maxlength: [500, "Descrição não pode exceder 500 caracteres"],
    },
    preco: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0, "Preço não pode ser negativo"],
    },
    categoria: {
      type: String,
      required: [true, "Categoria é obrigatória"],
      enum: ["Eletrônicos", "Roupas", "Alimentos", "Livros", "Outros"],
      default: "Outros",
    },
    estoque: {
      type: Number,
      default: 0,
      min: [0, "Estoque não pode ser negativo"],
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Produto", ProdutoSchema);
