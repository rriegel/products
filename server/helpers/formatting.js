// formatting helper functions !!

let products = function(raw, features) {
  var resFormatted = [];
  for (var i = 0; i < raw.length; i ++) {
    var _price = raw[i].default_price;
    if (_price !== null && _price.includes('$')) {
      _price = _price.substring(1);
    }
    // if features are defined - this is a specific product_id lookup
    if (features) {
      var productInfo = {
        "id": raw[i].id,
        "name": raw[i].product_name,
        "slogan": raw[i].slogan,
        "description": raw[i].product_description,
        "category": raw[i].category,
        "default_price": _price,
        "features": features
      }
      return productInfo;

    } else {
      var productInfo = {
        "id": raw[i].id,
        "name": raw[i].product_name,
        "slogan": raw[i].slogan,
        "description": raw[i].product_description,
        "category": raw[i].category,
        "default_price": _price
      }
      resFormatted.push(productInfo);
    }
  }
  return resFormatted;

};

let features = function(raw) {
  var resFormatted = [];
  for (var i = 0; i < raw.length; i ++) {

    var featureInfo = {
      "feature": raw[i].feature,
      "value": raw[i].feature_value
    }
    resFormatted.push(featureInfo);
  }
  return resFormatted;
};

let styles = function(raw, id) {


  var resFormatted = {
    "product_id": id.toString(),
    "results": []
  };
  for (var i = 0; i < raw.length; i ++) {
    // loop through photos to format the contents befor pushing into final res
    var formattedPhotos = [];
    for (var j = 0; j < raw[i].photos.length; j ++) {
      formattedPhotos.push({
        "thumbnail_url": raw[i].photos[j].thumbnail_url,
        "url": raw[i].photos[j].main_url
      })
    }
    // loop through skus to format the contents befor pushing into final res
    var formattedSkus = {};
    for (var k = 0; k < raw[i].skus.length; k ++) {
      formattedSkus[raw[i].skus[k].id] = {
        "quantity": raw[i].skus[k].quantity,
        "size": raw[i].skus[k].size
      }
    }
    resFormatted.results.push({
      "style_id": raw[i].id,
      "name": raw[i].style_name,
      "original_price": raw[i].original_price,
      "sale_price": raw[i].sale_price,
      "default?": Number(raw[i].default_style) === 1,
      "photos": formattedPhotos,
      "skus": formattedSkus
    })
  }
  return resFormatted;
}

let related = function(raw) {
  var resFormatted = [];
  for (var i = 0; i < raw.length; i ++) {
    resFormatted.push(raw[i].related_product_id);
  }
  return resFormatted;
}



module.exports = {
  'products': products,
  'features': features,
  'styles': styles,
  'related': related
}