<?php
    session_start();
    include 'connection.php';
    $query = "SELECT * FROM Posts ORDER BY date DESC;";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $results = $stmt->fetchAll();
    $arrays = array();
    $all_data = array();
    foreach ($results as $row) {
        $arrays['id'] = $row->ID;
        $arrays['username'] = $row->username;
        $arrays['Author'] = $row->Author;
        $arrays['name'] = $row->name;
        $arrays['recipe'] = $row->recipe;
        $arrays['date'] = $row->date;
        array_push($all_data, $arrays);
    }
    echo json_encode($all_data, JSON_PRETTY_PRINT);

?>