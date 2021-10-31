const app = require('./index.js');
require('dotenv').config();

// without docker
const PORT = 80;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
})

// // with docker
// const PORT = process.env.PORT || 8080;
// const HOST = '0.0.0.0';
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);