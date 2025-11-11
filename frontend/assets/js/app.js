// Biến toàn cục để xác định đường dẫn tới thư mục API
// Vì file JS nằm trong frontend/assets/js, chúng ta cần đi lùi 2 cấp (../..) để ra ngoài qlthuoc1 rồi vào api
const API_BASE_URL = '../api/'; 

document.addEventListener("DOMContentLoaded", function() {
    // Xác định trang hiện tại để gọi hàm tương ứng
    if (document.getElementById('productTableBody')) {
        fetchProducts();
        setupEditModal();
    }
    if (document.getElementById('addProductForm')) {
        document.getElementById('addProductForm').addEventListener('submit', handleAddProduct);
    }
    if (document.getElementById('orderTableBody')) {
        fetchOrders();
    }
});

// --- Chức năng cho trang QUẢN LÝ SẢN PHẨM (index.html) ---

// Lấy và hiển thị danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}get_sanpham.php`);
        if (!response.ok) throw new Error('Network response was not ok');
        const products = await response.json();
        
        const tableBody = document.getElementById('productTableBody');
        tableBody.innerHTML = ''; 
        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Không có sản phẩm nào.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = `<tr>
                <td>${product.MaSP}</td>
                <td>${product.TenSP}</td>
                <td>${Number(product.GiaBan).toLocaleString('vi-VN')} VND</td>
                <td>${product.GiamGia * 100}%</td>
                <td>${product.XuatXu}</td>
                <td>
                    <button class="btn btn-edit" onclick="openEditModal(${product.MaSP}, ${product.GiaBan}, ${product.GiamGia})">Sửa</button>
                    <button class="btn btn-delete" onclick="deleteProduct(${product.MaSP})">Xóa</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        document.getElementById('productTableBody').innerHTML = `<tr><td colspan="6" style="text-align:center;">Không thể tải dữ liệu. Vui lòng kiểm tra lại đường dẫn API.</td></tr>`;
    }
}

// Xóa sản phẩm
async function deleteProduct(id) {
    if (!confirm(`Bạn có chắc chắn muốn xóa sản phẩm có mã ${id}?`)) return;

    try {
        const response = await fetch(`${API_BASE_URL}delete_sanpham.php?id=${id}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        if (result.success) {
            alert(result.success);
            fetchProducts(); // Tải lại danh sách
        } else {
            alert("Lỗi: " + result.error);
        }
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
    }
}

// Cài đặt và xử lý cho Modal Cập nhật
function setupEditModal() {
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close-btn');
    const editForm = document.getElementById('editForm');

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    editForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = {
            MaSP: document.getElementById('editMaSP').value,
            GiaBan: document.getElementById('editGiaBan').value,
            GiamGia: document.getElementById('editGiamGia').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}update_sanpham.php`, {
                method: 'POST', // Hoặc PUT
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.message) {
                alert(result.message);
                modal.style.display = 'none';
                fetchProducts(); // Tải lại danh sách
            } else {
                alert("Lỗi: " + result.error);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        }
    });
}

// Mở modal với thông tin sản phẩm
function openEditModal(id, giaBan, giamGia) {
    document.getElementById('editMaSP').value = id;
    document.getElementById('editGiaBan').value = giaBan;
    document.getElementById('editGiamGia').value = giamGia;
    document.getElementById('editModal').style.display = 'block';
}

// --- Chức năng cho trang THÊM SẢN PHẨM (them_sanpham.html) ---
async function handleAddProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE_URL}add_sanpham.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.message) {
            alert(result.message);
            window.location.href = 'index.html'; // Chuyển về trang danh sách
        } else {
            alert('Lỗi: ' + result.error);
        }
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
    }
}

// --- Chức năng cho trang XEM ĐƠN HÀNG (don_hang.html) ---
async function fetchOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}get_donhang.php`);
        const orders = await response.json();
        const tableBody = document.getElementById('orderTableBody');
        tableBody.innerHTML = '';
        
        if (orders.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Không có đơn hàng nào.</td></tr>';
            return;
        }

        orders.forEach(order => {
            const row = `<tr>
                <td>${order.MaDH}</td>
                <td>${new Date(order.NgayLap).toLocaleDateString('vi-VN')}</td>
                <td>${Number(order.TongTien).toLocaleString('vi-VN')} VND</td>
                <td>${order.TenNV}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
         tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Không thể tải dữ liệu.</td></tr>';
    }
}