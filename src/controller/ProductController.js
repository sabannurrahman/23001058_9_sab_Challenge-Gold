const products = [{
    id: 1,
    namaProduk: 'baju',
    jumlah: 2,
    deskripsi: 'baju pria'
  },
  {
    id: 2,
    namaProduk: 'celana',
    jumlah: 3,
    deskripsi: 'celana pria'
  },
  {
    id: 3,
    namaProduk: 'sepatu',
    jumlah: 4,
    deskripsi: 'sepatu pria'
  },
  {
    id: 4,
    namaProduk: 'topi',
    jumlah: 6,
    deskripsi: 'topi pria'
  },
];

const allProduct = (req, res) =>{
    const data = products;
    const result = {
      status: 'ok',
      data: data
    }
    res.json(result)
}


const productById = (req, res) =>{
    const { id } = req.params
    let product
    for (let i = 0; i < products.length; i++) {
  
      if (products[i].id === Number(id)) {
        product = products[i]
      }
  
    }
  
    if (product === undefined) {
      res.status(404).json({
        status: 'failed',
        message: `data dengan id (${id}) tidak ditemukan`
      })
    }
  
    res.json({
      status: 'ok',
      data: product
    })
  
}

const createProduct = (req, res) =>{
    const {namaProduk, jumlah, deskripsi} = req.body

const lastId = products[products.length-1].id
const newId = lastId+1
  //menambahkan produk baru
const newData = {id:newId, namaProduk:namaProduk, jumlah:jumlah, deskripsi:deskripsi} 
  products.push(newData)

  res.status(201).json({
    status: 'ok',
    message: 'data berhasil ditambahkan',
    data : newData
  })
}

module.exports = {allProduct, productById, createProduct}