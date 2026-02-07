const obj = require('./test');
const oracledb = require('./oracladb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

function getConnection() {
    return await oracledb.getConnection({
        user: "scott",
        password: "tiger",
        connectString: "192.168.217.1:1521/xe".
    });
}

module.exports = {getConnection, oracledb};