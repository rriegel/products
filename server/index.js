const express = require('express');
const bodyParser = require('body-parser')
const db = require('./db');
const formatting = require('./helpers/formatting.js');
const queries = require('./helpers/queries.js');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// test endpoint
app.get('/test', (req, res) => {
  console.log('host: ', req.headers.host);
  res.status(200);
  res.send('hello world');
  res.end();
});

// initial get request to retrieve the first data set
app.get('/products', (req, res) => {

  var page;
  var count;
  req.query.page ? page = req.query.page : page = 1;
  req.query.count ? count = req.query.count : count = 5;
  var queryString = `SELECT * FROM products LIMIT ${count * (page-1) }, ${count}`;

  db.query(queryString)
    .then( response => {
      res.status(200).send(formatting.products(response));
    })
    .catch( err => {
      console.log('ERROR RETRIEVING PRODUCTS: ', err);
      res.status(404).send(err);
    })
});
// select json_object(
//   'id',p.id
//  ,'desc',p.`desc`
//  ,'child_objects',(select CAST(CONCAT('[',
//                 GROUP_CONCAT(
//                   JSON_OBJECT(
//                     'id',id,'parent_id',parent_id,'desc',`desc`)),
//                 ']')
//          AS JSON) from child_table where parent_id = p.id)

//  ) from parent_table p;
// request to a specific product id
app.get('/products/:product_id', (req, res) => {

  // var jointQuery = `SELECT JSON_OBJECT(
  //   'id',
  // )`

  var featuresQuery = `SELECT * FROM features WHERE product_id = ${req.params.product_id}`;
  var productQuery = `SELECT * FROM products WHERE id = ${req.params.product_id}`;

  var featuresRes, productRes;
  db.query(featuresQuery)
    .then( response => {
      featuresRes = formatting.features(response);
      return db.query(productQuery);
    })
    .then( response => {
      productRes = formatting.products(response, featuresRes);
      if (!Array.isArray(productRes)) {
        res.status(200).send(productRes);
      } else {
        res.status(404).send('This product does not exist.');
      }
    })
    .catch( err => {
      console.log(err);
      res.status(404).send(err);
    })
});

app.get('/products/:product_id/styles', (req, res) => {

  queries.getStyles(req.params.product_id)
    .then( response => {
      res.status(200).send(response);
    })
    .catch( err => {
      console.log(err);
      res.status(404).send(err);
    })

})

app.get('/products/:product_id/related', (req, res) => {
  var relatedQuery = `SELECT related_product_id FROM related WHERE current_product_id = ${req.params.product_id}`;
  db.query(relatedQuery)
    .then( response => {
      res.status(200).send(formatting.related(response));
    })
    .catch( err => {
      console.log(err);
      res.status(404).send(err);
    })
})



module.exports = app;