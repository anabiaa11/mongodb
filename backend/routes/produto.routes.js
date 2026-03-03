const express = require("express");
const router = express.Router();
const Produto = require("../models/produto.model");

// GET - Listar todos (com busca e paginação)
router.get("/", async (req, res) => {
  try {
    const { categoria, search, page = 1, limit = 10 } = req.query;
    const query = {};
    if (categoria) query.categoria = categoria;
    if (search) {
      query.$or = [
        { nome: { $regex: search, $options: "i" } },
        { descricao: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const total = await Produto.countDocuments(query);
    const produtos = await Produto.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    res.json({ success: true, data: produtos, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET - Buscar por ID
router.get("/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ success: false, message: "Produto não encontrado" });
    res.json({ success: true, data: produto });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - Criar
router.post("/", async (req, res) => {
  try {
    const produto = new Produto(req.body);
    const salvo = await produto.save();
    res.status(201).json({ success: true, data: salvo, message: "Produto criado com sucesso!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors.join(", ") });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT - Atualizar
router.put("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produto) return res.status(404).json({ success: false, message: "Produto não encontrado" });
    res.json({ success: true, data: produto, message: "Produto atualizado com sucesso!" });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors.join(", ") });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE - Remover
router.delete("/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ success: false, message: "Produto não encontrado" });
    res.json({ success: true, message: "Produto removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
