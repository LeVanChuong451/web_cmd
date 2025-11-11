<?php
include 'config.php';
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['MaSP'];
$GiaBan = $data['GiaBan'];
$GiamGia = $data['GiamGia'];

$sql = "UPDATE sanpham SET GiaBan = $GiaBan, GiamGia = $GiamGia WHERE MaSP = $id";

if ($conn->query($sql)) {
    echo json_encode(["message" => "Cập nhật thành công"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
