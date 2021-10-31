// products
{
  "id": INT,
  "name": STRING,
  "slogan": STRING,
  "description": STRING,
  "category": STRING,
  "default_price": INT,
  "features": [
    {
      "feature": STRING,
      "value": STRING
    }
  ],
  "styles": [
    {
      "style_id": INT,
      "name": STRING,
      "original_price": INT,
      "sale_price": INT,
      "default?": BOOLEAN,
      "photos": [
        {
          "thumbnail_url": STRING,
          "url": STRING
        }
      ],
      "skud": INT
    }
  ],
  "related": [
    INT
  ]
}