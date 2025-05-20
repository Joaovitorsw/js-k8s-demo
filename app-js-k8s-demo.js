const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Log inicial
console.log("🔥 Starting backend container...");

// Middleware para parsear JSON (caso você envie body POST futuramente)
app.use(express.json());

// Log detalhado por requisição
app.use((req, res, next) => {
  const start = Date.now();

  // Continua a execução e intercepta a resposta
  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(`
📥 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}
🧠 Headers: ${JSON.stringify(req.headers, null, 2)}
📦 Query: ${JSON.stringify(req.query)}
🧾 Body: ${JSON.stringify(req.body)}
📡 IP: ${req.ip}
⏱ Tempo de resposta: ${duration}ms
🔚 Status: ${res.statusCode}
---------------------------------------------
    `);
  });

  next();
});

// Servir arquivos estáticos
app.use(express.static("public"));

// Endpoint principal
app.get("/api/message", (req, res) => {
  const response = { message: "Hello from backend 👋" };
  console.log("💬 Responding with:", response);
  res.json(response);
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Backend running and listening on port ${PORT}`);
});
app.get("/api/env", (req, res) => {
  const envKeys = Object.keys(process.env).filter(
    (key) =>
      // filtra só os que você sabe que vêm do secret, por prefixo ou nome
      key.startsWith("PASSWORD") || key.startsWith("SECRET_")
  );

  const result = {};
  envKeys.forEach((key) => {
    result[key] = process.env[key];
  });

  console.log("🔐 Exposing environment variables from secret:", result);
  res.json(result);
});
