const pg = require('pg');

if( process.env.DATABASE_URL ){

    //make the configs object
    var configs = {
      user: 'sabrinachow',
      password: 'scmbs161298',
      host: process.env.DATABASE_URL,
      port: 5432,
      database: 'wireFrame_db'
    };
  
  }else{
  
    //otherwise we are on the local network
    var configs = {
        user: 'sabrinachow',
        host: '127.0.0.1',
        database: 'wireFrame',
        port: 5432
    };
  }

const poolObj = new pg.Pool(configs);

poolObj.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});

const userModel = require('./models/user');
const appleModel = require('./models/app');
const userObj = userModel(poolObj);
const appleObj = appleModel(poolObj);


module.exports = {
    user: userObj,
    pool: poolObj,
    apple: appleObj
}