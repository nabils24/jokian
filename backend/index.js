const path = require('path');
// load dependencies
const env = require('dotenv');
const csrf = require('csurf');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const router = express.Router();

//Loading Routes
const webRoutes = require('./routes/web');


env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(webRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
