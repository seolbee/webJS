<?php
//header("Content-Type : application/json");
$upfile = $_FILES['file'];
$src = "/upload/" . $upfile['name'];
move_uploaded_file($upfile['tmp_name'], "." . $src);
echo json_encode(['success'=> true, 'type'=> "image", 'src'=> $src], JSON_UNESCAPED_UNICODE);
