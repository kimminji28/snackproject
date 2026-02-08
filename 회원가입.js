let isIdChecked = false;

    // localStorage에서 기존 회원 목록 가져오기
    function getUsers() {
      return JSON.parse(localStorage.getItem("users")) || [];
    }

    // localStorage에 회원 저장
    function saveUser(user) {
      const users = getUsers();
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }

    // 아이디 중복 체크
    function checkDuplicateId() {
      const idInput = document.getElementById("id").value.trim();
      const idMsg = document.getElementById("idMsg");

      if (idInput === "") {
        idMsg.style.display = "block";
        idMsg.className = "msg fail";
        idMsg.innerText = "아이디를 입력해주세요.";
        isIdChecked = false;
        return;
      }

      const users = getUsers();
      const exists = users.some(user => user.id === idInput);

      if (exists) {
        idMsg.style.display = "block";
        idMsg.className = "msg fail";
        idMsg.innerText = "이미 사용 중인 아이디입니다.";
        isIdChecked = false;
      } else {
        idMsg.style.display = "block";
        idMsg.className = "msg ok";
        idMsg.innerText = "사용 가능한 아이디입니다!";
        isIdChecked = true;
      }
    }

    // 비밀번호 확인 실시간 체크
    document.getElementById("pw2").addEventListener("input", function() {
      const pw = document.getElementById("pw").value;
      const pw2 = document.getElementById("pw2").value;
      const pwMsg = document.getElementById("pwMsg");

      if (pw2 === "") {
        pwMsg.style.display = "none";
        return;
      }

      if (pw === pw2) {
        pwMsg.style.display = "block";
        pwMsg.className = "msg ok";
        pwMsg.innerText = "비밀번호가 일치합니다.";
      } else {
        pwMsg.style.display = "block";
        pwMsg.className = "msg fail";
        pwMsg.innerText = "비밀번호가 일치하지 않습니다.";
      }
    });

    // 회원가입 submit 처리
    document.getElementById("signupForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const id = document.getElementById("id").value.trim();
      const pw = document.getElementById("pw").value.trim();
      const pw2 = document.getElementById("pw2").value.trim();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const homeTel = document.getElementById("homeTel").value.trim();

      if (!isIdChecked) {
        alert("아이디 중복확인을 해주세요!");
        return;
      }

      if (pw !== pw2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      const users = getUsers();
      const exists = users.some(user => user.id === id);

      if (exists) {
        alert("이미 존재하는 아이디입니다. 다시 확인해주세요.");
        return;
      }

      saveUser({
        id,
        pw,
        name,
        email,
        phone,
        address,
        homeTel
      });

      alert("회원가입 완료! 로그인 페이지로 이동합니다.");
      location.href = "login.html";
    });

    // 아이디 수정하면 다시 중복확인 하도록 처리
    document.getElementById("id").addEventListener("input", function() {
      isIdChecked = false;
      const idMsg = document.getElementById("idMsg");
      idMsg.style.display = "none";
    });


    document.getElementById("pw2").addEventListener("input", function() {
  const pw = document.getElementById("pw").value;
  const pw2 = document.getElementById("pw2").value;
  const pwMsg = document.getElementById("pwMsg");

  if (pw2 === "") {
    pwMsg.style.display = "none";
    return;
  }

  if (pw === pw2) {
    pwMsg.style.display = "block";
    pwMsg.className = "msg ok";
    pwMsg.innerText = "비밀번호가 일치합니다.";
  } else {
    pwMsg.style.display = "block";
    pwMsg.className = "msg fail";
    pwMsg.innerText = "비밀번호가 일치하지 않습니다.";
  }
});



document.getElementById("pw").addEventListener("input", function() {
  const pw = document.getElementById("pw").value;
  const pw2 = document.getElementById("pw2").value;
  const pwMsg = document.getElementById("pwMsg");

  if (pw2 === "") {
    pwMsg.style.display = "none";
    return;
  }

  if (pw === pw2) {
    pwMsg.style.display = "block";
    pwMsg.className = "msg ok";
    pwMsg.innerText = "비밀번호가 일치합니다.";
  } else {
    pwMsg.style.display = "block";
    pwMsg.className = "msg fail";
    pwMsg.innerText = "비밀번호가 일치하지 않습니다.";
  }
});

document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const id = document.getElementById("id").value.trim();
  const pw = document.getElementById("pw").value.trim();
  const pw2 = document.getElementById("pw2").value.trim();

  if (pw.length < 8) {
    alert("비밀번호는 8자 이상 입력해야 합니다.");
    return;
  }

  if (pw !== pw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  alert("회원가입 완료!");
});

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function(data) {
      document.getElementById("zipcode").value = data.zonecode;
      document.getElementById("address").value = data.address;
      document.getElementById("detailAddress").focus();
    }
  }).open();
}