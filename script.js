const members = ["Trí", "Th", "Danh", "Phong"];

function createMemberInputs() {
    const membersDiv = document.getElementById('members');
    members.forEach(member => {
        const label = document.createElement('label');
        label.className = 'member-label';
        label.innerText = `Số ngày ở của ${member}:`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-control mb-3';
        input.id = member;
        input.required = true;

        membersDiv.appendChild(label);
        membersDiv.appendChild(input);
    });
}

function calculateRent() {
    const phatsinh = parseFloat(document.getElementById('phatsinh').value) || 0;
    const tiendien = parseFloat(document.getElementById('tiendien').value) || 0;
    const tiennuoc = parseFloat(document.getElementById('tiennuoc').value) || 0;

    let tongngay = 0;
    const results = [];
    const numberOfMembers = members.length; // Số thành viên

    // Tính tổng số ngày ở
    members.forEach(member => {
        const songay = parseInt(document.getElementById(member).value) || 0; // Nếu không nhập, mặc định là 0
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
            const songay = parseInt(document.getElementById(member).value) || 0;
            const dailyCost = (tiendien + tiennuoc) / tongngay * songay; // Tính tiền điện và nước theo số ngày ở
            const tientra = costPerMember + dailyCost; // Tổng tiền trả cho từng thành viên
            
            // Tạo hàng cho bảng kết quả
            const row = `<tr>
                            <td>${member}</td>
                            <td>${songay}</td>
                            <td>${tientra.toFixed(2)} VND</td>
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

document.addEventListener('DOMContentLoaded', createMemberInputs);