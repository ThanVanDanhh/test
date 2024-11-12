const members = ["Trí", "Thịnh", "Danh", "Phong"];

function createMemberInputs() {
    const membersDiv = document.getElementById('members');
    members.forEach(member => {
        const label = document.createElement('label');
        label.className = 'member-label';
        label.innerText = `Số ngày ở của ${member}:`;
        
        const input = document.createElement('input');
        input.type = 'text';  // Để có thể hiển thị định dạng
        input.className = 'form-control mb-3';
        input.id = member;
        input.required = true;

        // Thêm sự kiện để định dạng giá trị
        input.addEventListener('input', function() {
            const rawValue = input.value.replace(/,/g, ''); // Xóa dấu phẩy
            const value = parseFloat(rawValue) || 0; // Chuyển đổi thành số
            input.value = formatCurrency(value); // Định dạng lại và gán vào input
        });

        membersDiv.appendChild(label);
        membersDiv.appendChild(input);
    });
}

function formatCurrency(value) {
    // Chuyển đổi số thành chuỗi và định dạng
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function parseCurrency(value) {
    // Chuyển đổi chuỗi có dấu phẩy về số
    return parseFloat(value.replace(/,/g, '')) || 0;
}

function calculateRent() {
    const phatsinh = parseCurrency(document.getElementById('phatsinh').value) || 0;
    const tiendien = parseCurrency(document.getElementById('tiendien').value) || 0;
    const tiennuoc = parseCurrency(document.getElementById('tiennuoc').value) || 0;

    let tongngay = 0;
    const numberOfMembers = members.length; // Số thành viên

    // Tính tổng số ngày ở
    members.forEach(member => {
        const songay = parseCurrency(document.getElementById(member).value) || 0; // Lấy giá trị đã định dạng
        tongngay += songay;
    });

    // Hiển thị bảng
    const resultDetails = document.getElementById('resultDetails');
    resultDetails.innerHTML = ''; // Xóa nội dung cũ

    // Kiểm tra để tránh chia cho 0
    if (tongngay > 0) {
        const totalFixedCost = 2505000 + phatsinh;
        const costPerMember = totalFixedCost / numberOfMembers; // Chi phí cố định chia cho số thành viên

        members.forEach(member => {
            const songay = parseCurrency(document.getElementById(member).value) || 0; // Lấy số ngày ở
            const dailyCost = (tiendien + tiennuoc) / tongngay * songay; // Tính tiền điện và nước theo số ngày ở
            const tientra = costPerMember + dailyCost; // Tổng tiền trả cho từng thành viên
            
            // Tạo hàng cho bảng kết quả
            const row = `<tr>
                            <td>${member}</td>
                            <td>${songay}</td>
                            <td>${formatCurrency(tientra.toFixed(0))} VND</td>
                        </tr>`;
            resultDetails.innerHTML += row;
        });
    } else {
        members.forEach(member => {
            // Tạo hàng cho bảng với số ngày 0
            const row = `<tr>
                            <td>${member}</td>
                            <td>0</td>
                            <td>0.00 VND</td>
                        </tr>`;
            resultDetails.innerHTML += row;
        });
    }

    // Hiển thị bảng
    document.getElementById('resultTable').style.display = 'table';
}

// Thêm sự kiện cho các trường nhập liệu
document.addEventListener('DOMContentLoaded', () => {
    createMemberInputs();
});
// Thêm sự kiện cho các trường nhập liệu chi phí
document.getElementById('phatsinh').addEventListener('input', function() {
    const rawValue = this.value.replace(/,/g, ''); // Xóa dấu phẩy
    const value = parseFloat(rawValue) || 0; // Chuyển đổi thành số
    this.value = formatCurrency(value); // Định dạng lại và gán vào input
});

document.getElementById('tiendien').addEventListener('input', function() {
    const rawValue = this.value.replace(/,/g, ''); // Xóa dấu phẩy
    const value = parseFloat(rawValue) || 0; // Chuyển đổi thành số
    this.value = formatCurrency(value); // Định dạng lại và gán vào input
});

document.getElementById('tiennuoc').addEventListener('input', function() {
    const rawValue = this.value.replace(/,/g, ''); // Xóa dấu phẩy
    const value = parseFloat(rawValue) || 0; // Chuyển đổi thành số
    this.value = formatCurrency(value); // Định dạng lại và gán vào input
});