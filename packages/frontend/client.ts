import express from "express";
import path from "path";

const app = express()
const PORT = 8080
const url = "https://localhost:8080"

app.use(express.static(path.join(__dirname, "/dist")))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "/index.html"))
})

app.listen(PORT, () => console.log(`КЛИЕНТ ЗАПУЩЕН НА ПОРТУ ${PORT}, САЙТ: ${url}`))