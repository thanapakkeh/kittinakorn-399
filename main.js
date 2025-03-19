document.addEventListener('DOMContentLoaded', async () => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    window.location.href = 'login.html';
    return;
  }

  const slipContainer = document.getElementById('slipContainer');

  try {
    const res = await fetch('data/data.json');
    const data = await res.json();

    const slips = data.filter(row => row["บ้านเลขที่"] === userId);

    if (slips.length === 0) {
      slipContainer.innerHTML = "<p>ไม่พบใบแจ้งหนี้ของคุณ</p>";
      return;
    }

    slips.forEach((row, index) => {
      const div = document.createElement('div');
      div.className = "slip-card";
      div.innerHTML = `
        <h3>ใบแจ้งหนี้ #${index + 1}</h3>
        <p><strong>เดือน:</strong> ${row["สถานะค้างชำระ"]}</p>
        <p><strong>จำนวนเงิน:</strong> ${row["จำนวนเงิน (บาท)"]} บาท</p>
      `;
      slipContainer.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    slipContainer.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  }
});

function openPayment() {
  document.getElementById("paymentSection").style.display = "block";
}

function openContact() {
  document.getElementById("contactSection").style.display = "block";
}

function copyAccount() {
  const acc = document.getElementById("accountNumber").textContent;
  navigator.clipboard.writeText(acc).then(() => {
    alert("คัดลอกเลขบัญชีแล้ว: " + acc);
  });
}

function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}