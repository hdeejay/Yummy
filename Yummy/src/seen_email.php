<?php
    session_start();
    include 'connection.php';
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "UPDATE messages SET seen= :seen  WHERE `id` = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['id' => $data['id'], "seen" => 1]);
    if(!$stmt) {
        echo "error";
        exit();
    }
    else {
        echo "success"; 
        exit();
    }
?>