import { PORT, URL_CLIENT } from "@app/shared/URLS";
import express from "express";
import path from "path";

const app = express()

app.use(express.static(path.join(__dirname, "/dist")))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "/index.html"))
})

app.listen(PORT, () => console.log(`КЛИЕНТ ЗАПУЩЕН НА ПОРТУ ${PORT}, САЙТ: ${URL_CLIENT}`))