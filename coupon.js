const initialCoupons = [
        { id: 1, title: "ล้างจานแทน 1 วัน", total: 3 },
        { id: 2, title: "เลี้ยงข้าว 1 มื้อ", total: 2 },
        { id: 3, title: "ตามใจ 1 วัน", total: 3 },
        { id: 4, title: "พาไปดูหนัง + เลี้ยงหนัง", total: 1 },
        { id: 5, title: "หายงอนทันที", total: 5 },
        { id: 6, title: "เล่นเกมได้ทั้งวัน", total: 2 }
    ];

    let coupons = JSON.parse(localStorage.getItem('my_coupons')) || initialCoupons;

function renderCoupons() {
        const list = document.getElementById('coupon-list');
        list.innerHTML = '';
        coupons.forEach(cp => {
            const isOut = cp.total <= 0;
            list.innerHTML += `
                <div class="coupon-card ${isOut ? 'out' : ''}">
                    <div class="count-badge">เหลือ: ${cp.total}</div>
                    <h3 style="margin: 10px 0;">${cp.title}</h3>
                    <button onclick="useCoupon(${cp.id})" ${isOut ? 'disabled' : ''}>
                        ${isOut ? 'ใช้หมดแล้ว' : 'กดใช้คูปอง'}
                    </button>
                </div>
            `;
        });
    }

function useCoupon(id) {
    if(confirm('ยืนยันที่จะใช้คูปองนี้?')) {
        const index = coupons.findIndex(c => c.id === id);
        if(coupons[index].total > 0) {
            coupons[index].total -= 1;
            localStorage.setItem('my_coupons', JSON.stringify(coupons));
            renderCoupons();
            alert('ใช้สำเร็จ!');
        }
    }
}

document.addEventListener('DOMContentLoaded', renderCoupons);