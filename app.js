const express = require("express");
const path = require("path");
const cors = require("cors");
const { getConnection } = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public 폴더를 정적파일로 제공
app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "snack.html"));
});

// 로그인 API
app.post("/login", async (req, res) => {
  const { user_id, user_pw } = req.body;

  console.log("로그인 요청:", req.body);

  let conn;

  try {
    conn = await getConnection();

    const result = await conn.execute(
      `SELECT user_id, user_pw, role
       FROM snack_member
       WHERE user_id = :id`,
      [user_id]
    );

    console.log("조회 결과:", result.rows);

    if (result.rows.length === 0) {
      return res.json({ retCode: "FAIL" });
    }

    const db_pw = result.rows[0][1];
    const role = result.rows[0][2];

    if (db_pw !== user_pw) {
      return res.json({ retCode: "FAIL" });
    }

    res.json({ retCode: "OK", role: role });

  } catch (err) {
    console.log(err);
    res.json({ retCode: "ERROR" });
  } finally {
    if (conn) await conn.close();
  }
});

// 회원가입 API
app.post("/join", async (req, res) => {
  const { user_id, user_pw, user_name, email, phone, zipcode, address, homephone } = req.body;

  let conn;

  try {
    conn = await getConnection();

    // 아이디 중복 체크
    const check = await conn.execute(
      `SELECT COUNT(*) FROM snack_member WHERE user_id = :id`,
      [user_id]
    );

    const count = check.rows[0][0];

    if (count > 0) {
      return res.json({ retCode: "DUP" });
    }

    await conn.execute(
      `INSERT INTO snack_member 
        (user_id, user_pw, user_name, email, phone, zipcode, address, homephone, role)
       VALUES
        (:id, :pw, :name, :email, :phone, :zip, :addr, :home, 'USER')`,
      {
        id: user_id,
        pw: user_pw,
        name: user_name,
        email,
        phone,
        zip: zipcode,
        addr: address,
        home: homephone
      },
      { autoCommit: true }
    );

    res.json({ retCode: "OK" });

  } catch (err) {
    console.log(err);
    res.json({ retCode: "ERROR" });
  } finally {
    if (conn) await conn.close();
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중 http://localhost:${PORT}`);
});