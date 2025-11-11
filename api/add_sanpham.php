<?php
include 'config.php';
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "No input data"]);
    exit;
}

$TenSP = $data['TenSP'];
$GiaBan = $data['GiaBan'];
$GiamGia = $data['GiamGia'];
$XuatXu = $data['XuatXu'];
$CachDung = $data['CachDung'];
$MaDM = $data['MaDM'];
$MaDVT = $data['MaDVT'];
$HinhSP = $data['HinhSP'];
$CongDung = $data['CongDung'];

$sql = "INSERT INTO sanpham (TenSP, GiaBan, GiamGia, XuatXu, CachDung, MaDM, MaDVT, HinhSP, CongDung)
        VALUES ('$TenSP', $GiaBan, $GiamGia, '$XuatXu', '$CachDung', $MaDM, $MaDVT, '$HinhSP', '$CongDung')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "✅ Thêm sản phẩm thành công!"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
