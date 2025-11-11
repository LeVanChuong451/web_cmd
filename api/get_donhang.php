<?php
include 'config.php';

$sql = "SELECT dh.MaDH, dh.NgayLap, dh.TongTien, nv.TenNV 
        FROM donhang dh
        JOIN nhanvien nv ON dh.MaNV = nv.MaNV";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>
