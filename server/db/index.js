const mysql = require('mysql');

class Connection {
  constructor() {
    // // configured for deployment
    // this.connection = mysql.createConnection({
    //   host: '3.142.83.237',
    //   user: 'rriegel2',
    //   password: '110420Jhu!',
    //   database: 'catwalkProducts'
    // });
    // for local
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'student',
      password: 'student',
      database: 'catwalkProducts'
    });
  }
  query(sql, args) {
    return new Promise ((resolve, reject) => {
      this.connection.query(sql, args, (err, res) => {
        if (err) {
          return reject( err );
        } else {
          resolve( res );
        }
      });
    })
  }
  close() {
    return new Promise( (resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      })
    })
  }
}

module.exports = new Connection;