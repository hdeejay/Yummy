<?php
    $host =  'localhost';
    $user = 'root';
    $password = '';

    // Set DSN
    $dsn = 'mysql:host='. $host;

    // Create a PDO instance
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    
    $sql_use_database = 'USE yummy;';
    $stmt = $pdo->prepare($sql_use_database);
    $stmt->execute();

?>