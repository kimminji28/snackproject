const pw = document.querySelector("#join_pw");
const pw2 = document.querySelector("#join_pw2");
const pwMsg = document.querySelector("#pwMsg");
const msg = document.querySelector("#msg");

document.querySelector("#backBtn").addEventListener("click", () => {
  history.back();
});

// 비밀번호 확인 체크
function checkPassword() {
  if (pw2.value.trim() === "") {
    pwMsg.innerText = "";
    return;
  }

  if (pw.value !== pw2.value) {
    pwMsg.innerText = "비밀번호가 일치하지 않습니다.";
    pwMsg.style.color = "red";
  } else {
    pwMsg.innerText = "비밀번호가 일치합니다.";
    pwMsg.style.color = "green";
  }
}

pw.addEventListener("keyup", checkPassword);
pw2.addEventListener("keyup", checkPassword);

// 주소검색 버튼 (임시)
document.querySelector("#addrBtn").addEventListener("click", () => {
  alert("주소 검색 API(카카오/다음) 연결 예정");

  // 임시 입력
  document.querySelector("#join_zip").value = "12345";
  document.querySelector("#join_addr").value = "서울시 강남구 테헤란로 123";
});

// 회원가입 요청
document.querySelector("#joinSubmit").addEventListener("click", async () => {
  msg.innerText = "";

  const join_id = document.querySelector("#join_id").value.trim();
  const join_pw = pw.value.trim();
  const join_pw2 = pw2.value.trim();
  const join_name = document.querySelector("#join_name").value.trim();
  const join_email = document.querySelector("#join_email").value.trim();
  const join_phone = document.querySelector("#join_phone").value.trim();
  const join_zip = document.querySelector("#join_zip").value.trim();
  const join_addr = document.querySelector("#join_addr").value.trim();
  const join_homephone = document.querySelector("#join_homephone").value.trim();

  if (!join_id || !join_pw || !join_pw2 || !join_name || !join_email || !join_phone || !join_zip || !join_addr) {
    msg.innerText = "필수 항목을 모두 입력하세요.";
    msg.style.color = "red";
    return;
  }

  if (join_pw.length < 8) {
    msg.innerText = "비밀번호는 8글자 이상 입력해야 합니다.";
    msg.style.color = "red";
    return;
  }

  if (join_pw !== join_pw2) {
    msg.innerText = "비밀번호가 일치하지 않습니다.";
    msg.style.color = "red";
    return;
  }

  try {
    const resp = await fetch("http://localhost:3000/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: join_id,
        user_pw: join_pw,
        user_name: join_name,
        email: join_email,
        phone: join_phone,
        zipcode: join_zip,
        address: join_addr,
        homephone: join_homephone
      })
    });

    const data = await resp.json();

    if (data.retCode === "OK") {
      alert("회원가입 완료!");
      window.location.href = "/login.html";
    } else if (data.retCode === "DUP") {
      msg.innerText = "이미 존재하는 아이디입니다.";
      msg.style.color = "red";
    } else {
      msg.innerText = "회원가입 실패";
      msg.style.color = "red";
    }

  } catch (err) {
    console.log(err);
    msg.innerText = "서버 오류 발생";
    msg.style.color = "red";
  }
});