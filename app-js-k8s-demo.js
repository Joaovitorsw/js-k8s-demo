const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Log inicial
console.log("🔥 Starting backend container...");

// Middleware para logar cada requisição
app.use((req, res, next) => {
  console.log(`📥 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Servir arquivos estáticos
app.use(express.static("public"));

// Endpoint principal
app.get("/api/message", (req, res) => {
  console.log("💬 Responding with backend message...");
  res.json({ message: "Hello from backend 👋" });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Backend running and listening on port ${PORT}`);
});
