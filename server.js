import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/src", express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_, res) => {
  res.json({ status: "ok", service: "clima-app", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Servidor listo en http://localhost:${PORT}`));
