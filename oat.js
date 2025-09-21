const express = require('express');
const app = express();

app.use(express.json());


let Lojinha = [];

// Funções CRUD reutilizáveis
function create(item) {
  const id = data.length + 1;
  const newItem = { id, ...item };
  data.push(newItem);
  return newItem;
}

function readAll() {
  return data;
}

function readById(id) {
  return data.find(item => item.id === id) || null;
}

function update(id, updates) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updates };
    return data[index];
  }
  return null;
}

function deleteById(id) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    return deletedItem;
  }
  return null;
}

// Rotas
app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const produto = readById(parseInt(id));
  if (produto) {
    res.json(produto);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.get("/produtos", (req, res) => {
  res.json(readAll());
});

app.post("/produtos", (req, res) => {
  const { nomeitm, precoitm, marcaitm, loja, tamanho } = req.body;
  if (!nomeitm || !precoitm || !marcaitm || !loja || !tamanho) {
    return res.status(400).json({ message: "Dados incompletos" });
  }
  const novoProduto = create({ nome, preco, marca, loja, tamanho });
  res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nomeitm, precoitm, marcaitm, loja, tamanho } = req.body;
  const atualizado = update(parseInt(id), { nomeitm, precoitm, marcaitm, loja, tamanho });
  if (atualizado) {
    res.json(atualizado);
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const deletado = deleteById(parseInt(id));
  if (deletado) {
    res.json({ message: "Produto deletado com sucesso!", deletado });
  } else {
    res.status(404).json({ message: "Produto não encontrado" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});