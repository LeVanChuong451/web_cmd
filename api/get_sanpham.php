<?php
// Cho phép truy cập từ frontend (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';


// Kiểm tra kết nối
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Không thể kết nối đến cơ sở dữ liệu"]);
    exit();
}

// Truy vấn dữ liệu sản phẩm kèm danh mục và đơn vị tính
$sql = "SELECT s.MaSP, s.TenSP, s.GiaBan, s.GiamGia, s.XuatXu, s.CachDung, d.TenDM, dv.TenDVT
        FROM sanpham s
        JOIN danhmuc d ON s.MaDM = d.MaDM
        JOIN donvitinh dv ON s.MaDVT = dv.MaDVT";

$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Đảm bảo các key khớp với frontend
        $data[] = [
            "MaSP" => $row["MaSP"],
            "TenSP" => $row["TenSP"],
            "GiaBan" => $row["GiaBan"],
            "GiamGia" => $row["GiamGia"],
            "XuatXu" => $row["XuatXu"],
            "CachDung" => $row["CachDung"],
            "TenDM" => $row["TenDM"],
            "TenDVT" => $row["TenDVT"]
        ];
    }
}

// Trả về kết quả JSON
echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Đóng kết nối
$conn->close();
?>
