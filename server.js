import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Necesario para rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir el cliente HTML en la raíz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Render asigna el puerto en la variable de entorno PORT
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Servidor WebSocket sobre el mismo servidor HTTP
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Cliente conectado ✅");

  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());
    ws.send("Echo: " + msg);
  });

  ws.on("close", () => {
    console.log("Cliente desconectado ❌");
  });
});
