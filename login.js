document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageBox = document.getElementById('loginMessage');

  if (!userId || !password) {
    messageBox.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  const allowedPrefix = "399/";
  const allowedPassword = "123456";

  if (userId.startsWith(allowedPrefix) && password === allowedPassword) {
    sessionStorage.setItem('userId', userId);
    window.location.href = 'index.html';
  } else {
    messageBox.textContent = "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
});
