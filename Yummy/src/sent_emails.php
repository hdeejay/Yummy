<?php
    session_start();
    include 'connection.php';
    $query = "SELECT * FROM messages WHERE sender = :sender;";
    $stmt = $pdo->prepare($query);
    $stmt->execute(["sender" => $_SESSION['username']]);
    $all_emails = array();
    $arrays = array();
    $results = $stmt->fetchAll();
    if (count($results) == 0) {
        echo "error: no messages";
        exit();
    }
    else {
        foreach($results as $row) {
            $arrays["id"] = $row->id;
            $arrays["sender"] = $row->sender;
            $arrays["sender_name"] = $row->sender_name;
            $arrays["receiver"] = $row->receiver;
            $arrays["receiver_name"] = $row->receiver_name;
            $arrays["subject"] = $row->subject;
            $arrays["message"] = $row->message;
            $arrays["sent_time"] = $row->sent_time;
            $arrays["seen"] = $row->seen;
            $arrays["important"] = $row->Important;
            array_push($all_emails, $arrays);
        }
    }
    echo json_encode($all_emails, JSON_PRETTY_PRINT);
?>