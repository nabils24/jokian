const  OrderList  = require('../../models/index').OrderList;
const  OrderDetail  = require('../../models/index').OrderDetail;

// Controller untuk membuat order list baru
async function createOrderList(req, res) {
  try {
    const { customer_name, order_type, order_date, order_detail } = req.body;

    console.log(req.body)

    // Buat order list baru
    const newOrderList = await OrderList.create({
      customer_name,
      order_type,
      order_date
    });

    // Buat order detail untuk setiap item dalam order_detail
    const orderDetails = [];
    for (const item of order_detail) {
      const { product_id, price, quantity } = item;
      const orderDetail = await OrderDetail.create({
        order_id: newOrderList.id,
        product_id,
        price,
        quantity
      });
      orderDetails.push(orderDetail);
    }

    res.status(200).json({
      "status" : true,
      "message" : "Success! Created Product",
      "data" : {
        order_list: newOrderList,
        order_details: orderDetails
      }
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
      include: [{ model: OrderDetail }]
    });

    // Kirimkan respons dengan data order list beserta detailnya
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Product",
      "data" : {
        orders
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail order list berdasarkan ID
async function getOrderListById(req, res) {
  try {
    const orderListId = req.params.id;
    const orderList = await OrderList.findByPk(orderListId, {
      include: OrderDetail // Include the OrderDetail model
    });
    if (!orderList) {
      res.status(404).json({ error: 'Order list not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Product",
      "data" : {
        orderList
      }
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
      where: { id: orderListId }
    });
    if (!deleted) {
      res.status(404).json({ error: 'Order list not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Deleted Order"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createOrderList,
  getOrderLists,
  getOrderListById,
  deleteOrderList
};
