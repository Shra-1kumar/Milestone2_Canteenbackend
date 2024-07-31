const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL_PROD)
.then(() => console.log('database connected'))
.catch((err) => console.log(`An error occurred in connecting with database:${err}`))