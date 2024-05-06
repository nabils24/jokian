const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/index').User // Sesuaikan dengan lokasi model Anda
// Controller untuk membuat user baru
async function createUser(req, res) {
  try {
    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = await User.create({ ...req.body, password: hashedPassword });

    // Generate token untuk autentikasi
    const token = jwt.sign({ userId: user.id }, 'monti'); // Ganti 'monti' dengan kunci rahasia Anda

    res.status(201).json({
      "status" : true,
      "message" : "created User",
      "data" : {
        user,
        token
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Controller untuk login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Periksa apakah password cocok
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate token untuk autentikasi
    const token = jwt.sign({ userId: user.id }, 'monti'); // Ganti 'monti' dengan kunci rahasia Anda

    res.status(201).json({
      "status" : true,
      "message" : "Success Logged",
      "data" : {
        user,
        token
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Middleware untuk verifikasi token JWT
function verifyToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }
  
    // Periksa apakah token berada dalam format yang benar (Bearer {token})
    const [scheme, token] = authorizationHeader.split(' ');
    if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
      return res.status(401).json({ error: 'Invalid authorization header format' });
    }
  
    // Verifikasi token JWT
    jwt.verify(token, 'monti', (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  }
  

// Controller untuk mendapatkan detail user berdasarkan ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(201).json({
      "status" : true,
      "message" : "Finded! User",
      "data" : {
        user
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Controller untuk mengupdate user berdasarkan ID
async function updateUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      let updatedPassword;
      if (userData.password) {
        // Jika ada password baru, hash password baru
        updatedPassword = await bcrypt.hash(userData.password, 10);
      } else {
        // Jika tidak ada password baru, gunakan password lama
        updatedPassword = user.password;
      }
  
      // Perbarui data pengguna dengan password baru atau lama
      const [updated] = await User.update(
        { ...userData, password: updatedPassword },
        { where: { id: userId } }
      );
  
      if (!updated) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Dapatkan data pengguna yang diperbarui
      const updatedUser = await User.findByPk(userId);
      res.status(201).json({
        "status" : true,
        "message" : "updated! User",
        "data" : {
          updateUser
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

// Controller untuk menghapus user berdasarkan ID
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { id: userId }
    });
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).json({
      "status" : true,
      "message" : "deleted! User"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  loginUser,
  verifyToken,
  getUserById,
  updateUser,
  deleteUser
};
