document.querySelector("#backBtn").addEventListener("click", () => {
  history.back();
});

document.querySelector("#loginSubmit").addEventListener("click", async () => {
  const user_id = document.querySelector("#user_id").value.trim();
  const user_pw = document.querySelector("#user_pw").value.trim();
  const msg = document.querySelector("#msg");

  msg.innerText = "";

  if (!user_id || !user_pw) {
    msg.innerText = "아이디와 비밀번호를 입력하세요.";
    msg.style.color = "red";
    return;
  }

  try {
    const resp = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, user_pw })
    });

    const data = await resp.json();

    if (data.retCode === "OK") {
      alert("로그인 성공!");

      // role 기반 분기
      if (data.role === "ADMIN") {
        window.location.href = "/admin.html";
      } else {
        window.location.href = "/snack.html";
      }

    } else {
      msg.innerText = "아이디/비밀번호가 없습니다. 회원가입 해주세요.";
      msg.style.color = "red";
    }

  } catch (err) {
    console.log(err);
    msg.innerText = "서버 오류 발생";
    msg.style.color = "red";
  }
});
✅ 5) join.html (회원가입)
📌 public/join.html

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>회원가입</title>
  <link rel="stylesheet" href="css/join.css" />
</head>
<body>

  <div class="join-container">
    <h2>회원가입</h2>

    <div class="input-group">
      <label>아이디</label>
      <input type="text" id="join_id" placeholder="아이디 입력" />
    </div>

    <div class="input-group">
      <label>비밀번호</label>
      <input type="password" id="join_pw" placeholder="비밀번호 입력 (8자 이상)" />
    </div>

    <div class="input-group">
      <label>비밀번호 확인</label>
      <input type="password" id="join_pw2" placeholder="비밀번호 확인" />
      <p id="pwMsg"></p>
    </div>

    <div class="input-group">
      <label>이름</label>
      <input type="text" id="join_name" placeholder="이름 입력" />
    </div>

    <div class="input-group">
      <label>이메일</label>
      <input type="email" id="join_email" placeholder="example@email.com" />
    </div>

    <div class="input-group">
      <label>휴대폰번호</label>
      <input type="text" id="join_phone" placeholder="010-0000-0000" />
    </div>

    <div class="input-group address-box">
      <label>집주소</label>
      <div class="address-row">
        <input type="text" id="join_zip" placeholder="우편번호" readonly />
        <button type="button" id="addrBtn">주소검색</button>
      </div>
      <input type="text" id="join_addr" placeholder="주소 입력" readonly />
    </div>

    <div class="input-group">
      <label>집전화번호(선택)</label>
      <input type="text" id="join_homephone" placeholder="02-000-0000" />
    </div>

    <button type="button" id="joinSubmit">회원가입 완료</button>
    <button type="button" id="backBtn">뒤로가기</button>

    <p id="msg"></p>
  </div>

  <script src="js/join.js"></script>
</body>
</html>