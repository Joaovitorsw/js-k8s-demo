const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend 👋" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
