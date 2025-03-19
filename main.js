document.addEventListener('DOMContentLoaded', async () => {
  const userId = sessionStorage.getItem('userId');
  if (!userId) {
    window.location.href = 'login.html';
    return;
  }

  const slipContainer = document.getElementById('slipContainer');
  const endpoint = "https://opensheet.elk.sh/1tqx0f9Eg9tu-OH6HbN2RmWmB4l5IpdzPd2uo58m49pw/ใบแจ้งหนี้";

  try {
    const res = await fetch(endpoint);
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
        <p><strong>เดือน:</strong> ${row["สถานะค้างชำระ"] || "-"}</p>
        <p><strong>จำนวนเงิน:</strong> ${row["จำนวนเงิน (บาท)"] || "-"}</p>
      `;
      slipContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    slipContainer.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  }
});
