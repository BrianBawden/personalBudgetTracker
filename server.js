
const app = require('./app');
const connection = require('./db/connect');

require('dotenv').config();
const port = process.env.PORT || 8080;

connection.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
    console.log(`API documentation - localhost: http://localhost:${port}/api-docs`);
    // console.log(`API documentation - Production server: ${render}/api-docs`);
  }
});
