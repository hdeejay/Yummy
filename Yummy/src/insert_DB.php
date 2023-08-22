<?php
    include 'connection.php';
    $data2 = json_decode(file_get_contents("php://input"), true);
    // $data = data2["data"];
    $name = $data2['searchQuery'];
    $query = "INSERT INTO `recipes`(`name`, `array`) VALUES (:name, :array);";
    $stmt = $pdo->prepare($query);
    $array = serialize($data2['data']);
    $stmt->execute([$data2['searchQuery'], $array]);
?>