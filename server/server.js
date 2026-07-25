import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Servir os arquivos estáticos da pasta dist gerada pelo Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Rota catch-all para Single Page Application (React/Vite)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor Viva+ rodando na porta ${PORT}`);
});