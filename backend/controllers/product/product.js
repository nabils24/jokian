const Product = require('../../models/index').Product;
const Op = require(`sequelize`).Op

// Controller untuk membuat produk baru
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      "status" : true,
      "message" : "Success! Create Product",
      "data" : {
        product
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller untuk menampilkan semua produk
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Product",
      "data" : {
        product
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail produk berdasarkan ID
async function getProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Product",
      "data" : {
        product
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail produk berdasarkan Nama Yang Mirip
async function getProductByName(req, res) {
  try {
    const name = req.params.name;
    const product = await Product.findAll({
      where: {
          name: {
              [Op.like]: `%${name}%`,
          },
      },
  });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Product",
      "data" : {
        product
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk mengupdate produk berdasarkan ID
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const [updated] = await Product.update(req.body, {
      where: { id: productId }
    });
    if (!updated) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    const updatedProduct = await Product.findByPk(productId);
    res.status(200).json({
      "status" : true,
      "message" : "Success! Updated Product",
      "data" : {
        updatedProduct
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menghapus produk berdasarkan ID
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const deleted = await Product.destroy({
      where: { id: productId }
    });
    if (!deleted) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Deleted Product",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductByName,
  updateProduct,
  deleteProduct
};
