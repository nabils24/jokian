const OrderList = require("../../models/index").OrderList;
const Tables = require("../../models/index").Table;
const OrderDetail = require("../../models/index").OrderDetail;
const Product = require("../../models/index").Product;
const Op = require(`sequelize`).Op

//Print Receipt/Nota
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Controller untuk membuat order list baru
async function createOrderList(req, res) {
  try {
    const { customer_name, order_type, order_date, order_detail } =
      req.body;

    console.log(req.body);

    // Cek apakah tabel aktif berdasarkan table_id
    // const table = await Tables.findByPk(table_id);
    // if (!table) {
    //   return res
    //     .status(404)
    //     .json({ status: false, message: "Table not found" });
    // }

    // // Jika tabel tidak aktif, kembalikan error
    // if (table.status_table === "inactive") {
    //   return res
    //     .status(400)
    //     .json({ status: false, message: "Table is Not Available" });
    // }

    // // Jika tabel aktif, ubah status_table menjadi 'inactive'
    // await table.update({ status_table: "inactive" });

    // Buat order list baru
    const newOrderList = await OrderList.create({
      customer_name,
      order_type,
      order_date,
      // table_id, // Tambahkan table_id ke dalam order list
    });

    // Buat order detail untuk setiap item dalam order_detail
    const orderDetails = [];
    for (const item of order_detail) {
      const { product_id, price, quantity } = item;
      const orderDetail = await OrderDetail.create({
        order_id: newOrderList.id,
        product_id,
        price,
        quantity,
      });
      orderDetails.push(orderDetail);
    }

    res.status(200).json({
      status: true,
      message: "Success! Created Order List",
      data: {
        order_list: newOrderList,
        order_details: orderDetails,
        // updated_table: table, // Menyertakan informasi table yang telah di-update
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller untuk menampilkan semua order list
async function getOrderLists(req, res) {
  try {
    // Dapatkan semua data order list beserta detailnya
    const orders = await OrderList.findAll({
      include: [{ model: OrderDetail }],
    });

    // Kirimkan respons dengan data order list beserta detailnya
    res.status(200).json({
      status: true,
      message: "Success! Find Product",
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOrderListsByDate(req, res) {
  try {
    const { date } = req.query; // Mengambil parameter tanggal dari query string

    if (!date) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Please provide a date in the query parameter.",
        });
    }

    // Log tanggal yang diterima
    console.log(`Received date query: ${date}`);

    // Ambil semua order berdasarkan order_date
    const orders = await OrderList.findAll({
      where: {
        order_date: {
          [Op.gte]: new Date(date + "T00:00:00Z"), // Mulai dari awal hari
          [Op.lte]: new Date(date + "T23:59:59Z"), // Sampai akhir hari
        },
      },
      include: [{ model: OrderDetail }],
    });

    // Log hasil query
    console.log(`Orders retrieved: ${JSON.stringify(orders)}`);

    // Jika tidak ada order yang ditemukan
    if (orders.length === 0) {
      return res
        .status(404)
        .json({
          status: false,
          message: "No orders found for the given date.",
        });
    }

    // Kirimkan respons dengan data order list yang ditemukan
    res.status(200).json({
      status: true,
      message: `Success! Orders found for the given date ${date}`,
      data: {
        orders,
      },
    });
  } catch (error) {
    console.error(`Error in getOrderListsByDate: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail order list berdasarkan ID
async function getOrderListById(req, res) {
  try {
    const orderListId = req.params.id;
    const orderList = await OrderList.findByPk(orderListId, {
      include: OrderDetail, // Include the OrderDetail model
    });
    if (!orderList) {
      res.status(404).json({ error: "Order list not found" });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Success! Find Product",
      data: {
        orderList,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menghapus order list berdasarkan ID
async function deleteOrderList(req, res) {
  try {
    const orderListId = req.params.id;
    const deleted = await OrderList.destroy({
      where: { id: orderListId },
    });
    if (!deleted) {
      res.status(404).json({ error: "Order list not found" });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Success! Deleted Order",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Fungsi untuk format uang dalam Rupiah
function formatRupiah(amount) {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

// Controller untuk mencetak nota transaksi menjadi PDF dan mengembalikan linknya
async function printReceiptPDF(req, res) {
  try {
    const orderListId = req.params.id;

    // Temukan order list berdasarkan ID dan sertakan detail pemesanan beserta nama produk
    const orderList = await OrderList.findByPk(orderListId, {
      include: [
        {
          model: OrderDetail,
          include: [{ model: Product, attributes: ["name"] }], // Ambil nama produk
        },
      ],
    });

    if (!orderList) {
      return res.status(404).json({ error: "Order list not found" });
    }

    // Ambil nama kasir dari req.user (misalnya jika menggunakan sistem otentikasi)
    const cashierName = req.userKasir ? req.userKasir.email : "Unknown Cashier"; // Sesuaikan dengan sistem autentikasi yang kamu gunakan
    // Nama kafe (dapat disesuaikan atau diambil dari pengaturan sistem)
    const cafeName = "Naffie's Restaurant";

    // Format data pemesanan
    const orderItems = orderList.OrderDetails.map(item => ({
      product_name: item.Product.name, // Ambil nama produk dari relasi Product
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));

    // Hitung total keseluruhan
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.total,
      0,
    );

    // Tentukan jalur folder penyimpanan di luar controller (misalnya /public/receipts)
    const pdfFileName = `receipt_${orderListId}.pdf`;
    const pdfFilePath = path.resolve("public", "receipts", pdfFileName);

    // Buat folder jika belum ada
    if (!fs.existsSync(path.dirname(pdfFilePath))) {
      fs.mkdirSync(path.dirname(pdfFilePath), { recursive: true });
    }

    // Membuat dokumen PDF baru
    const doc = new PDFDocument();
    const pdfStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(pdfStream);

    // Header Nota
    doc.fontSize(20).text(cafeName, { align: "center" }).moveDown();

    // Detail Transaksi
    doc
      .fontSize(12)
      .text(`Tanggal Transaksi: ${orderList.order_date}`)
      .text(`Nama Kasir: ${cashierName}`)
      .text(`Nama Pelanggan: ${orderList.customer_name}`)
      .text(`Nomor Meja: ${orderList.table_id}`)
      .moveDown();

    // Detail Item Pesanan
    doc.text("Detail Pesanan:", { underline: true }).moveDown();

    orderItems.forEach((item, index) => {
      doc.text(
        `${index + 1}. Nama Produk: ${item.product_name} | Quantity: ${
          item.quantity
        } | Price: ${formatRupiah(item.price)} | Total: ${formatRupiah(
          item.total,
        )}`,
      );
    });

    // Total Harga
    doc
      .moveDown()
      .fontSize(14)
      .text(`Total: ${formatRupiah(totalAmount)}`, { align: "right" });

    // Akhiri pembuatan dokumen
    doc.end();

    // Setelah selesai menulis PDF, beri respon dengan link ke file PDF
    pdfStream.on("finish", function () {
      const baseUrl = `${req.protocol}://${req.get("host")}`; // Mendapatkan base URL dari request
      const pdfUrl = `${baseUrl}/receipts/${pdfFileName}`; // URL lengkap untuk mengakses file PDF

      // Kirimkan respons JSON dengan link ke file PDF
      res.status(200).json({
        status: true,
        message: "Receipt created successfully",
        data: {
          receipt_url: pdfUrl,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOrderList,
  getOrderLists,
  getOrderListById,
  getOrderListsByDate,
  deleteOrderList,
  printReceiptPDF,
};
