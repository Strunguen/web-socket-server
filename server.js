import express from "express";
import { WebSocketServer } from "ws";

const app = express();

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
