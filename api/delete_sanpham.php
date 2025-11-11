<?php
header("Content-Type: application/json");
require_once "config.php"; // Kết nối database

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Lấy id từ URL (vd: ?id=2)
    if (isset($_GET['id'])) {
        $masp = intval($_GET['id']); // Ép kiểu cho an toàn

        // Xóa chi tiết đơn hàng có sản phẩm đó (nếu có)
        $conn->query("DELETE FROM chitietdh WHERE MaSP = $masp");

        // Xóa sản phẩm
        $sql = "DELETE FROM sanpham WHERE MaSP = $masp";
        if ($conn->query($sql) === TRUE) {
            if ($conn->affected_rows > 0) {
                echo json_encode(["success" => "Đã xóa sản phẩm có MaSP = $masp thành công!"]);
            } else {
                echo json_encode(["error" => "Không tìm thấy sản phẩm có MaSP = $masp"]);
            }
        } else {
            echo json_encode(["error" => "Lỗi khi xóa: " . $conn->error]);
        }
    } else {
        echo json_encode(["error" => "Thiếu tham số id trên URL"]);
    }
} else {
    echo json_encode(["error" => "Phương thức không hợp lệ. Hãy dùng DELETE."]);
}

$conn->close();
?>
