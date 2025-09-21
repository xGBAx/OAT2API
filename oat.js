// Array que servirá como armazenamento de dados in-memory
let data = [];

// Função para Create (C): Adiciona um novo item ao array, atribuindo um ID incremental
function create(item) {
  // Gera um ID baseado no tamanho atual do array (incremental)
  const id = data.length + 1;
  const newItem = { id, ...item };
  data.push(newItem);
  return newItem; // Retorna o item criado
}

// Função para Read (R): Lê todos os itens do array
function readAll() {
  return data; // Retorna o array completo
}

// Função para Read (R): Lê um item específico pelo ID
function readById(id) {
  return data.find(item => item.id === id) || null; // Retorna o item ou null se não encontrado
}

// Função para Update (U): Atualiza um item existente pelo ID
function update(id, updates) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    // Mescla as atualizações com o item existente, preservando o ID
    data[index] = { ...data[index], ...updates };
    return data[index]; // Retorna o item atualizado
  }
  return null; // Retorna null se não encontrado
}

// Função para Delete (D): Remove um item pelo ID
function deleteById(id) {
  const index = data.findIndex(item => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    return deletedItem; // Retorna o item deletado
  }
  return null; // Retorna null se não encontrado
}

const express = require('express');
const app = express();

app.use(express.json());

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
  const { nome, preco, marca } = req.body;
  const novoProduto = create({ nome, preco, marca });
  res.status(201).json(novoProduto);
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;
  const { nome, preco, marca } = req.body;
  const atualizado = update(parseInt(id), { nome, preco, marca });
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