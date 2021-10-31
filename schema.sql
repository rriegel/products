--  command to run this file
--  to import this file from the command line run:
--  mysql -u root < schema.sql

-- DROP DATABASE IF EXISTS catwalkProducts;

CREATE DATABASE catwalkProducts;

USE catwalkProducts;

-- products

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_name VARCHAR(255),
  slogan VARCHAR(510),
  product_description VARCHAR(510),
  category VARCHAR(255),
  default_price VARCHAR(255)
);

LOAD DATA LOCAL INFILE '~/Documents/hrwork/products/assets/product.csv' INTO TABLE products
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, @name, @slogan, @description, @category, @price)
SET product_name = NULLIF(@name,''),
    slogan = NULLIF(@slogan,''),
    product_description = NULLIF(@description,''),
    category = NULLIF(@category,''),
    default_price = NULLIF(@price,'');

-- update products

UPDATE products
  SET default_price = category, category = product_description, product_description = '' WHERE default_price IS NULL;

-- styles

DROP TABLE IF EXISTS styles;

CREATE TABLE IF NOT EXISTS styles (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id INTEGER,
  style_name VARCHAR(255),
  sale_price VARCHAR(255),
  original_price VARCHAR(255),
  default_style VARCHAR(255)
);

ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES products (id);
CREATE INDEX product_id_index ON styles (product_id);

LOAD DATA LOCAL INFILE 'assets/styles.csv' INTO TABLE styles
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, @style_name, @sale_price, @original_price, @default_style)
SET style_name = NULLIF(@style_name,''),
    sale_price = NULLIF(@sale_price,''),
    original_price = NULLIF(@original_price,''),
    default_style = NULLIF(@default_style,'');

-- features

DROP TABLE IF EXISTS features;

CREATE TABLE IF NOT EXISTS features (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  product_id INTEGER,
  feature VARCHAR(255),
  feature_value VARCHAR(255)
);

ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES products (id);
CREATE INDEX product_id_index ON features (product_id);

LOAD DATA LOCAL INFILE 'assets/features.csv' INTO TABLE features
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, @feature, @value)
SET feature = NULLIF(@feature,''),
    feature_value = NULLIF(@value,'');

-- photos

DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  styleId INTEGER,
  main_url VARCHAR(510),
  thumbnail_url VARCHAR(510)
);

ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES styles (id);
CREATE INDEX styleId_index ON photos (styleId);

LOAD DATA LOCAL INFILE 'assets/photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, styleId, @main_url, @thumbnail_url)
SET main_url = NULLIF(@main_url,''),
    thumbnail_url = NULLIF(@thumbnail_url,'');

-- skus

DROP TABLE IF EXISTS skus;

CREATE TABLE IF NOT EXISTS skus (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  styleId INTEGER,
  size VARCHAR(255),
  quantity INTEGER
);

ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES styles (id);
CREATE INDEX styleId_index ON skus (styleId);

LOAD DATA LOCAL INFILE 'assets/skus.csv' INTO TABLE skus
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, styleId, @size, @quantity)
SET size = NULLIF(@size,''),
    quantity = NULLIF(@quantity,'');

-- related

DROP TABLE IF EXISTS related;

CREATE TABLE IF NOT EXISTS related (
  id INTEGER AUTO_INCREMENT UNIQUE PRIMARY KEY,
  current_product_id INTEGER,
  related_product_id INTEGER
);

ALTER TABLE related ADD FOREIGN KEY (current_product_id) REFERENCES products (id);
CREATE INDEX product_id_index ON related (current_product_id);

LOAD DATA LOCAL INFILE 'assets/related.csv' INTO TABLE related
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;