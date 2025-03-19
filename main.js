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

    const slips = data.filter(row => formatId(row["บ้านเลขที่"]) === userId);

    if (slips.length === 0) {
      slipContainer.innerHTML = "<p>ไม่พบใบแจ้งหนี้ของคุณ</p>";
      return;
    }

    slips.forEach((row, index) => {
      const div = document.createElement('div');
      div.className = "slip-card";
      div.innerHTML = `
        <h3>ใบแจ้งหนี้ #${index + 1}</h3>
        <p><strong>เดือน:</strong> ${row["เดือน"] || "-"}</p>
        <p><strong>จำนวนเงิน:</strong> ${row["จำนวนเงิน"] || "-"}</p>
        <p><strong>สถานะ:</strong> ${row["สถานะ"] || "-"}</p>
        <p><strong>วันที่ออกใบแจ้งหนี้:</strong> ${row["วันที่"] || "-"}</p>
      `;
      slipContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    slipContainer.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  }
});

// แปลงรูปแบบบ้านเลขที่ เช่น "399/1" => "399001"
function formatId(houseNo) {
  if (!houseNo) return "";
  const parts = houseNo.split('/');
  return parts[0] + parts[1].padStart(3, '0');
}
