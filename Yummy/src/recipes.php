<?php
    include 'connection.php';
    $data = json_decode(file_get_contents("php://input"), true);
    $query = "SELECT * FROM recipes WHERE `name` = :name ;";
    $stmt = $pdo->prepare($query);
    $stmt->execute([':name' => $data['name']]);
    $results = $stmt->fetchAll();
    if (empty($results)) {
        echo "empty data";
        exit();
    }
    foreach ($results as $row) {
        $data3 = unserialize($row->array);
        echo json_encode($data3, JSON_PRETTY_PRINT);
        
    }

?>