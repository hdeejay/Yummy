<?php
    session_start();
    include 'connection.php';
    $data2 = json_decode(file_get_contents("php://input"), true);
    $query_1 = "SELECT username, password, name FROM login WHERE username= :username;";
    $stmt = $pdo->prepare($query_1);

    $stmt->execute(['username' => $data2['username']]);
    $results = $stmt->fetchAll();
    $options = [
        'cost' => 12,
    ];
    foreach ($results as $row) {
        if(password_verify($data2['password'], $row->password)){
            $_SESSION['username'] = $row->username;
            $_SESSION['valid'] = true;
            $_SESSION['name'] = $row->name;
            $_SESSION['status'] = 1;
            $_SESSION['id'] = $_POST['password'];
            echo "success";
            exit();
        }
    }
    echo "error";
    exit();
 ?>