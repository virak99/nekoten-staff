<?php
include '../connect.php';

$staff_id = $_POST['staff_id'];
$type = $_POST['type'];
$start = $_POST['start'];
$description = $_POST['description'];
$time = date("Y-m-d G:i:s");


$sql = "INSERT INTO gas_tickets (staff_id, ".$type.", description, ".$type."_time) VALUES ('$staff_id', '$type', '$description', '$time')";;
if (mysqli_query($conn, $sql)){
    echo json_encode('success');
} else {
    echo json_encode($sql);
}

?>