<?php
    session_start();
    include 'connection.php';
    $query_8 = "INSERT INTO `login`(`username`, `email`, `password`, `name`) VALUES(:username, :email, :password, :name) ;";
    $stmt = $pdo->prepare($query_8);
    $options = [
        'cost' => 12,
    ];
    $hashed_password = password_hash($_POST['password'], PASSWORD_BCRYPT, $options);
    $stmt->execute([$_POST['username'], $_POST['email'], $hashed_password, ":name" => $_POST['name']]);
    if($stmt)
    {
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['valid'] = true;
        $_SESSION['name'] = $_POST['name'];
        $_SESSION['status'] = 1;
        $_SESSION['id'] = $_POST['password'];
        header("Location: http://localhost/Yummy/src/homepage.html");
        exit();

    }
    else
    {
        echo "Error";

    }
?>