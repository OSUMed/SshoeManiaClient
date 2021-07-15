


let mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "sshoe_mania"
});

module.exports.pool = pool;
