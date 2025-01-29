const Tables = require('../../models/index').Table;
const Op = require(`sequelize`).Op

// Controller untuk membuat produk baru
async function createTable(req, res) {
  try {
    const Table = await Tables.create(req.body);
    res.status(200).json({
      "status" : true,
      "message" : "Success! Create Table",
      "data" : {
        Table
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller untuk menampilkan semua produk
async function getTables(req, res) {
  try {
    const Tables = await Tables.findAll();
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Table",
      "data" : {
        Table
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail produk berdasarkan ID
async function getTableById(req, res) {
  try {
    const TableId = req.params.id;
    const Table = await Tables.findByPk(TableId);
    if (!Table) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Table",
      "data" : {
        Table
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menampilkan detail produk berdasarkan Nama Yang Mirip
async function getTableByName(req, res) {
  try {
    const name = req.params.name;
    const Table = await Tables.findAll({
      where: {
          tables_name: {
              [Op.like]: `%${name}%`,
          },
      },
  });
    if (!Table) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Find Table",
      "data" : {
        Table
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk mengganti status_table berdasarkan ID
async function updateTableStatus(req, res) {
  try {
    const tableId = req.params.id;

    // Cari tabel berdasarkan ID
    const existingTable = await Tables.findByPk(tableId);
    if (!existingTable) {
      return res.status(404).json({ error: 'Table not found' });
    }

    // Tentukan status baru berdasarkan status saat ini
    const newStatus = existingTable.status_table === 'active' ? 'inactive' : 'active';

    // Update status_table
    existingTable.status_table = newStatus;
    await existingTable.save();

    res.status(200).json({
      status: true,
      message: "Success! Updated Table Status",
      data: {
        updatedTable: existingTable,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Controller untuk mengupdate produk berdasarkan ID
async function updateTable(req, res) {
  try {
    const TableId = req.params.id;
    const [updated] = await Tables.update(req.body, {
      where: { id: TableId }
    });
    if (!updated) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    const updatedTable = await Tables.findByPk(TableId);
    res.status(200).json({
      "status" : true,
      "message" : "Success! Updated Table",
      "data" : {
        updatedTable
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk menghapus produk berdasarkan ID
async function deleteTable(req, res) {
  try {
    const TableId = req.params.id;
    const deleted = await Tables.destroy({
      where: { id: TableId }
    });
    if (!deleted) {
      res.status(404).json({ error: 'Table not found' });
      return;
    }
    res.status(200).json({
      "status" : true,
      "message" : "Success! Deleted Table",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTable,
  getTables,
  getTableById,
  getTableByName,
  updateTable,
  updateTableStatus,
  deleteTable
};
