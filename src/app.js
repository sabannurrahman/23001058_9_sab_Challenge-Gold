const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index.js')

app.use(express.json())
app.use(router);

app.get('/', (req, res) => {
  res.json({
    message: "ini adalah respon json"
  })
})




app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`)
})