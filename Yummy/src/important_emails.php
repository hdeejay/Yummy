<?php
    session_start();
    include 'connection.php';
    $data = json_decode(file_get_contents("php://input"), true);
    $arrays3 = join(',', array_fill(0, count($data['important']), '?'));
    $query2 = "UPDATE messages SET Important = 1 WHERE id IN ($arrays3);";
    $stmt2 = $pdo->prepare($query2);
    $data2 = $data['important'];
    $stmt2->execute($data2);
    if ($stmt2) {
        echo "Success";
        exit();
    }
    else {
        echo "Error";
        exit();
    }

?>