document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const userId = document.getElementById('userId').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageBox = document.getElementById('loginMessage');

  if (!userId || !password) {
    messageBox.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
    return;
  }

  try {
    const res = await fetch("https://opensheet.elk.sh/1m3Qa9EMleoMyK9O9X_IX5Sx_tVrN8vivNvwLx6rdrMQ/รหัสผ่าน");
    const data = await res.json();

    const user = data.find(row => row.id === userId);

    if (user && user.password === password) {
      sessionStorage.setItem('userId', userId);
      window.location.href = 'index.html';
    } else {
      messageBox.textContent = "รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
  } catch (error) {
    console.error(error);
    messageBox.textContent = "เกิดข้อผิดพลาดในการเชื่อมต่อข้อมูล";
  }
});
