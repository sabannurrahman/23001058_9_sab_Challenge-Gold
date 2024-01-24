const express = require('express')
const app = express()
const port = 3000
const router = require('./routers/index.js')

app.use(express.json())
app.use(router);

//Note: Endpoint testing seperti ini bisa dihapus saja
app.get('/', (req, res) => {
  res.json({
    message: "ini adalah respon json"
  })
})


//Note: Jarak disini terlalu jauh. Jika tidak mau repot bisa pakai extension seperti prettier untuk merapihkan code

//Note: Kenapa folder node_modules isinya package.json?
//Note: node_modules jangan pernah dipush lagi ke git!

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port ${port}`)
})