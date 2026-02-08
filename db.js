const oracledb = require("oracledb");

async function getConnection() {
  return await oracledb.getConnection({
    user: "사용자계정",
    password: "비밀번호",
    connectString: "localhost:1521/xe"
  });
}

module.exports = { getConnection };