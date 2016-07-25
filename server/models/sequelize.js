var Sequelize = require('sequelize');

// require('pg').types.setTypeParser(1114, function(stringValue) {
//     return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + 'Z');
// });

require('pg').types.setTypeParser(1114, function(stringValue) {
  return new Date(stringValue + "+0000");
  // e.g., UTC offset. Use any offset that you would like.
});

if (process.env.DATABASE_URL) {
  var db = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: 5432
  });

} else {
  var db = new Sequelize('rumi', 'rumi', '', {
    host: 'localhost',
    dialect: 'postgres',
  });
}

module.exports = db;
