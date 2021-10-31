const db = require('../db');
const formatting = require('./formatting.js');

const getStyles = async (id) => {
  var data = await db.query(`SELECT * FROM styles WHERE product_id = ${id}`)
  for (var i = 0; i < data.length; i++) {
    data[i].photos = await getPhotos(data[i].id);
    data[i].skus = await getSkus(data[i].id);
  }
  data = formatting.styles(data, id);
  return data;
}
const getPhotos = async (id) => {
  var data = await db.query(`SELECT * FROM photos WHERE styleId = ${id}`)
  return data;
}
const getSkus = async (id) => {
  var data = await db.query(`SELECT * FROM skus WHERE styleId = ${id}`)
  return data;
}

module.exports = {
  'getStyles': getStyles
}