<?php
    session_start();
    include 'connection.php';
    $query = "INSERT INTO `Posts`(`username`, `Author`, `name`, `recipe`) VALUES (:username, :Author, :name, :recipe);";
    $stmt = $pdo->prepare($query);
    $stmt->execute([":username" => $_SESSION['username'], ":Author" => $_SESSION['name'], ":name" => $_POST['recipes'] , ":recipe" => $_POST['ingredents']]);
    if ($stmt) {
        header("Location: http://localhost/Yummy/src/post.html");
        exit();
    }
    else {
        header("Location: http://localhost/Yummy/src/create.html");    
        exit();
    }
?>